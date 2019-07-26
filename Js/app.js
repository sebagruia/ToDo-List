//Global Variables
const inputNewListEntry = document.getElementById('input-new-line');
const insertButton = document.querySelector('#insertEntryButton');
const todoList = document.querySelector('.todo-list');
const listWraper = document.querySelector('.list-wraper');
const newList = document.querySelector('.newList');
const inputListTitle = document.querySelector('#input-List-title');
const addToDoListButton = document.getElementById('addToDoList');
const addShoppingListButton = document.getElementById('addShoppingList');


// The function that creates the <li> and its HTML content 
function createList() {

    const li = document.createElement('li');

    const divLi = document.createElement('div');
    divLi.classList.add('list-content', 'text-secondary');

    li.appendChild(divLi);

    const divCheckList = document.createElement('div');
    divCheckList.classList.add('check-list');

    const divEditList = document.createElement('div');
    divEditList.classList.add('edit-list');

    const unCheckedIcon = document.createElement('i');
    unCheckedIcon.classList.add('far', 'fa-circle');
    unCheckedIcon.setAttribute('role', 'button');

    const checkedIcon = document.createElement('i');
    checkedIcon.classList.add('far', 'fa-check-circle', 'text-success', 'hidden');
    checkedIcon.setAttribute('role', 'button');

    const listText = document.createElement('p');
    listText.innerHTML = `${inputNewListEntry.value}`;

    divCheckList.appendChild(unCheckedIcon);
    divCheckList.appendChild(checkedIcon);
    divCheckList.appendChild(listText);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-times-circle', 'text-danger');
    deleteIcon.setAttribute('role', 'button');

    const editIcon = document.createElement('i');
    editIcon.classList.add('far', 'fa-edit', 'text-info');
    editIcon.setAttribute('role', 'button');
    editIcon.setAttribute('data-toggle', 'modal');
    editIcon.setAttribute('data-target', '#Modal');

    const quantityButtonHtml = `<input class="quantity" type="number" aria-label="Insert a number" name="quantity" min="1" max="20" value="1" aria-describedby="number of items of the same kind">`;

    divEditList.appendChild(deleteIcon);
    divEditList.appendChild(editIcon);
    divEditList.insertAdjacentHTML('beforeend', quantityButtonHtml);

    divLi.appendChild(divCheckList);
    divLi.appendChild(divEditList);

    todoList.appendChild(li);

    // // The function measures the height of todoList <ul> and adds 
    // overflow:scroll if a certain value is exceded
    measureToDoListHeight();

    // The function that creates the functionalitie of the check/uncheck boxes
    function checkOrUnchek() {
        unCheckedIcon.classList.toggle('hidden');
        checkedIcon.classList.toggle('hidden');
        if (!checkedIcon.classList.contains('hidden')) {
            listText.setAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');

        } else {
            listText.removeAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');
        }
    }


    // Events for check/uncheck boxes
    unCheckedIcon.addEventListener('click', checkOrUnchek);
    checkedIcon.addEventListener('click', checkOrUnchek);

    // The function deletes the selected <li>
    function deleteList() {
        li.remove();
        if (todoList.childElementCount === 0) {
            listWraper.setAttribute('style', 'border-width:0px');
        }
    }
    // Event for delete icon
    deleteIcon.addEventListener('click', deleteList);

    // Event for delete icon
    editIcon.addEventListener('click', () => {
        if (listText.classList.contains('marked')) {} else {
            const modalInput = document.querySelector('.inputForModal');
            modalInput.value = listText.innerText;
            listText.classList.add('marked');
        }

    });

    // Event for edit text box
    function editText() {
        const modalInput = document.querySelector('.inputForModal');
        const markedList = document.querySelector('.marked');
        if (markedList === null) {} else {
            markedList.innerHTML = `${modalInput.value}`;
        }

    }

    // Event for Cancel button
    const modalCancelButton = document.getElementById('modalCancelButton');
    modalCancelButton.addEventListener('click', () => {
        listText.classList.remove('marked');
    });

    // Event for Save button
    const modalSaveButton = document.getElementById('modalSaveButton');
    modalSaveButton.addEventListener('click', () => {
        editText();
        listText.classList.remove('marked');
    });


}
// End Of ----- createList() ------- 


// The function that adds the created <li> to the <ul>
function addListToUl() {
    if (inputNewListEntry.value.length > 0) {
        createList();
    }
}

function measureToDoListHeight() {
    const todolistHeight = todoList.scrollHeight;
    if (todolistHeight > 300) {
        listWraper.setAttribute('style', 'overflow:scroll');

    }
}

// Event for Insert button
insertButton.addEventListener('click', () => {
    addListToUl();
    inputNewListEntry.value = '';
});

// Event for <input> using the Enter Key
inputNewListEntry.addEventListener('keypress', (event) => {
    if (inputNewListEntry.value.length > 0 && event.keyCode === 13) {
        addListToUl();
        inputNewListEntry.value = '';
    }
});

function transitions() {
    const colFullwidth = document.querySelector('.col-full-width');
    colFullwidth.classList.toggle('transitionForColFullWidth');

    inputListTitle.classList.toggle('hidden');
    newList.classList.toggle('hidden');

}

function addToDoList() {
    const inputTemporaryHtml = `<form class="form-inline formWraper">
    <input type="text" id="inputNewListName" class="form-control shadow " placeholder="Name Your List"
      aria-label="Insert text" aria-describedby="edit an existing entry field">
    <button type="button" id="plusButton" class=" btn-warning ">+</button>
    <button type="button" id="minusButton" class=" btn-warning ">-</button>
  </form>`;
    const myListSummary = document.querySelector('.myListSummary');
    myListSummary.insertAdjacentHTML('beforebegin', inputTemporaryHtml);

    const form = document.querySelector('.formWraper');
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const inputNewListName = document.getElementById('inputNewListName');


    
    
    
        function plusToDoList() {
            if (inputNewListName.value.length > 0) {
                const newLi = document.createElement('li');
                newLi.classList.add('newListLi');
                newLi.innerHTML = `<i class="fas fa-list-ol"></i><p>${inputNewListName.value}</p>`
                myListSummary.insertAdjacentElement('beforeend', newLi);
                form.remove();
            }
        }

        // function plusShoppingList(){
        //     if (inputNewListName.value.length > 0) {
        //         const newLi = document.createElement('li');
        //         myListSummary.insertAdjacentElement('beforeend', newLi);
        //         form.remove();
        //     }

        // }

        function minusTodoOrShoppingList() {
            form.remove();
        }

        plusButton.addEventListener('click', plusToDoList);
        minusButton.addEventListener('click', minusTodoOrShoppingList);
    }




newList.addEventListener('click', transitions);


addToDoListButton.addEventListener('click', ()=>{
    let countForms = document.querySelectorAll('.formWraper')
    if(countForms.length===0){
        addToDoList();


    }
    
} );