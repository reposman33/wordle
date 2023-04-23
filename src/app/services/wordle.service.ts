import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordleService {
  activeRow!: number;
  gameOver!: boolean;
  guessResult!: string;
  guessedLetters!: string[];
  numberOfCellsPerRow!: number;
  numberOfRows!: number;
  wordToGuess!: string;
  words!: string[];

  rowSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.initialize();
  }

  /**
   * description - initialiseer spel
   */
  initialize() {
    this.words = [
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
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.wordToGuess = this.words[randomIndex];
    this.activeRow = 0;
    this.guessedLetters = ['', '', '', '', ''];
    this.guessResult = '';
    this.gameOver = false;
    this.numberOfCellsPerRow = 5;
    this.numberOfRows = 6;
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
    this.checkGame(letterIndex, guessedLetter);

    return guessResult;
  }

  /**
   * - description: voedt de BehaviourSubject met nieuwe waarde. Column component is subscriber
   * letterIndex {number} - de plaats van de letter in het woord
   */
  checkGame(letterIndex: number, guessedLetter: string) {
    console.log('this.guessedLetters:', this.guessedLetters);
    this.guessedLetters[letterIndex] = guessedLetter;
    // check: geen '' meer in this.guessedLetters
    if (!this.guessedLetters.includes('')) {
      if (this.guessedLetters.join('') === this.wordToGuess) {
        this.gameOver = true;
        this.guessResult = '';
        this.rowSubject.next(-1);
        alert('Je hebt het woord geraden!');
      } else {
        // alle letters ingevuld, woord niet geraden
        this.guessedLetters = ['', '', '', '', ''];
        this.rowSubject.next(++this.activeRow);
      }
    }
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
