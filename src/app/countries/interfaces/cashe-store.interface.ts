import {Country} from './country.interface'
import {Region} from './region.type'

export interface CacheStore {
  byCapital: Term
  byCountry: Term
  byRegion: RegionTerm
}

export interface Term {
  term: string
  data: Country[]
}

export interface RegionTerm {
  region?: Region
  data: Country[]
}
