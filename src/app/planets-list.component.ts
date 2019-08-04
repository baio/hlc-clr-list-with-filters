import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table, TableDescription, List } from '@ng-holistic/clr-list';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SWAPIService } from './swapi.service';

// Provide table UI definition in js object
const definition: List.Definition = {
  cols: [
    {
      id: 'name',
      title: 'Name',
      sort: true
    },
    {
      id: 'population',
      title: 'Population',
      sort: false
    }
  ],
  filters: [
    {
      id: 'name',
      kind: 'TextField',
      label: 'Name'
    },
    {
      // This is for demo, swai has not such a filter
      id: "Size",
      label: "Planet size",
      kind: "SelectField",
      props: {
        items: [
          { key: "small", label: "Small" },
          { key: "medium", label: "Medium" },
          { key: "big", label: "Big" }
        ]
      }
    }
  ]
};

@Component({
  selector: 'my-planets-list',
  template: '<hlc-clr-list [definition]="definition" [dataProvider]="dataProvider"></hlc-clr-list>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsListComponent {
  readonly definition = definition;
  readonly dataProvider: Table.Data.DataProvider;

  constructor(swapi: SWAPIService) {
    this.dataProvider = {
      load(state: any) {
        return swapi.planets(state).pipe(
          catchError(err => {
            return throwError('SWAPI return error');
          })
        );
      }
    };
  }
}
