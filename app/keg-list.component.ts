import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <select (change)="onChange($event.target.value)">
    <option value="allKegs" selected="selected">All Kegs</option>
    <option value="lessThanTen">Less than 10 pints left</option>
  </select>

  <ul>
  <!-- let is the same as var, just in small scope. "let keg of childKegs" is where we declare that keg is equal to each keg object in childKegs array -->
    <li [class]="kegStyle(keg)" *ngFor="let keg of childKegs | remainingPints:filterByPints">{{keg.name}}, {{keg.alcoholContent}} from {{keg.brand}} - {{keg.price}}, {{keg.pints}} pints left<button (click)="editKegClicked(keg)">Edit keg</button><button (click)="sellPint(keg)">Sell Pint</button><button (click)="sellGrowler(keg)">Sell Growler</button><button (click)="sellLargeGrowler(keg)">Sell Large Growler</button></li>
  </ul>
  `
})

export class KegListComponent {
  @Input() childKegs: Keg[];
  @Output() clickSender = new EventEmitter();

  kegStyle(keg){
    let kegClass = "";
    let alcoholNumber = +keg.alcoholContent;

    if(keg.price > 7) {
      kegClass = "expensive";
    } else if(keg.price > 4) {
      kegClass = "normal";
    } else {
      kegClass = "cheap";
    }
    if(alcoholNumber < 4) {
      kegClass = kegClass + " weak";
    } else if(alcoholNumber > 8) {
      kegClass = kegClass + " strong";
    }
    return kegClass;
  }

  // alcoholBold(keg){
  //   //+ means parse int
  //   let alcoholNumber = +keg.alcoholContent;
  //   if(alcoholNumber < 4) {
  //     return "weak";
  //   }
  //
  // }
  editKegClicked(kegToEdit: Keg) {
    this.clickSender.emit(kegToEdit);
  }

//this function is simple. basically, one keg object is passed in as an argument. all we have to do is adjust that keg object's pints value to itself minus one.
  sellPint(kegToSell: Keg) {
    kegToSell.pints -=1;
  }

  sellGrowler(kegToSell: Keg) {
    kegToSell.pints -= 2;
  }

  sellLargeGrowler(kegToSell: Keg) {
    kegToSell.pints -= 4;
  }

  filterByPints: string = "allKegs";

  onChange(optionFromMenu) {
    this.filterByPints = optionFromMenu;
  }
}
