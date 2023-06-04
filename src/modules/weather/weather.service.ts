import {HttpService} from '@nestjs/axios'
import {Injectable} from '@nestjs/common'
import {env} from 'process'

@Injectable()
export class WeatherService {
  private readonly baseUrl: string
  private readonly ipUrl: string
  private readonly apiKey: string

  constructor(private httpService: HttpService) {
    this.baseUrl = env.OPEN_WEATHER_BASE_URL
    this.apiKey = env.OPEN_WEATHER_API_KEY
    this.ipUrl = env.IP_API_BASE_URL
  }

  private get http() {
    return this.httpService.axiosRef
  }

  async getWeather(city: string) {
    const response = await this.http.get(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
    return response.data
  }

  async getForecast(city: string) {
    const response = await this.http.get(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    )
    return response.data
  }

  async getLocation() {
    const response = await this.http.get(
      `${this.ipUrl}/?fields=49179`
    )
    return response.data
  }
}
