import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { CardComponent } from '../components/card/card.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RefreshComponent } from '../components/refresh/refresh.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CardComponent,
    RefreshComponent,
  ],
  imports: [CommonModule, BlockUIModule.forRoot()],
})
export class HomeModule {}
