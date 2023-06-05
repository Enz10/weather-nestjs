import {HttpService} from '@nestjs/axios'
import {Injectable} from '@nestjs/common'
import {Env} from '~/lib/env'

@Injectable()
export class WeatherService {
  constructor(
    @Env('OPEN_WEATHER_BASE_URL')
    private readonly baseUrl: string,
    @Env('OPEN_WEATHER_API_KEY')
    private readonly apiKey: string,
    @Env('IP_API_BASE_URL')
    private readonly ipUrl: string,
    private httpClient: HttpService
  ) {}

  async getWeather(city: string) {
    const response = await this.httpClient.axiosRef.get(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
    return response.data
  }

  async getForecast(city: string) {
    const response = await this.httpClient.axiosRef.get(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    )
    return response.data
  }

  async getLocation() {
    const response = await this.httpClient.axiosRef.get(
      `${this.ipUrl}/?fields=49179`
    )
    return response.data
  }
}
