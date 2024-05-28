import { DecryptedNode, DriveCompat } from '@proton/drive-store'
import { Result, UseCaseInterface } from '@standardnotes/domain-core'
import { FileToDocConversionResult } from '../Types/FileToDocConversionResult'
import { GetDocumentMeta } from './GetDocumentMeta'
import { SupportedMimeTypes } from '@proton/shared/lib/drive/constants'
import { getErrorString } from '../Util/GetErrorString'
import { PROTON_DOC_FILE_EXTENSION } from '@proton/docs-shared'

/**
 * Creates a new empty document shell file. This file will then be opened, and the contents will be converted by the editor.
 */
export class CreateEmptyDocumentForConversion implements UseCaseInterface<FileToDocConversionResult> {
  constructor(
    private driveCompat: DriveCompat,
    private getDocumentMeta: GetDocumentMeta,
  ) {}

  async execute({
    node,
    contents,
  }: {
    node: DecryptedNode
    contents: Uint8Array
  }): Promise<Result<FileToDocConversionResult>> {
    try {
      const newDocName = `${node.name}.${PROTON_DOC_FILE_EXTENSION}`

      const shellResult = await this.driveCompat.createDocumentNode(
        { volumeId: node.volumeId, linkId: node.parentNodeId },
        newDocName,
      )

      const documentMetaResult = await this.getDocumentMeta.execute({
        volumeId: shellResult.volumeId,
        linkId: shellResult.linkId,
      })

      if (documentMetaResult.isFailed()) {
        return Result.fail(documentMetaResult.getError())
      }

      const newDocMeta = documentMetaResult.getValue()

      return Result.ok({
        newDocMeta,
        newShell: shellResult,
        dataToConvert: { data: contents, type: node.mimeType === SupportedMimeTypes.docx ? 'docx' : 'md' },
      })
    } catch (error) {
      return Result.fail(getErrorString(error) ?? 'Failed to create empty document for conversion')
    }
  }
}
