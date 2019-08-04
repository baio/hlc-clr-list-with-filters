import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PlanetsListComponent } from './planets-list.component';
import { AppComponent } from './app.component';
import { SWAPIService } from './swapi.service';
import { HttpClientModule } from '@angular/common/http';

import { ClrDatagridStateInterface } from '@clr/angular';
import {
    HlcClrListModule,
    HlcClrTableModule,
    HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
    HLC_CLR_TABLE_PAGINATOR_ITEMS,
    PaginatorItems,
    Table,
    TableDataProviderConfig
} from '@ng-holistic/clr-list';
import { HlcClrFormModule } from '@ng-holistic/clr-forms';
import { AppModels } from './app.models';

// CLARITY ICONS DEPENDENCY: THIS REQUIRED ONLY IN STACKBLITZ SEE #700
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';
//

const tableDataProviderConfig: TableDataProviderConfig = {
  // map component model to dto model for requests
  mapState(state: ClrDatagridStateInterface): AppModels.ListRequest {
    // conver filters from component model to app model
    const filters = state.filters.reduce(
      (acc, v) => ({ ...acc, [v.property]: v.value }),
      {}
    );
    const page = state.page && state.page.from / state.page.size + 1;
    return { page: page ? page : 1, filters };
  },
  // map dto response object to component model object
  mapResult(result: any): Table.Data.Result {
    const response = result as AppModels.ListResponse<any>;
    return {
      rows: response.items,
      paginator: {
        pageIndex: response.page,
        pageSize: 10,
        length: response.totalCount
      }
    };
  }
};

@NgModule({
  imports: [ BrowserModule, HttpClientModule, HlcClrListModule, HlcClrTableModule.forRoot(), HlcClrFormModule.forRoot() ],
  declarations: [ AppComponent, PlanetsListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
        SWAPIService,
        {
            provide: HLC_CLR_TABLE_DATA_PROVIDER_CONFIG,
            useValue: tableDataProviderConfig
        }
  ]
})
export class AppModule { }
