import {format} from 'date-fns'
import esLocale from 'date-fns/locale/es'

/**
 * returns a formatted string timestamp
 */
export function now(): string {
  return format(Date.now(), 'dd/MM/yyyy hh:mm:ss', {locale: esLocale})
}
