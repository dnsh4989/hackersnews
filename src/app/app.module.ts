import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PubnubService } from './services/pubnub.service';
import { articlesReducer } from './store/reducers/article.reducer';
import { loadingReducer } from './store/reducers/loading.reducer';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    StoreModule.forRoot({
      articles: articlesReducer,
      loading: loadingReducer,
    }),
    BlockUIModule.forRoot(),
  ],
  providers: [PubNubAngular, PubnubService],
  bootstrap: [AppComponent],
})
export class AppModule {}
