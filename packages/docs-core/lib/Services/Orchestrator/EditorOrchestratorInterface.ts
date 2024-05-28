import { UserState } from '@lexical/yjs'
import {
  CommentInterface,
  CommentThreadInterface,
  ClientRequiresEditorMethods,
  RtsMessagePayload,
  DocumentMetaInterface,
} from '@proton/docs-shared'

export interface EditorOrchestratorInterface {
  username: string
  docMeta: DocumentMetaInterface

  onEditorReady(): void
  addEditorReadyObserver(observer: () => void): () => void

  passEditorInvokerToDocController(editorInvoker: ClientRequiresEditorMethods): void
  editorRequestsPropagationOfUpdate(message: RtsMessagePayload, originator: string, debugSource: string): Promise<void>

  getTypersExcludingSelf(threadId: string): string[]
  createComment(content: string, threadID: string): Promise<CommentInterface | undefined>
  beganTypingInThread(threadID: string): void
  stoppedTypingInThread(threadID: string): void
  unresolveThread(threadId: string): Promise<boolean>
  editComment(threadID: string, commentID: string, content: string): Promise<boolean>
  deleteComment(threadID: string, commentID: string): Promise<boolean>

  getAllThreads(): CommentThreadInterface[]
  createThread(commentContent: string): Promise<CommentThreadInterface | undefined>
  resolveThread(threadId: string): Promise<boolean>
  deleteThread(id: string): Promise<boolean>

  handleAwarenessStateUpdate(states: UserState[]): Promise<void>
}
