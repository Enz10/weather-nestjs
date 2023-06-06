import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetForecastQuery} from '../impl/get-forecast.query'
import {ForecastRepository} from '../../repository/forecast.repository'

@QueryHandler(GetForecastQuery)
export class GetForecastHandler implements IQueryHandler<GetForecastQuery> {
  constructor(private readonly repository: ForecastRepository) {}

  async execute(query: GetForecastQuery) {
    return this.repository.getForecast(query.city)
  }
}
