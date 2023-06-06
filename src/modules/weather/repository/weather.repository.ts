import {HttpService} from '@nestjs/axios'
import {Injectable} from '@nestjs/common'
import {Env} from '~/lib/env'
import {CurrentWeather} from '../interfaces'

@Injectable()
export class WeatherRepository {
  constructor(
    @Env('OPEN_WEATHER_BASE_URL')
    private readonly baseUrl: string,
    @Env('OPEN_WEATHER_API_KEY')
    private readonly apiKey: string,
    private httpClient: HttpService
  ) {}

  async getWeather(city: string) {
    const response = await this.httpClient.axiosRef.get<CurrentWeather>(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
    return response.data
  }
}
