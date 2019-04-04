import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FrontpageComponent} from './components/frontpage/frontpage.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatInputModule} from '@angular/material';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule,
  MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DawaService} from './shared/services/dawa.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [{path: '', component: FrontpageComponent}];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [DawaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
