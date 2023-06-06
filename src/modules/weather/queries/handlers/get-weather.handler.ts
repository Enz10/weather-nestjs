import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetWeatherQuery} from '../impl/get-weather.query'
import {WeatherRepository} from '../../repository/weather.repository'

@QueryHandler(GetWeatherQuery)
export class GetWeatherHandler implements IQueryHandler<GetWeatherQuery> {
  constructor(private readonly repository: WeatherRepository) {}

  async execute(query: GetWeatherQuery) {
    return this.repository.getWeather(query.city)
  }
}
