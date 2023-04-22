import { Component, Input, OnInit } from '@angular/core';
import { WordleService } from 'src/app/services/wordle.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
