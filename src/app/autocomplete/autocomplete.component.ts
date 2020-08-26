import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  options: string[] = ['Angular', 'React', 'Vue'];
  objectOptions: any[] = [
    { name: 'Angular' },
    { name: 'Angular Material' },
    { name: 'React' },
    { name: 'Vue' },
  ];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      option => option.toLowerCase().includes(filterValue)
    );
  }

}
