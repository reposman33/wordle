import { Component, Input } from '@angular/core';
import { WordleService } from 'src/app/services/wordle.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input() index!: number;
  inputValue = '';
  userGuess = '';

  constructor(private wordleService: WordleService) {}

  ngOnInit() {}

  /**
   * description - check de door speler ingevoerde letter in tile. Resultaat mapt 1:1 met een css class
   * @param userGuess {string} - door speler ingevoerde letter in tile
   */
  processInputValue(userGuess: string) {
    this.userGuess = this.wordleService.checkGame(this.index, userGuess);
  }
}
