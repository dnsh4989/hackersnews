import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { Store } from '@ngrx/store';
import { loadArticles } from '../actions/article.actions';
import { changeStatus } from '../actions/loading.action';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PubnubService {
  private readonly pubnub: PubNubAngular;
  private channel = 'hacker-news';
  private key = 'sub-c-c00db4fc-a1e7-11e6-8bfd-0619f8945a4f';

  constructor(public store: Store) {
    this.pubnub = new PubNubAngular();
  }

  public start(): void {
    this.store.dispatch(
      changeStatus({
        isLoading: true,
      })
    );

    this.pubnub.init({
      subscribeKey: this.key,
    });

    this.pubnub.removeAllListeners();

    this.pubnub.addListener({
      message: (message: any) => {
        this.store.dispatch(loadArticles({ articles: message.message }));
        this.store.dispatch(
          changeStatus({
            isLoading: false,
          })
        );
      },
    });

    this.pubnub.subscribe({
      channels: [this.channel],
    });
  }

  listenPubnub() {
    this.start();
    timer(30000).subscribe((val) => {
      this.stop();
    });
  }

  public stop() {
    this.pubnub.removeAllListeners();
    this.pubnub.stop();
  }
}
