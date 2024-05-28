import { Result } from '@standardnotes/domain-core'
import { DocumentKeys } from '@proton/drive-store'
import { EncryptionService } from '../Services/Encryption/EncryptionService'
import { EncryptionContext } from '../Services/Encryption/EncryptionContext'
import { DecryptMessage, DecryptMessageDTO } from './DecryptMessage'
import { DocumentUpdate } from '@proton/docs-proto'

describe('DecryptMessage', () => {
  let decryptMessage: DecryptMessage
  let encryptionSerivce: EncryptionService<EncryptionContext.RealtimeMessage>

  const keys = {} as DocumentKeys

  beforeEach(() => {
    encryptionSerivce = {
      decryptData: jest.fn().mockReturnValue(Result.ok({ content: new Uint8Array(), signature: new Uint8Array() })),
      getVerificationKey: jest.fn().mockReturnValue(Result.ok(new Uint8Array())),
      verifyData: jest.fn().mockReturnValue(Result.ok(2)),
    } as unknown as jest.Mocked<EncryptionService<EncryptionContext.RealtimeMessage>>
    decryptMessage = new DecryptMessage(encryptionSerivce)
  })

  it('should decrypt data', async () => {
    const dto: DecryptMessageDTO = {
      message: {
        content: new Uint8Array(),
        authorAddress: 'string',
        timestamp: 0,
        version: 0,
      } as unknown as jest.Mocked<DocumentUpdate>,
      keys,
      verify: true,
    }
    await decryptMessage.execute(dto)

    expect(encryptionSerivce.decryptData).toHaveBeenCalled()
  })

  it('should fetch verification key', async () => {
    const dto: DecryptMessageDTO = {
      message: {
        content: new Uint8Array(),
        authorAddress: 'string',
        timestamp: 0,
        version: 0,
      } as unknown as jest.Mocked<DocumentUpdate>,
      keys,
      verify: true,
    }
    await decryptMessage.execute(dto)

    expect(encryptionSerivce.getVerificationKey).toHaveBeenCalled()
  })

  it('should fail if cannot fetch verification key', async () => {
    ;(encryptionSerivce.getVerificationKey as jest.Mock).mockReturnValue(Result.fail('error'))

    const dto: DecryptMessageDTO = {
      message: {
        content: new Uint8Array(),
        authorAddress: 'string',
        timestamp: 0,
        version: 0,
      } as unknown as jest.Mocked<DocumentUpdate>,
      keys,
      verify: true,
    }

    const result = await decryptMessage.execute(dto)

    expect(result.isFailed()).toBeTruthy()
  })

  it('should verify data', async () => {
    const dto: DecryptMessageDTO = {
      message: {
        content: new Uint8Array(),
        authorAddress: 'string',
        timestamp: 0,
        version: 0,
      } as unknown as jest.Mocked<DocumentUpdate>,
      keys,
      verify: true,
    }
    await decryptMessage.execute(dto)

    expect(encryptionSerivce.verifyData).toHaveBeenCalled()
  })

  it('should fail if verification fails', async () => {
    ;(encryptionSerivce.verifyData as jest.Mock).mockReturnValue(Result.fail('error'))

    const dto: DecryptMessageDTO = {
      message: {
        content: new Uint8Array(),
        authorAddress: 'string',
        timestamp: 0,
        version: 0,
      } as unknown as jest.Mocked<DocumentUpdate>,
      keys,
      verify: true,
    }

    const result = await decryptMessage.execute(dto)

    expect(result.isFailed()).toBeTruthy()
  })

  it('should not verify if verify is false', async () => {
    const dto: DecryptMessageDTO = {
      message: {
        content: new Uint8Array(),
        authorAddress: 'string',
        timestamp: 0,
        version: 0,
      } as unknown as jest.Mocked<DocumentUpdate>,
      keys,
      verify: false,
    }

    await decryptMessage.execute(dto)

    expect(encryptionSerivce.verifyData).not.toHaveBeenCalled()
  })
})
