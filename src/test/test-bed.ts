import {DynamicModule, Type} from '@nestjs/common'
import {Test, TestingModuleBuilder} from '@nestjs/testing'

import request from 'supertest'
import {EnvModule} from '~/lib/env'

export type ITestModule = request.SuperTest<request.Test>
export type Module = Type<any> | DynamicModule
export type ConfigureTestingModule = (
  builder: Omit<TestingModuleBuilder, 'compile'>
) => void

export async function createTestModule(
  module: Module,
  configure?: ConfigureTestingModule
): Promise<ITestModule> {
  const builder = Test.createTestingModule({
    imports: [EnvModule.forRoot(), module]
  })

  configure?.(builder)

  const moduleFixture = await builder.compile()
  const app = moduleFixture.createNestApplication()
  await app.init()

  return request(app.getHttpServer())
}
