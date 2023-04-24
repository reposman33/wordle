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
  shadowedWordToGuess!: string;
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
    this.shadowedWordToGuess = this.wordToGuess; // update elke keer als een letter wel in woord maar niet op goede plek
  }

  /**
   * - description: voedt de BehaviourSubject met nieuwe waarde. Column component is subscriber
   * letterIndex {number} - de plaats van de letter in het woord
   */
  checkGame(letterIndex: number, guessedLetter: string) {
    let guessResult = '';
    this.guessedLetters[letterIndex] = guessedLetter;
    const guessedLetterindex = this.shadowedWordToGuess.indexOf(guessedLetter);

    if (!this.guessedLetters.includes('')) {
      // alle tiles gevuld
      if (this.guessedLetters.join('') === this.wordToGuess) {
        // woord geraden. Game over
        this.gameOver = true;
        guessResult = 'goed';
        this.rowSubject.next(-1);
        alert('Je hebt het woord geraden!');
      } else {
        // woord niet geraden check letter
        guessResult = guessedLetterindex > -1 ? 'bijnagoed' : '';
        this.guessedLetters = ['', '', '', '', ''];
        this.rowSubject.next(++this.activeRow);
      }
    } else {
      //  check of letter in woord
      if (guessedLetterindex > -1) {
        // letter in woord
        this.shadowedWordToGuess = this.shadowedWordToGuess.replace(
          guessedLetter,
          ''
        );
        guessResult = 'bijnaGoed';
        if (this.wordToGuess[letterIndex] === guessedLetter) {
          guessResult = 'goed';
        }
      }
    }
    return guessResult;
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
