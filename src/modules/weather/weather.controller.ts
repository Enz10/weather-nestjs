import {Controller, Get, Query} from '@nestjs/common'
import {ApiQuery, ApiTags} from '@nestjs/swagger'
import {QueryBus} from '@nestjs/cqrs'
import {GetWeatherQuery} from './queries/impl/get-weather.query'
import {GetLocationQuery} from './queries/impl/get-location.query'
import {GetForecastQuery} from './queries/impl/get-forecast.query'

@Controller('v1')
@ApiTags('Weather')
export class WeatherController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('current/:city?')
  @ApiQuery({name: 'city', required: false})
  async getCurrent(@Query('city') city: string) {
    if (!city) {
      const location = await this.queryBus.execute(new GetLocationQuery())
      city = location.regionName
    }
    return this.queryBus.execute(new GetWeatherQuery(city))
  }

  @Get('forecast/:city?')
  @ApiQuery({name: 'city', required: false})
  async getForecast(@Query('city') city: string) {
    if (!city) {
      const location = await this.queryBus.execute(new GetLocationQuery())
      city = location.regionName
    }
    return this.queryBus.execute(new GetForecastQuery(city))
  }

  @Get('location')
  async getLocation() {
    return this.queryBus.execute(new GetLocationQuery())
  }
}
