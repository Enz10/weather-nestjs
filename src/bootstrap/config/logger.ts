import {INestApplication, LoggerService, LogLevel} from '@nestjs/common'
import {v4 as uuid} from 'uuid'

import {now} from '~/utils'

export function createLogger(
  app: INestApplication,
  logLevel: '*' | LogLevel[]
) {
  return new AppLogger(logLevel, async log => console.log(log), uuid)
}

export class AppLogger implements LoggerService {
  constructor(
    private readonly levels: '*' | LogLevel[],
    private readonly logFn: (log: string) => void,
    private readonly idProvider: () => string
  ) {}

  log(message: any, context = AppLogger.name) {
    if (this.shouldLog('log')) {
      this.logFn(this.format('log', context, message))
    }
  }

  error(message: any, trace?: string, context = AppLogger.name) {
    if (this.shouldLog('error')) {
      this.logFn(this.format('error', context, message, trace))
    }
  }

  warn(message: any, context = AppLogger.name) {
    if (this.shouldLog('warn')) {
      this.logFn(this.format('warn', context, message))
    }
  }

  debug(message: any, context = AppLogger.name) {
    if (this.shouldLog('debug')) {
      this.logFn(this.format('debug', context, message))
    }
  }

  verbose(message: any, context = AppLogger.name) {
    if (this.shouldLog('verbose')) {
      this.logFn(this.format('verbose', context, message))
    }
  }

  private get id() {
    return `[id:${this.idProvider()}]`
  }

  private shouldLog(level: LogLevel) {
    return this.levels === '*' || this.levels.includes(level)
  }

  private format(
    level: LogLevel,
    context: string,
    message: any,
    trace?: string
  ) {
    return `${now()} ${this.id} ${level.toUpperCase()} {${context}} ${message}${
      trace ? '\n' + trace : ''
    }`
  }
}
