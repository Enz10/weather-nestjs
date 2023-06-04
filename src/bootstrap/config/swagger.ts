import {readFile} from 'fs/promises'

import {INestApplication} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

import {ApiError} from '../middlewares/api-error'

export async function useSwagger(app: INestApplication) {
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'))

  const {name, description, version} = packageJson

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (_controllerName, methodName) => methodName,
    extraModels: [ApiError]
  })

  SwaggerModule.setup('swagger', app, document)

  return app
}
