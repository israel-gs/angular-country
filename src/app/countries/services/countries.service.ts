import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Country } from '../interfaces/country'
import { Observable, catchError, delay, map, of } from 'rxjs'

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
    return this._getCountriesRequest(`${BASE_URL}/capital/${capital}`)
  }

  getByCountry (country: string) {
    return this._getCountriesRequest(`${BASE_URL}/name/${country}`)
  }

  getByRegion (region: string) {
    return this._getCountriesRequest(`${BASE_URL}/region/${region}`)
  }

  private _getCountriesRequest (url: string) {
    return this.httpClient.get<Country[]>(url).pipe(catchError(_ => of([])))
  }
}
