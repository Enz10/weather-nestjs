import {IQueryHandler, QueryHandler} from '@nestjs/cqrs'
import {GetLocationQuery} from '../impl/get-location.query'
import {LocationRepository} from '../../repository/location.repository'

@QueryHandler(GetLocationQuery)
export class GetLocationHandler implements IQueryHandler<GetLocationQuery> {
  constructor(private readonly repository: LocationRepository) {}

  async execute() {
    return this.repository.getLocation()
  }
}
