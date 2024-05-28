import { Result, UseCaseInterface } from '@standardnotes/domain-core'
import { EncryptionService } from '../Services/Encryption/EncryptionService'
import { DocumentKeys } from '@proton/drive-store'
import { GetAssociatedEncryptionDataForComment } from './GetAdditionalEncryptionData'
import { EncryptionContext } from '../Services/Encryption/EncryptionContext'
import { stringToUint8Array, uint8ArrayToBase64String } from '@proton/shared/lib/helpers/encoding'

export class EncryptComment implements UseCaseInterface<string> {
  constructor(private encryption: EncryptionService<EncryptionContext.PersistentComment>) { }

  async execute(comment: string, markId: string, keys: DocumentKeys): Promise<Result<string>> {
    const encrypted = await this.encryption.signAndEncryptData(
      stringToUint8Array(comment),
      GetAssociatedEncryptionDataForComment({
        authorAddress: keys.userOwnAddress,
        markId: markId,
      }),
      keys.documentContentKey,
      keys.userAddressPrivateKey,
    )

    if (encrypted.isFailed()) {
      return Result.fail(encrypted.getError())
    }

    return Result.ok(uint8ArrayToBase64String(encrypted.getValue()))
  }
}
