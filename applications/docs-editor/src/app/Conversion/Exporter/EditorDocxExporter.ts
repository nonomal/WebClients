import { Packer } from 'docx'
import { EditorExporter } from './EditorExporter'
import { generateDocxFromEditor } from '../Docx/LexicalToDocx/GenerateDocxFromEditor'

export class EditorDocxExporter extends EditorExporter {
  async export(): Promise<Blob> {
    const docx = await generateDocxFromEditor(this.editor, this.callbacks)
    const buffer = await Packer.toBlob(docx)
    return buffer
  }
}
