import {} from 'hono'

declare module 'hono' {
  // it allows us to specify a renderer with the extra properties like title
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response
  }
}
