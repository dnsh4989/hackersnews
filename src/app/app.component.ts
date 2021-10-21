import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { PubnubService } from './Services/pubnub.service';
import { Store, select } from '@ngrx/store';
import { AppState } from './app-state';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI | any;
  public articles$ = this.store.pipe(select(state => state.articles));
  private loading$ = this.store.pipe(select(state => state.loading));
  private isLoading = false;
  private subscription: Subscription | undefined;

  private channel = "hacker-news";
  private key = "sub-c-c00db4fc-a1e7-11e6-8bfd-0619f8945a4f";

  constructor(
    public pubnubService: PubnubService,
    public store: Store<AppState>
  ) {}

  ngOnInit() {
    this.listenPubnub();
    this.loading$.subscribe(res => this.loadingHandler(res));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:scroll', ['$event']) 
  scrollHandler() {
    if (!this.isLoading &&
        window.scrollY + window.innerHeight >=
        document.getElementsByTagName("body")[0].scrollHeight
    ) {
      this.subscription?.unsubscribe();
      this.pubnubService.stop();
      this.listenPubnub();
    }
  }

  listenPubnub() {
    this.pubnubService.start(this.channel, this.key);
    this.subscription = timer(30000).subscribe(val => {
      this.pubnubService.stop();
    });
  }

  loadingHandler(res: boolean) {
    if (res) {
      this.blockUI.start();
    } else {
      window.scrollTo({
        left: 0,
        top: window.scrollY - 50
      });
      this.blockUI.stop();
    }
    this.isLoading = res;
  }
}
