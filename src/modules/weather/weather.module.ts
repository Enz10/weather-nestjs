import {HttpModule} from '@nestjs/axios'
import {DynamicModule, Module} from '@nestjs/common'
import {WeatherService} from './weather.service'
import {WeatherController} from './weather.controller'

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule {
  static forRoot(): DynamicModule {
    return {
      module: WeatherModule,
      imports: [HttpModule],
      providers: [WeatherService],
      exports: [WeatherService],
      global: true
    }
  }
}
