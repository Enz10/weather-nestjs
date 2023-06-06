import {HttpModule} from '@nestjs/axios'
import {DynamicModule, Module} from '@nestjs/common'
import {WeatherController} from './weather.controller'
import {CqrsModule, QueryHandler} from '@nestjs/cqrs'
import {WeatherRepository} from './repository/weather.repository'
import {ForecastRepository} from './repository/forecast.repository'
import {LocationRepository} from './repository/location.repository'
import {QueryHandlers} from './queries/handlers'

@Module({
  imports: [CqrsModule, HttpModule],
  providers: [
    WeatherRepository,
    ForecastRepository,
    LocationRepository,
    ...QueryHandlers
  ],
  controllers: [WeatherController]
})
export class WeatherModule {
  static forRoot(): DynamicModule {
    return {
      module: WeatherModule,
      imports: [HttpModule],
      providers: [
        WeatherRepository,
        ForecastRepository,
        LocationRepository,
        ...QueryHandlers
      ],
      exports: [
        WeatherRepository,
        ForecastRepository,
        LocationRepository,
        ...QueryHandlers
      ],
      global: true
    }
  }
}
