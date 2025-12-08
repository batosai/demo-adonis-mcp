import vine from '@vinejs/vine'
import User from '#core/models/user'

export const MIN_LENGTH = 2
export const MAX_LENGTH = 50
export const MAX_SIZE = '10mb'

export const ArticleValidator = vine.withMetaData<{ currentUser?: User; record?: User }>().compile(
  vine.object({
    title: vine.string().trim().toCamelCase().minLength(MIN_LENGTH).maxLength(MAX_LENGTH),
    content: vine.string().trim().toCamelCase().minLength(MIN_LENGTH).maxLength(MAX_LENGTH),
    image: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png', 'webp'],
      })
      .optional(),
  })
)
