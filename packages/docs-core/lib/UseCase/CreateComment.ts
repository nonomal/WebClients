import { Result, UseCaseInterface } from '@standardnotes/domain-core'
import { DocumentKeys, NodeMeta } from '@proton/drive-store'
import { Comment } from '../Models'
import { CommentInterface, ServerTime } from '@proton/docs-shared'
import { GenerateUUID } from '../Util/GenerateUuid'
import { EncryptComment } from './EncryptComment'
import { DecryptComment } from './DecryptComment'
import { LocalCommentsState } from '../Services/Comments/LocalCommentsState'
import { CommentsApi } from '../Api/Comments/CommentsApi'

/**
 * Creates and encrypts a new comment in a thread with the API.
 */
export class CreateComment implements UseCaseInterface<CommentInterface> {
  constructor(
    private api: CommentsApi,
    private encryptComment: EncryptComment,
    private decryptComment: DecryptComment,
  ) {}

  async execute(dto: {
    text: string
    threadID: string
    lookup: NodeMeta
    userDisplayName: string
    keys: DocumentKeys
    commentsState: LocalCommentsState
  }): Promise<Result<CommentInterface>> {
    const thread = dto.commentsState.findThreadById(dto.threadID)
    if (!thread) {
      return Result.fail('Thread not found')
    }

    const localComment = new Comment(
      GenerateUUID(),
      ServerTime.now(),
      ServerTime.now(),
      dto.text,
      null,
      dto.userDisplayName,
      [],
      true,
    )

    dto.commentsState.addComment(localComment, dto.threadID)

    const encryptionResult = await this.encryptComment.execute(dto.text, thread.markID, dto.keys)

    if (encryptionResult.isFailed()) {
      dto.commentsState.deleteComment({ commentID: localComment.id, threadID: dto.threadID })
      return Result.fail(encryptionResult.getError())
    }

    const encryptedValue = encryptionResult.getValue()

    const result = await this.api.addCommentToThread(
      dto.lookup.volumeId,
      dto.lookup.linkId,
      dto.threadID,
      encryptedValue,
      null,
    )
    if (result.isFailed()) {
      dto.commentsState.deleteComment({ commentID: localComment.id, threadID: dto.threadID })
      return Result.fail(result.getError())
    }

    const response = result.getValue()

    const commentFromResponse = await this.decryptComment.execute(response.Comment, thread.markID, dto.keys)
    if (commentFromResponse.isFailed()) {
      return Result.fail(commentFromResponse.getError())
    }

    const comment = commentFromResponse.getValue()
    dto.commentsState.replacePlaceholderComment(localComment.id, comment)

    return Result.ok(comment)
  }
}
