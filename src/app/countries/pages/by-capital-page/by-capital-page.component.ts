import { Component, OnInit } from '@angular/core'
import { CountriesService } from '../../services/countries.service'
import { Country } from '../../interfaces/country.interface'

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  private _countries: Country[] = []
  public isLoading = false
  public initialTerm = ''

  constructor (private countriesService: CountriesService) {}

  ngOnInit (): void {
    this._countries = this.countriesService.cacheStorage.byCapital.data
    this.initialTerm = this.countriesService.cacheStorage.byCapital.term
  }

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
