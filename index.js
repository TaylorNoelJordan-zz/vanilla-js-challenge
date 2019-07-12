let titleInput = document.querySelector('#title-input');
let bodyInput = document.querySelector('#body-input');
let ideaForm = document.querySelector('.idea-form')
let titleDisplay = document.querySelector('.idea-title');
let bodyDisplay = document.querySelector('.idea-body');
let ideasDisplay = document.querySelector('.idea-container')
let ideaSubmitBtn = document.querySelector('.idea-form-submit-btn');
let placeholder = document.querySelector('.ideas-placeholder');
let favIcon = document.querySelector('#fav-icon');
let deleteIcon = document.querySelector('#delete-icon');
let ideas = JSON.parse(localStorage.getItem('ideas')) || [];

const selectIcon = (e) => {
    if(e.target.id === 'delete-icon') {
        targetRemoveIdea(e)
    }
    if(e.target.id === 'fav-icon') {
        toggleFavorite(e)
    }
}

const postIdea = (e) => {
    e.preventDefault();
    saveIdea();
    const idea = ideas[ideas.length -1];
    createIdea(idea);
    clearInputs();
    verifyInputs();
}

// const loadIdeas = () => {
//     const saved = ideas.map(idea => {
//         idea = new Idea(idea.title, idea.body, idea.id, idea.isFavorited)
//         return saved;
//     })
//     ideas = saved;
//     pageRefresh(saved);
// }

const createIdea = (idea) => {
    placeholder.classList.add('hidden');
    ideasDisplay.innerHTML = 
    `<article class='idea-card' data-id=${idea.id}>
        <div class='idea-header'>
            <img class='icon' id='delete-icon' src='images/delete.svg'/>
            <h2 class='idea-title' contenteditable=true >${idea.title}</h2>
            <img class='icon' id='fav-icon' src=${idea.isFavorited ? 'images/002-idea.svg' : 'images/001-idea-1.svg'}>
        </div>
        <p class='idea-body' contenteditable=true>${idea.body}</p>
    </article>` 
    + ideasDisplay.innerHTML
}

const verifyInputs = () => {
    if((titleInput.value === '' )&& (bodyInput.value === '')) {
        disableSubmitBtn()
    } else {
        enableSubmitBtn()
    }
}

const enableSubmitBtn = () => {
    ideaSubmitBtn.removeAttribute('disabled', 'disabled')
}

const disableSubmitBtn = () => {
    ideaSubmitBtn.setAttribute('disabled', 'disabled')
    ideaSubmitBtn.classList.add('disabled')
}

const saveIdea = () => {
    let newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
    ideas.push(newIdea)
    JSON.stringify(newIdea)
    newIdea.saveToStorage(ideas)
}

const clearInputs = () => {
    titleInput.value = '';
    bodyInput.value = '';
}

const loadIdeas = () => {
    const savedIdeas = JSON.parse(localStorage.getItem('ideas'))
    savedIdeas.map(idea => {
        idea = new Idea()
        return idea;
    })
    ideas = savedIdeas;
    pageRefresh(ideas)
}
const pageRefresh = () => {
    ideas.forEach(idea => {
        createIdea(idea)
    })
}

const toggleFavorite = (e) => {
    const targetId = parseInt(e.target.parentElement.parentElement.dataset.id)
    const targetIdea = ideas.filter(item => item.id === targetId)
    targetIdea.toggleFavorite()

}

const targetRemoveIdea = (e) => {
    const ideaToRemove = e.target.closest('.idea-card');
    console.log(ideaToRemove);
    const index = findIndex(ideaToRemove);
    removeIdea(index);
    loadIdeas();
}

const removeIdea = (index) => {
    ideas[index].deleteFromStorage(index)
    pageRefresh();
}

const findIndex = (idea) => {
    const ideaId = parseInt(idea.dataset.id)
    console.log('ideas', ideas)
   return ideas.findIndex(item => item.id == ideaId)
}

window.addEventListener('load', loadIdeas)
ideaSubmitBtn.addEventListener('click', postIdea)
ideasDisplay.addEventListener('click', selectIcon)
ideaForm.addEventListener('keyup', verifyInputs)


