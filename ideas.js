class Idea {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.isFavorited = false;

    }

    saveToStorage(ideas) {
        const stringifiedIdeas = JSON.stringify(ideas)
        localStorage.setItem('ideas', stringifiedIdeas)
    }
}