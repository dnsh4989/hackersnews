import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { Store } from '@ngrx/store';
import { loadArticles } from '../Actions/article.actions';
import { changeStatus } from '../Actions/loading.action';

@Injectable({
  providedIn: 'root'
})

export class PubnubService {
  private readonly pubnub: PubNubAngular;

  constructor(
    public store: Store
  ) {
    this.pubnub = new PubNubAngular();
  }

  public start(
    channelName: string,
    subKey: string
  ): void {
    this.store.dispatch(changeStatus({
      isLoading: true
    }));

    this.pubnub.init({
      subscribeKey: subKey
    });

    this.pubnub.removeAllListeners();

    this.pubnub.addListener({
      message: (message: any) => {
        this.store.dispatch(loadArticles({articles: message.message}));
        this.store.dispatch(changeStatus({
          isLoading: false
        }));
      }
    });

    this.pubnub.subscribe({
      channels  : [channelName]
    });
  }

  public stop() {
    this.pubnub.removeAllListeners();
    this.pubnub.stop();
  }
}