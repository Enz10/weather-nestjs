import {HttpStatus} from '@nestjs/common'
import {ApiProperty} from '@nestjs/swagger'

export type ErrorCode =
  | 'bad.request'
  | 'forbidden'
  | 'unauthorized'
  | 'not.found'
  | 'method.not.allowed'
  | 'conflict'
  | 'unsupported.media.type'
  | 'internal.server.error'
  | 'bad.gateway'
  | 'service.unavailable'
  | 'gateway.timeout'
  | 'unknown'

const DEFAULT_ERROR = 'Algo salió mal'

export class ApiError {
  @ApiProperty({type: 'boolean'})
  __apiError = true

  @ApiProperty({
    enum: [
      'bad.request',
      'forbidden',
      'unauthorized',
      'not.found',
      'method.not.allowed',
      'conflict',
      'unsupported.media.type',
      'internal.server.error',
      'bad.gateway',
      'service.unavailable',
      'gateway.timeout',
      'unknown'
    ]
  })
  code: ErrorCode

  @ApiProperty({type: 'string'})
  message: string

  @ApiProperty({type: 'string', required: false})
  stack?: string

  private constructor(code: ErrorCode, message: string, stack?: string) {
    this.code = code
    this.message = message
    this.stack = stack
  }

  static fromHttpError(
    httpStatus: number,
    message: string,
    stack: string | undefined,
    hideDetails: boolean
  ) {
    return new ApiError(
      mapHttpStatusToErrorCode(httpStatus),
      hideDetails && httpStatus >= HttpStatus.INTERNAL_SERVER_ERROR
        ? DEFAULT_ERROR
        : message,
      hideDetails ? stack : undefined
    )
  }
}

const ErrorCodeMap: Record<number, ErrorCode> = {
  400: 'bad.request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not.found',
  405: 'method.not.allowed',
  409: 'conflict',
  415: 'unsupported.media.type',
  500: 'internal.server.error',
  502: 'bad.gateway',
  503: 'service.unavailable',
  504: 'gateway.timeout'
} as const

export const mapHttpStatusToErrorCode = (httpError: number): ErrorCode => {
  const code = ErrorCodeMap[httpError]

  if (typeof code === 'undefined') return 'unknown'

  return code
}
