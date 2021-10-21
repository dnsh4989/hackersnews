import { Article } from "./Models/article.model";

export interface AppState {
    articles: Article[];
    loading: boolean;
}