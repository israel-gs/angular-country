import { Component } from '@angular/core'
import { CountriesService } from '../../services/countries.service'
import { Country } from '../../interfaces/country'

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {
  private _countries: Country[] = []
  public isLoading = false

  constructor (private countriesService: CountriesService) {}

  get countries () {
    return this._countries
  }

  handleSearch (value: string) {
    this.isLoading = true
    this.countriesService.getByCapital(value).subscribe(countries => {
      this._countries = countries
      this.isLoading = false
    })
  }
}
