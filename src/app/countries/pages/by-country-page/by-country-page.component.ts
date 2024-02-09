import { Component, OnInit } from '@angular/core'
import { Country } from '../../interfaces/country.interface'
import { CountriesService } from '../../services/countries.service'

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  private _countries: Country[] = []
  public initialTerm = ''

  constructor (private countriesService: CountriesService) {}

  ngOnInit (): void {
    this._countries = this.countriesService.cacheStorage.byCountry.data
    this.initialTerm = this.countriesService.cacheStorage.byCountry.term
  }

  get countries () {
    return this._countries
  }

  handleSearch (value: string) {
    this.countriesService.getByCountry(value).subscribe(countries => {
      this._countries = countries
    })
  }
}
