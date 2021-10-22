import { createReducer, on } from '@ngrx/store';
import { Article } from '../models/article.model';
import { loadArticles, resetArticles } from '../actions/article.actions';
import { ArticleList } from '../models/article-list.model';

const initialArticles: Article[] | [] = [];

export const articlesReducer = createReducer<Article[]>(
  initialArticles,
  on(loadArticles, (state, action) => {
    return [...new ArticleList().deserialize(action.articles).list].concat(
      state
    );
  }),
  on(resetArticles, (state, action) => {
    if (action.reset) {
      return [];
    }
    return state;
  })
);
