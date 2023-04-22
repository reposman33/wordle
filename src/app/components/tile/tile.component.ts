import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input() index!: number;
  inputValue = '';

  constructor() {}

  ngOnInit() {}
}
