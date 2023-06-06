import {rest} from 'msw'

import {WeatherModule} from '~/modules/weather'
import {CurrentWeather, Forecast, Location} from '~/modules/weather/interfaces'
import {ITestModule, createTestModule, server} from '~/test'

describe('WeatherController (e2e)', () => {
  let testModule: ITestModule

  beforeEach(async () => {
    testModule = await createTestModule(WeatherModule)
  })

  it('/v1/location (GET)', () => {
    server.use(handlers.location)
    return testModule.get('/v1/location').expect(200)
  })

  it('/v1/current/city? (GET)', () => {
    server.use(handlers.current)
    return testModule.get('/v1/current/city?').expect(200)
  })

  it('/v1/forecast/city? (GET)', () => {
    server.use(handlers.forecast)
    return testModule.get('/v1/forecast/city?').expect(200)
  })
})

const handlers = {
  location: rest.get(/\/v1\/location$/, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        mockLocation
      })
    )
  }),
  current: rest.get(/\/v1\/current\/city?$/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
  forecast: rest.get(/\/v1\/forecast\/city?$/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  })
}

const mockLocation: Location = {
  status: 'success',
  country: 'Argentina',
  countryCode: 'AR',
  regionName: 'Buenos Aires',
  city: 'Quilmes'
}
