//Global Variables
const inputNewListEntry = document.getElementById('input-new-line');
const insertButton = document.querySelector('#insertEntryButton');
const todoList = document.querySelector('.todo-list');
const listWraper = document.querySelector('.list-wraper');
const newList = document.querySelector('.newList');
const addToDoListButton = document.getElementById('buttonForAddingToDoList');
const addShoppingListButton = document.getElementById('buttonForAddingShoppingList');


// The function that creates the <li> and its HTML content 
function createListAndFunctionalities() {

    const liHtml = `<li class="li-item"><div class="list-component text-secondary">
    <div class="check-list">
    <i class="far fa-circle" role="button" aria-hidden="true"></i>
    <i class="far fa-check-circle text-success hidden" role="button" aria-hidden="true"></i>
    <p class="p-text"></p>
    </div>
    <div class="edit-list">
    <i class="far fa-times-circle text-danger" role="button" aria-hidden="true"></i>
    <i class="far fa-edit text-info" role="button" data-toggle="modal" data-target="#Modal" aria-hidden="true"></i>
    <input class="quantity" type="number" aria-label="Insert a number" name="quantity" min="1" max="20" value="1" aria-describedby="number of items of the same kind">
    </div>
    </div>
    </li>`;


    todoList.insertAdjacentHTML('afterbegin', liHtml);

    const li = document.querySelector('.li-item');
    const checkedIcon = document.querySelector('.fa-check-circle');
    const unCheckedIcon = document.querySelector('.fa-circle');
    const deleteIcon = document.querySelector('.fa-times-circle');
    const listText = document.querySelector('.p-text');


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

}
// End Of ----- createList() ------- 




function measureToDoListHeight() {
    const todolistHeight = todoList.scrollHeight;
    if (todolistHeight > 400) {
        listWraper.setAttribute('style', 'overflow-y:scroll');
        todoList.setAttribute('style', 'border-bottom: 0.5px solid #d1ccc0;');

    }
}


function transitions() {
    const colFullwidth = document.querySelector('.col-full-width');
    colFullwidth.classList.toggle('transitionForColFullWidth');

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
    const listSummarySection = document.querySelector('.listSummarySection');
    listSummarySection.insertAdjacentHTML('afterbegin', inputTemporaryHtml);

    const form = document.querySelector('.formWraper');
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const inputNewListName = document.getElementById('inputNewListName');
    const toDoListName = document.querySelector('.todo-name');
    // const listWraper = document.querySelector('.list-wraper');
    const myListSummaryWraper = document.querySelector('.myListSummary-wraper');

    function measureMyListSummaryHeight() {
        const myListSummaryHeight = myListSummary.scrollHeight;
        if (myListSummaryHeight > 200) {
            myListSummaryWraper.setAttribute('style', 'overflow-y:scroll');
        }
    }
    function setNameForToDoList() {
        toDoListName.innerHTML = `${inputNewListName.value}`;
    }
   

    function plusToDoList() {
        if (inputNewListName.value.length > 0) {
            const newLi = document.createElement('li');
            newLi.classList.add('newListLi');
            newLi.innerHTML = `<button type="button" class="btn btn-outline-warning btn-lg btn-block capitalize ">${inputNewListName.value}</button>`
            myListSummary.insertAdjacentElement('afterbegin', newLi);
            measureMyListSummaryHeight();
            setNameForToDoList();
            // listWraper.classList.remove('not-visible');
            form.remove();
        }
    }

    function minusTodoOrShoppingList() {
        form.remove();
    }

    plusButton.addEventListener('click', plusToDoList);
    inputNewListName.addEventListener('keypress', (event) => {
        if (inputNewListName.value.length > 0 && event.keyCode === 13) {
            plusToDoList();
            inputNewListName.value = '';
        }

    });

    minusButton.addEventListener('click', minusTodoOrShoppingList);

}
// End Of ----- addToDoList() ------- 


function createNewUlContent() {
    const component1 = document.querySelector('.component1');
    const component1Html = `<input type="text" id="input-new-line" class="form-control shadow " placeholder="New task"
   aria-label="Insert text" aria-describedby="edit an existing entry field">`;
    component1.innerHTML = component1Html;
    const inputNewListEntry = document.getElementById('input-new-line');
    const insertButton = document.querySelector('#insertEntryButton');
    const insertButtonHtml = `<i class="far fa-plus-square"></i>
   <h5 class="addTask">Add a task</h5>`;
    insertButton.innerHTML = insertButtonHtml;

 
    function addListToUl() {
        if (inputNewListEntry.value.length > 0) {
            createListAndFunctionalities();
            const listText = document.querySelector('.p-text');
            listText.innerHTML = `${inputNewListEntry.value}`;
            const editIcon = document.querySelector('.fa-edit');


            // Event for Modal Cancel button
            const modalCancelButton = document.getElementById('modalCancelButton');
            modalCancelButton.addEventListener('click', () => {
                listText.classList.remove('marked');
            });

            // Event for edit text box
            function editText() {
                const modalInput = document.querySelector('.inputForModal');
                const markedList = document.querySelector('.marked');
                if (markedList === null) {} else {
                    markedList.innerHTML = `${modalInput.value}`;
                }

            }

           

            // Event for delete icon
            editIcon.addEventListener('click', () => {
                if (listText.classList.contains('marked')) {} else {
                    const modalInput = document.querySelector('.inputForModal');
                    modalInput.value = listText.innerText;
                    listText.classList.add('marked');
                }

            });

            // Event for Modal Save button
            const modalSaveButton = document.getElementById('modalSaveButton');
            modalSaveButton.addEventListener('click', () => {
                editText();
                listText.classList.remove('marked');
            });

        }
    }


    insertButton.addEventListener('click', (event) => {
        addListToUl();
        inputNewListEntry.value = '';
    });

    inputNewListEntry.addEventListener('keypress', (event) => {
        if (inputNewListEntry.value.length > 0 && event.keyCode === 13) {
            addListToUl();
            inputNewListEntry.value = '';
        }
    });

}

// End Of ----- createNewUlContent () ------- 

const myListSummary = document.querySelector('.myListSummary');
myListSummary.addEventListener('click', ()=>{
        const listWraper = document.querySelector('.list-wraper');
        listWraper.classList.remove('not-visible');
        createNewUlContent();
    

});










function addShoppingList() {
    const inputTemporaryHtml = `<form class="form-inline formWraper">
    <input type="text" id="inputNewListName" class="form-control shadow " placeholder="Name Your List"
      aria-label="Insert text" aria-describedby="edit an existing entry field">
    <button type="button" id="plusButton" class=" btn-warning ">+</button>
    <button type="button" id="minusButton" class=" btn-warning ">-</button>
  </form>`;
    const myListSummary = document.querySelector('.myListSummary');
    const listSummarySection = document.querySelector('.listSummarySection');
    listSummarySection.insertAdjacentHTML('afterbegin', inputTemporaryHtml);

    const form = document.querySelector('.formWraper');
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const inputNewListName = document.getElementById('inputNewListName');
    const toDoListName = document.querySelector('.todo-name');
    const myListSummaryWraper = document.querySelector('.myListSummary-wraper');

    function setNameForToDoList() {
        toDoListName.innerHTML = `${inputNewListName.value}`;
    }


    function measureMyListSummaryHeight() {
        const myListSummaryHeight = myListSummary.scrollHeight;
        console.log(myListSummaryHeight);
        if (myListSummaryHeight > 200) {
            myListSummaryWraper.setAttribute('style', 'overflow-y:scroll');

        }
    }


    function plusShoppingList() {
        if (inputNewListName.value.length > 0) {
            const newLi = document.createElement('li');
            newLi.classList.add('newListLi');
            // newLi.innerHTML = `<i class="fas fa-cart-plus"></i><p>${inputNewListName.value}</p>`
            newLi.innerHTML = `<button type="button" class="btn btn-outline-success btn-lg btn-block capitalize ">${inputNewListName.value}</button>`
            myListSummary.insertAdjacentElement('afterbegin', newLi);
            measureMyListSummaryHeight();
            setNameForToDoList();
            form.remove();

            const inputNewListEntry = document.getElementById('input-new-line');
            const insertButton = document.querySelector('#insertEntryButton');

            insertButton.addEventListener('click', (event) => {
                addListToUl();
                inputNewListEntry.value = '';
            });

            inputNewListEntry.addEventListener('keypress', (event) => {
                if (inputNewListEntry.value.length > 0 && event.keyCode === 13) {
                    addListToUl();
                    inputNewListEntry.value = '';
                }
            });
        }
    }



    plusButton.addEventListener('click', plusShoppingList);
    inputNewListName.addEventListener('keypress', (event) => {
        if (inputNewListName.value.length > 0 && event.keyCode === 13) {
            plusShoppingList();
            inputNewListName.value = '';
        }

    });

    function minusTodoOrShoppingList() {
        form.remove();
    }

    minusButton.addEventListener('click', minusTodoOrShoppingList);
}



newList.addEventListener('click', transitions);


addToDoListButton.addEventListener('click', () => {
    let countForms = document.querySelectorAll('.formWraper')
    if (countForms.length === 0) {
        addToDoList();
    }

});

addShoppingListButton.addEventListener('click', () => {
    let countForms = document.querySelectorAll('.formWraper')
    if (countForms.length === 0) {
        addShoppingList();
    }

});