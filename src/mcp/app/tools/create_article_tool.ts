import type { ToolContext } from '@jrmc/adonis-mcp/types/context'
import type { BaseSchema, InferJSONSchema } from '@jrmc/adonis-mcp/types/method'

import { ArticleValidator } from '#mcp/validators/article_validator'
import Article from '#core/models/article'

import { Tool } from '@jrmc/adonis-mcp'

type Schema = BaseSchema<{
  title: { type: "string" }
  content: { type: "string" }
}>

type Context = ToolContext & { args: InferJSONSchema<Schema> }

export default class CreateArticleTool extends Tool<Schema> {
  name = 'create_article'
  title = 'Create Article'
  description = 'Create a new article'

  async handle({ args, response }: Context) {
    try {
      const payload = await ArticleValidator.validate(args)

      const article = await Article.create(payload)
      return response.text(`Article "${article.title}" created successfully with id: ${article.id}`)
    } catch (error) {
      return response.error('Error: ' + error.message)
    }
  }

  schema() {
    return {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Title of the article"
        },
        content: {
          type: "string",
          description: "Content of the article"
        },
      },
      required: ["title", "content"]
    } as Schema
  }
}
