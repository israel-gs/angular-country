import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Country} from '../interfaces/country.interface'
import {Observable, catchError, delay, map, of, tap} from 'rxjs'
import {CacheStore} from '../interfaces/cashe-store.interface'
import {Region} from '../interfaces/region.type'

const BASE_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  public cacheStorage: CacheStore = {
    byCapital: {term: '', data: [] as Country[]},
    byCountry: {term: '', data: [] as Country[]},
    byRegion: {region: '', data: [] as Country[]}
  }

  constructor(private httpClient: HttpClient) {
    this.getFromLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStorage))
  }

  private getFromLocalStorage() {
    const data = localStorage.getItem('cacheStorage')
    if (data) {
      this.cacheStorage = JSON.parse(data)
    }
  }

  getByAlphaCode(alphaCode: string): Observable<Country | null> {
    return this.httpClient
      .get<Country[]>(`${BASE_URL}/alpha/${alphaCode}`)
      .pipe(
        map(countries => countries[0] ?? null),
        catchError(_ => of(null))
      )
  }

  getByCapital(capital: string) {
    return this._getCountriesRequest(`${BASE_URL}/capital/${capital}`).pipe(
      tap(countries => {
        this.cacheStorage.byCapital = {term: capital, data: countries}
      }),
      tap(_ => this.saveToLocalStorage())
    )
  }

  getByCountry(country: string) {
    return this._getCountriesRequest(`${BASE_URL}/name/${country}`).pipe(
      tap(countries => {
        this.cacheStorage.byCountry = {term: country, data: countries}
      }),
      tap(_ => this.saveToLocalStorage())
    )
  }

  getByRegion(region: Region) {
    return this._getCountriesRequest(`${BASE_URL}/region/${region}`).pipe(
      tap(countries => {
        this.cacheStorage.byRegion = {region, data: countries}
      }),
      tap(_ => this.saveToLocalStorage())
    )
  }

  private _getCountriesRequest(url: string) {
    return this.httpClient.get<Country[]>(url).pipe(catchError(_ => of([])))
  }
}
