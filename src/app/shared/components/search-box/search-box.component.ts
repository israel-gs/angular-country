import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Subject, debounceTime } from 'rxjs'

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {
  @Input() placeholder: string = 'Search'
  @Output() onSearch: EventEmitter<string> = new EventEmitter()
  private debouncer: Subject<string> = new Subject()

  ngOnInit (): void {
    this.debouncer.pipe(debounceTime(300)).subscribe(value => {
      this.handleSearch(value)
    })
  }

  onKeyUp (value: string): void {
    this.debouncer.next(value)
  }

  handleSearch (value: string): void {
    this.onSearch.emit(value)
  }
}
