import { Component } from '@angular/core'
import { Country } from '../../interfaces/country'
import { CountriesService } from '../../services/countries.service'

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  private _countries: Country[] = []

  constructor (private countriesService: CountriesService) {}

  get countries () {
    return this._countries
  }

  handleSearch (value: string) {
    this.countriesService.getByRegion(value).subscribe(countries => {
      this._countries = countries
    })
  }
}
