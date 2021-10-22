import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { CardComponent } from '../components/Card/card.component';
import { NavbarComponent } from '../components/Navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, CardComponent],
  imports: [CommonModule, BlockUIModule.forRoot()],
})
export class HomeModule {}
