import {Controller, Param, Get} from '@nestjs/common'
import {WeatherService} from './weather.service'
import {ApiTags} from '@nestjs/swagger'

@Controller('v1')
@ApiTags('Weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current/:city?')
  async getCurrent(@Param('city') city: string) {
    return this.weatherService.getWeather(city)
  }
}
