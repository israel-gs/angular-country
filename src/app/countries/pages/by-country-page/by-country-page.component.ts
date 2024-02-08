import { Component } from '@angular/core'
import { Country } from '../../interfaces/country'
import { CountriesService } from '../../services/countries.service'

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  private _countries: Country[] = []

  constructor (private countriesService: CountriesService) {}

  get countries () {
    return this._countries
  }

  handleSearch (value: string) {
    this.countriesService.getByCountry(value).subscribe(countries => {
      this._countries = countries
    })
  }
}
