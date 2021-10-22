import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app-state';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription, timer } from 'rxjs';
import { PubnubService } from '../../services/pubnub.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI | any;
  public articles$ = this.store.pipe(select((state) => state.articles));
  private loading$ = this.store.pipe(select((state) => state.loading));
  private isLoading = false;
  private subscription: Subscription | undefined;

  constructor(
    public store: Store<AppState>,
    private pubnubService: PubnubService
  ) {}

  ngOnInit() {
    this.listenPubnub();
    this.loading$.subscribe((res) => this.loadingHandler(res));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    if (
      !this.isLoading &&
      window.scrollY + window.innerHeight >=
        document.getElementsByTagName('body')[0].scrollHeight
    ) {
      this.subscription?.unsubscribe();
      this.pubnubService.stop();
      this.listenPubnub();
    }
  }

  loadingHandler(res: boolean) {
    if (res) {
      this.blockUI.start();
    } else {
      window.scrollTo({
        left: 0,
        top: window.scrollY - 50,
      });
      this.blockUI.stop();
    }
    this.isLoading = res;
  }

  listenPubnub() {
    this.pubnubService.start();
    timer(30000).subscribe((val) => {
      this.pubnubService.stop();
    });
  }
}
