import { Article } from './models/article.model';

export interface AppState {
  articles: Article[];
  loading: boolean;
}
