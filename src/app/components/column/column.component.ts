import { Component, Input, OnInit } from '@angular/core';
import { WordleService } from 'src/app/services/wordle.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  activeRow!: number;

  constructor(private wordleService: WordleService) {}

  ngOnInit(): void {
    this.wordleService.rowSubject.subscribe(
      (activeRow) => (this.activeRow = activeRow)
    );
  }
}
