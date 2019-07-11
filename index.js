let titleInput = document.querySelector('#title-input');
let bodyInput = document.querySelector('#body-input');
let titleDisplay = document.querySelector('.idea-title');
let bodyDisplay = document.querySelector('.idea-body');
let ideasDisplay = document.querySelector('.idea-container')
let ideaSubmitBtn = document.querySelector('.idea-form-submit-btn');
let placeholder = document.querySelector('.ideas-placeholder');
let ideas = JSON.parse(localStorage.getItem('ideas')) || [];


const postIdea = (e) => {
    e.preventDefault();
    saveIdea();
    const idea = ideas[ideas.length -1];
    createIdea(idea, e);
    clearInputs();
}

const createIdea = (idea) => {
    placeholder.classList.add('hidden');
    ideasDisplay.innerHTML = 
    `<article class='idea-card' data-id=${idea.id}>
        <div class='idea-header'>
            <img class='icon' id='delete-icon' src='images/delete.svg'/>
            <h2 class='idea-title'>${idea.title}</h2>
            <img class='icon' src=${'images/001-idea-1.svg'}>
        </div>
        <p class='idea-body'>${idea.body}</p>
    </article>` 
    + ideasDisplay.innerHTML
}

const saveIdea = () => {
    let newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
    ideas.push(newIdea)
    JSON.stringify(newIdea)
    newIdea.saveToStorage(ideas)
    console.log(ideas)
}

const clearInputs = () => {
    titleInput.value = '';
    bodyInput.value = '';
}

const onLoad = () => {
    const savedIdeas = JSON.parse(localStorage.getItem('ideas'))
    savedIdeas.map(idea => {
        idea = new Idea()
        return idea;
    })
}
const pageRefresh = () => {
    ideas.forEach(idea => {
        createIdea(idea)
    })
}

window.onload =(e) => {
    pageRefresh()
}
ideaSubmitBtn.addEventListener('click', postIdea)

