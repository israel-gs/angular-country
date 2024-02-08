import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  @Input() placeholder: string = 'Search'
  @Output() onSearch: EventEmitter<string> = new EventEmitter()

  handleSearch (value: string): void {
    this.onSearch.emit(value)
  }
}
