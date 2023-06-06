import {Coord, Weather, Wind, Clouds, MainCommon} from './common.interface'

export type Main = MainCommon

export interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

export interface CurrentWeather {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}
