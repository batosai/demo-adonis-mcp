import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LogMcpTrafficMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const start = Date.now()

    await next()

    if (response.response.statusCode === 404) {
      console.log('[404]', request.method(), request.url())
    }

    const ms = Date.now() - start
    const ct = response.getHeader('Content-Type')
    const status = response.response.statusCode

    // Filtre optionnel : ne log que MCP
    if (request.url().includes('mcp')) {
      console.log(
        `[MCP] ${request.method()} ${request.url()} -> ${status} CT=${ct ?? 'NULL'} (${ms}ms)`
      )
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
