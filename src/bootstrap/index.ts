import {NestFactory} from '@nestjs/core'

import {AppModule} from './app.module'
import {useSwagger} from './config/swagger'
import {createLogger} from './config/logger'

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const logger = createLogger(app, '*')

  app.useLogger(logger)
  app.enableCors({
    maxAge: 86400 // 24 hours
  })

  await useSwagger(app)

  await app.listen(3000)

  logger.log('Application running on port 3000')
}
