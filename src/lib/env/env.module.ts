import {DynamicModule} from '@nestjs/common'

import loadProviders from './env.decorator'

export class EnvModule {
  static forRoot(): DynamicModule {
    const providers = loadProviders()

    return {
      global: true,
      module: EnvModule,
      providers,
      exports: providers
    }
  }
}
