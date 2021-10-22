import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app-state';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReplaySubject, Subscription, timer } from 'rxjs';
import { PubnubService } from '../../services/pubnub.service';
import { takeUntil } from 'rxjs/operators';

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
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    public store: Store<AppState>,
    private pubnubService: PubnubService
  ) {}

  ngOnInit() {
    this.listenPubnub();
    this.loading$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => this.loadingHandler(res));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
    this.subscription = timer(30000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((val) => {
        this.pubnubService.stop();
      });
  }
}
