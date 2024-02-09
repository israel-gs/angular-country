import { Component } from '@angular/core'
import { Country } from '../../interfaces/country.interface'
import { CountriesService } from '../../services/countries.service'
import { Region } from '../../interfaces/region.type'

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  private _countries: Country[] = []
  private _regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]
  public selectedRegion?: Region

  constructor (private countriesService: CountriesService) {}

  ngOnInit (): void {
    this._countries = this.countriesService.cacheStorage.byRegion.data
    this.selectedRegion = this.countriesService.cacheStorage.byRegion.region
  }

  get countries () {
    return this._countries
  }

  get regions () {
    return this._regions
  }

  handleSearch (value: Region) {
    this.selectedRegion = value
    this.countriesService.getByRegion(value).subscribe(countries => {
      this._countries = countries
    })
  }
}
