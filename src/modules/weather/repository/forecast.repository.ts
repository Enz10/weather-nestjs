import {HttpService} from '@nestjs/axios'
import {Injectable} from '@nestjs/common'
import {Env} from '~/lib/env'
import {Forecast} from '../interfaces'

@Injectable()
export class ForecastRepository {
  constructor(
    @Env('OPEN_WEATHER_BASE_URL')
    private readonly baseUrl: string,
    @Env('OPEN_WEATHER_API_KEY')
    private readonly apiKey: string,
    private httpClient: HttpService
  ) {}

  async getForecast(city: string) {
    const response = await this.httpClient.axiosRef.get<Forecast>(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    )
    return response.data
  }
}
