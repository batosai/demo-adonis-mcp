import type { ToolContext } from '@jrmc/adonis-mcp/types/context'
import type { BaseSchema, InferJSONSchema } from '@jrmc/adonis-mcp/types/method'

import { Tool } from '@jrmc/adonis-mcp'

type Schema = BaseSchema<{
  text: { type: "string" }
}>

type Context = ToolContext & { args: InferJSONSchema<Schema> }

export default class CreateArticleTool implements Tool<Schema> {
  name = 'create_article'
  title = 'Tool title'
  description = 'Tool description'

  async handle({ args, response }: Context) {
    console.log(args.text)
    return response.text('Hello, world!')
  }

  schema() {
    return {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Description text argument"
        },
      },
      required: ["text"]
    } as Schema
  }
}
