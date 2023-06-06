import {HttpService} from '@nestjs/axios'
import {Injectable} from '@nestjs/common'
import {Env} from '~/lib/env'
import {Location} from '../interfaces/location.interface'

@Injectable()
export class LocationRepository {
  constructor(
    @Env('IP_API_BASE_URL')
    private readonly ipUrl: string,
    private httpClient: HttpService
  ) {}

  async getLocation() {
    const response = await this.httpClient.axiosRef.get<Location>(
      `${this.ipUrl}/?fields=49179`
    )
    return response.data
  }
}
