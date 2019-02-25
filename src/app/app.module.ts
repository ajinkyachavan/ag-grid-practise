import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgGridModule } from "ag-grid-angular";
import { AppRoutingModule } from './app-routing.module';
import { PopupButtonRendererComponent } from './popup-button-renderer/popup-button-renderer.component';
import { CustomPopupComponent } from './custom-popup/custom-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PopupButtonRendererComponent,
    CustomPopupComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents(
      [PopupButtonRendererComponent, CustomPopupComponent]
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
