import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './Components/Card/card.component';
import { NavbarComponent } from './Components/Navbar/navbar.component';
import { PubnubService } from './Services/pubnub.service';
import { articlesReducer } from './Reducers/article.reducer';
import { loadingReducer } from './Reducers/loading.reducer';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      articles: articlesReducer,
      loading: loadingReducer
    }),
    BlockUIModule.forRoot()
  ],
  providers: [PubNubAngular, PubnubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
