import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordleService {
  activeRow = 0;
  guessCount = 0;
  guessResult = '';
  numberOfCellsPerRow = 5;
  numberOfRows = 6;
  wordToGuess = '';
  words = [
    'kraal',
    'appel',
    'groen',
    'graag',
    'greep',
    'kramp',
    'aarde',
    'ander',
    'ronde',
  ];

  rowSubject = new BehaviorSubject<number>(0);

  constructor() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.wordToGuess = this.words[randomIndex];
  }

  /**
   * description - check input - aangeroepen vanuit de Tile component
   * @param guessedLetter {string} - de letter die de speler intypt
   * @param letterIndex  {number} - de positie van de letter in het te raden woord
   * @returns {string} - 'bijnaGoed' | 'goed' | '' resp letter komt voor in woord | op juiste plaats | komt niet voor
   */

  checkUserGuess(guessedLetter: string, letterIndex: number): string {
    let guessResult = '';

    if (this.wordToGuess.includes(guessedLetter)) {
      guessResult = 'bijnaGoed';
      if (this.wordToGuess[letterIndex] === guessedLetter) {
        guessResult = 'goed';
      }
    }
    this.updateActiveRow();

    return guessResult;
  }

  /**
   * - description: voedt de BehaviourSubject met nieuwe waarde. Column component is subscriber
   */
  updateActiveRow() {
    this.guessCount++;
    this.activeRow = Math.floor(this.guessCount / this.numberOfCellsPerRow);
    this.rowSubject.next(this.activeRow);
  }

  /**
   *
   * @returns {number}- aantal rijen in spel
   */
  getNumberOfRows() {
    return this.numberOfRows;
  }

  /**
   *
   * @returns {number}- aantal cellen per rij
   */
  getNumberOfCellsPerRow() {
    return this.numberOfCellsPerRow;
  }

  /**
   *
   * @returns {number}- de rij (0-N) met editable cellen
   */
  getActiveRow() {
    return this.activeRow;
  }
}
