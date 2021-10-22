export class Article {
    rank: number = 0;
    title: string = "";
    link: string = "";
    comments: string = "";

    constructor(obj?: any) {
        if (obj) {
            this.rank = obj["rank"];
            this.title = obj["title"];
            this.link = obj["link"];
            this.comments = obj["comments"];
        }
    }
}