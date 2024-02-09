import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core'
import { Subject, Subscription, debounceTime } from 'rxjs'

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Search'
  @Output() onSearch: EventEmitter<string> = new EventEmitter()
  private debouncer: Subject<string> = new Subject()
  private debouncerSubscription?: Subscription

  ngOnInit (): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.handleSearch(value)
      })
  }

  ngOnDestroy (): void {
    this.debouncerSubscription?.unsubscribe()
  }

  onKeyUp (value: string): void {
    this.debouncer.next(value)
  }

  handleSearch (value: string): void {
    this.onSearch.emit(value)
  }
}
