import { Article } from "./article.model";

export class ArticleList {
    list: Article[] = [];
    
    deserialize(list: Article[]) {
        if (list) {
            list.map((item) => {
                this.list.push(new Article(item));
            });
        }
        return this;
    }
}