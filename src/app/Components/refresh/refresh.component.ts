import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { PubnubService } from 'src/app/services/pubnub.service';
import { resetArticles } from 'src/app/store/actions/article.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent {
  constructor(private pubnubService: PubnubService, private store: Store) {}

  reload() {
    this.store.dispatch(resetArticles({ reset: true }));
    this.pubnubService.stop();
    this.listenPubnub();
  }

  listenPubnub() {
    this.pubnubService.start();
    timer(30000).subscribe((val) => {
      this.pubnubService.stop();
    });
  }
}
