/**
 * Title: composer-list.component.ts
 * Author: Jeremy Lates
 * Date: 04/13/2024
 * Description: Composer list component; displays a list of composers
 * Notes
 * COde adapted from https://github.com/buwebdev/web-425/blob/master/week-4/enterprise-composer-app/src/app/composer-list/composer-list.component.ts
 */

import { Component, OnInit } from '@angular/core';
import { IComposer } from '../composer.interface';
import { ComposerService } from '../composer.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-composer-list',
  templateUrl: './composer-list.component.html',
  styleUrls: ['./composer-list.component.css'],
})
export class ComposerListComponent implements OnInit {
  //Use composer observable
  composers: Observable<IComposer[]>;
  txtSearchControl = new FormControl('');

  constructor(private composerService: ComposerService) {
    this.composers = this.composerService.getComposers();

    //This subscribe method listens for valueChanges
    this.txtSearchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((val) => this.filterComposers(val));
  }

  ngOnInit(): void {}
  filterComposers(name: string) {
    this.composers = this.composerService.filterComposers(name);
  }
}
