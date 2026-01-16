import vine from '@vinejs/vine'
import Roles from '#core/enums/roles'

export const MIN_LENGTH = 2
export const MAX_LENGTH = 50
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 255

export const UserMcpValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(MIN_LENGTH).maxLength(MAX_LENGTH),
    lastname: vine.string().trim().minLength(MIN_LENGTH).maxLength(MAX_LENGTH),
    email: vine.string().trim().toLowerCase().email(),
    password: vine
      .string()
      .minLength(PASSWORD_MIN_LENGTH)
      .maxLength(PASSWORD_MAX_LENGTH)
      .optional(),
    role: vine.enum(Object.values(Roles)).optional(),
    disabled: vine.boolean().optional(),
  })
)
