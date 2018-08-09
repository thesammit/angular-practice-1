import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating: number;
  @Input() itemName: string;
  starWidth: number;
  @Output() onRatingClick : EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnChanges() {
    this.starWidth = this.rating * 75/5;
  }

  onClick() {
    this.onRatingClick.emit(`${this.itemName} is rated ${this.rating} stars.`);
  }

}
