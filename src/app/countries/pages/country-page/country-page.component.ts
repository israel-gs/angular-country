import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CountriesService } from '../../services/countries.service'
import { Country } from '../../interfaces/country.interface'
import { switchMap } from 'rxjs'

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {
  private _country: Country | null = null

  constructor (
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  get country (): Country | null {
    return this._country
  }

  get translationsCode () {
    if (!this._country) return []
    return Object.keys(this._country.translations)
  }

  ngOnInit (): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.countriesService.getByAlphaCode(id)))
      .subscribe(country => {
        if (!country) {
          this.router.navigate([''])
          return
        }
        this._country = country
      })
  }
}
