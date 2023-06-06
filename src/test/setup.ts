import {server} from './server'

jest.setTimeout(300000)

beforeAll(() => {
  server.listen({onUnhandledRequest: 'warn'})
})

afterEach(() => {
  server.resetHandlers()
  jest.resetModules()
})

afterAll(() => {
  server.close()
})
