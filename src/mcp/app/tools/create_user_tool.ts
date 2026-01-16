import type { ToolContext } from '@jrmc/adonis-mcp/types/context'
import type { BaseSchema, InferJSONSchema } from '@jrmc/adonis-mcp/types/method'

import { Tool } from '@jrmc/adonis-mcp'
import { UserMcpValidator } from '#mcp/validators/user_validator'
import User from '#core/models/user'

type Schema = BaseSchema<{
  firstname: { type: 'string' }
  lastname: { type: 'string' }
  email: { type: 'string' }
  password: { type: 'string' }
  role: { type: 'string' }
  disabled: { type: 'boolean' }
}>

type Context = ToolContext & { args: InferJSONSchema<Schema> }

export default class CreateUserTool extends Tool<Schema> {
  name = 'create_user'
  title = 'Create User'
  description = 'Create a new user with firstname, lastname, email, and optional password, role, and disabled status'

  async handle({ args, response }: Context) {
    try {
      const payload = await UserMcpValidator.validate(args)

      const user = await User.create(payload)

      return response.text(`User "${user.fullname}" created successfully with id: ${user.id}`)
    } catch (error) {
      return response.error('Error: ' + error.message)
    }
  }

  schema() {
    return {
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
          description: 'First name of the user',
        },
        lastname: {
          type: 'string',
          description: 'Last name of the user',
        },
        email: {
          type: 'string',
          description: 'Email address of the user (must be unique)',
        },
        password: {
          type: 'string',
          description: 'Password for the user (optional, auto-generated if not provided)',
        },
        role: {
          type: 'string',
          description: 'Role of the user: "admin" or "user" (default: "user")',
        },
        disabled: {
          type: 'boolean',
          description: 'Whether the user account is disabled (default: false)',
        },
      },
      required: ['firstname', 'lastname', 'email'],
    } as Schema
  }
}
