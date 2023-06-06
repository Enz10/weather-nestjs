import {Coord, Weather, Wind, Clouds, MainCommon} from './common.interface'

export type Main = MainCommon & {
  sea_level: number
  grnd_level: number
  temp_kf: number
}

export interface Sys {
  pod: string
}

export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface List {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  sys: Sys
  dt_txt: string
}

export interface Forecast {
  cod: string
  message: number
  cnt: number
  list: List[]
}
