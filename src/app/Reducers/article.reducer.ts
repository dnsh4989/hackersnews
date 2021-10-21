import { createReducer, on } from "@ngrx/store";
import { Article } from "../Models/article.model";
import { loadArticles } from "../Actions/article.actions";
import { ArticleList } from "../Models/article-list.model";

const initialArticles: Article[] | [] = [];

export const articlesReducer = createReducer<Article[]>(
    initialArticles, 
    on(loadArticles, (state, action) => {
        return [...new ArticleList().deserialize(action.articles).list].concat(state);
    })
);