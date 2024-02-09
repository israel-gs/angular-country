import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Country } from '../interfaces/country'
import { Observable, catchError, map, of } from 'rxjs'

const BASE_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor (private httpClient: HttpClient) {}

  getByAlphaCode (alphaCode: string): Observable<Country | null> {
    return this.httpClient
      .get<Country[]>(`${BASE_URL}/alpha/${alphaCode}`)
      .pipe(
        map(countries => countries[0] ?? null),
        catchError(_ => of(null))
      )
  }

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
