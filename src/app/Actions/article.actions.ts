import { createAction, props } from "@ngrx/store";
import { Article } from "../Models/article.model";

export const loadArticles = createAction(
    '[Article] Load Articles',
    props<{articles: Article[]}>()
);