import {Controller, Param, Get} from '@nestjs/common'
import {WeatherService} from './weather.service'
import {ApiTags} from '@nestjs/swagger'

@Controller('v1')
@ApiTags('Weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current/:city?')
  async getCurrent(@Param('city') city: string) {
    if (!city) {
      const location = await this.weatherService.getLocation()
      city = location.regionName
    }
    return this.weatherService.getWeather(city)
  }

  @Get('forecast/:city?')
  async getForecast(@Param('city') city: string) {
    if (!city) {
      const location = await this.weatherService.getLocation()
      city = location.regionName
    }
    return this.weatherService.getForecast(city)
  }

  @Get('location')
  async getLocation() {
    return this.weatherService.getLocation()
  }
}
