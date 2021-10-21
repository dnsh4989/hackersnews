import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/Models/article.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() article: Article = {
    rank: 0,
    title: "",
    link: "",
    comments: "",
  };

  constructor() {
    
  }

  ngOnInit() {
    
  }
}
