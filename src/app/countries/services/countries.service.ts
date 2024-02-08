import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Country } from '../interfaces/country'
import { catchError, of } from 'rxjs'

const BASE_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor (private httpClient: HttpClient) {}

  getByCapital (capital: string) {
    return this.httpClient
      .get<Country[]>(`${BASE_URL}/capital/${capital}`)
      .pipe(catchError(_ => of([])))
  }

  getByCountry (country: string) {
    return this.httpClient
      .get<Country[]>(`${BASE_URL}/name/${country}`)
      .pipe(catchError(_ => of([])))
  }

  getByRegion (region: string) {
    return this.httpClient
      .get<Country[]>(`${BASE_URL}/region/${region}`)
      .pipe(catchError(_ => of([])))
  }
}
