import { Article } from './article.model';

export class ArticleList {
  list: Article[] = [];

  deserialize(articleList: Article[]) {
    if (articleList) {
      this.list = articleList.map((articleItem) => {
        return new Article(articleItem);
      });
    }
    return this;
  }
}
