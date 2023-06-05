import {Module} from '@nestjs/common'
import {WeatherModule} from '~/modules/weather'
import {EnvModule} from '~/lib/env'

@Module({
  imports: [WeatherModule.forRoot(), EnvModule.forRoot()],
  controllers: [],
  providers: []
})
export class AppModule {}
