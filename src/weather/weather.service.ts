import {Injectable} from '@nestjs/common'
import axios from 'axios'
import {env} from 'process'

@Injectable()
export class WeatherService {
  private readonly baseURL = 'https://api.openweathermap.org/data/2.5'
  private readonly apiKey = env.OPEN_WEATHER_API_KEY

  async getWeather(city: string) {
    console.log(env.OPEN_WEATHER_API_KEY)
    const response = await axios.get(
      `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}`
    )
    return response.data
  }
}
