import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordleService {
  guessCount = 0;
  numberOfRows = 6;
  numberOfCellsPerRow = 5;
  activeRow = 0;

  constructor() {}

  checkUserGuess(input: string, index: number) {
    this.guessCount++;
    this.activeRow = this.guessCount / this.numberOfCellsPerRow;
  }

  cellIsEditable(cellIndex: number) {
    return (
      cellIndex >= this.activeRow * this.numberOfCellsPerRow &&
      cellIndex < (this.activeRow + 1) * this.numberOfCellsPerRow
    );
  }

  getNumberOfRows() {
    return this.numberOfRows;
  }

  getNumberOfCellsPerRow() {
    return this.numberOfCellsPerRow;
  }

  getActiveRow() {
    return this.activeRow;
  }
}
