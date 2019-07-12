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

    updateIdea() {

    }

   deleteFromStorage = (index) => {
        ideas.splice(index, 1)
        this.saveToStorage()
    }

    toggleFavoriteIcon = () => {
        this.isFavorited = !this.isFavorited;
    }
}