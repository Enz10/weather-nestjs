import {env} from 'process'

import {Inject, Provider} from '@nestjs/common'

const registry = new Map<string, Provider<string>>()

export default function loadProviders() {
  return Array.from(registry.values())
}

export const createEnvInjectionToken = (key: string) => `env(${key})`

/**
 * Injecta una variable de ambiente
 * @param key la clave de la variable de ambiente
 */
export function Env(key: string): ParameterDecorator {
  if (!registry.has(key)) {
    registry.set(key, createEnvProvider(key))
  }

  return Inject(createEnvInjectionToken(key))
}

function createEnvProvider(key: string): Provider<string> {
  return {
    provide: createEnvInjectionToken(key),
    useFactory() {
      const value = env[key]

      if (typeof value === 'undefined') {
        throw new Error(`Environment variable "${key}" is not defined.`)
      }

      return value
    }
  }
}
