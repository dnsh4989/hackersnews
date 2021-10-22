import { createAction, props } from '@ngrx/store';
import { Article } from '../models/article.model';

export const loadArticles = createAction(
  '[Article] Load Articles',
  props<{ articles: Article[] }>()
);
