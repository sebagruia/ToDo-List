//Global Variables
const inputNewListEntry = document.getElementById('input-new-line');
const insertButton = document.querySelector('#insertEntryButton');
const todoList = document.querySelector('.todo-list');
const listWraper = document.querySelector('.list-wraper');
const newList = document.querySelector('.newList');
// const inputListTitle = document.querySelector('#input-List-title');
const addToDoListButton = document.getElementById('buttonForAddingToDoList');
const addShoppingListButton = document.getElementById('buttonForAddingShoppingList');


// The function that creates the <li> and its HTML content 
function createListAndFunctionalities() {

    const liHtml = `<li class="li-item"><div class="list-component text-secondary">
    <div class="check-list">
    <i class="far fa-circle" role="button" aria-hidden="true"></i>
    <i class="far fa-check-circle text-success hidden" role="button" aria-hidden="true"></i>
    <p class="p-text">asda</p>
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
    const editIcon = document.querySelector('.fa-edit');
    const listText = document.querySelector('.p-text');
    listText.innerHTML = `${inputNewListEntry.value}`;
   

    

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
        if (listText.classList.contains('marked')) {} 
        else {
            const modalInput = document.querySelector('.inputForModal');
            modalInput.value = listText.innerText;
            listText.classList.add('marked');
        }

    });

    // Event for edit text box
    function editText() {
        const modalInput = document.querySelector('.inputForModal');
        const markedList = document.querySelector('.marked');
        if (markedList === null) {} 
        else {
            markedList.innerHTML = `${modalInput.value}`;
        }

    }

    // Event for Modal Cancel button
    const modalCancelButton = document.getElementById('modalCancelButton');
    modalCancelButton.addEventListener('click', () => {
        listText.classList.remove('marked');
    });

    // Event for Modal Save button
    const modalSaveButton = document.getElementById('modalSaveButton');
    modalSaveButton.addEventListener('click', () => {
        editText();
        listText.classList.remove('marked');
    });




}
// End Of ----- createList() ------- 

// function createInputForNewLine() {
//     const taskFromHtml = `<div class="component1">
//     <input type="text" id="input-new-line" class="form-control shadow " placeholder="Your wish is my command"
//       aria-label="Insert text" aria-describedby="edit an existing entry field">
//   </div>
//   <div  id="insertEntryButton" class="component2" role="button">
//     <i class="far fa-plus-square"></i>
//     <h5 class="addTask">Add a task</h5>
//   </div>`;
//     const taskForm = document.querySelector('.taskForm');
//     taskForm.innerHTML = taskFromHtml;
// }



// The function that adds the created <li> to the <ul>
function addListToUl() {
    if (inputNewListEntry.value.length > 0) {
        createListAndFunctionalities();
    }
}

function measureToDoListHeight() {
    const todolistHeight = todoList.scrollHeight;
    if (todolistHeight > 400) {
        listWraper.setAttribute('style', 'overflow-y:scroll');
        todoList.setAttribute('style', 'border-bottom: 0.5px solid #d1ccc0;');

    }
}

// createInputForNewLine();



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
    const listWraper = document.querySelector('.list-wraper');
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


    function plusToDoList() {
        if (inputNewListName.value.length > 0) {
            const newLi = document.createElement('li');
            newLi.classList.add('newListLi');
            newLi.innerHTML = `<button type="button" class="btn btn-outline-warning btn-lg btn-block capitalize ">${inputNewListName.value}</button>`
            myListSummary.insertAdjacentElement('afterbegin', newLi);
            measureMyListSummaryHeight();

            setNameForToDoList();
            listWraper.classList.remove('not-visible');

            form.remove();

            // createInputForNewLine();

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



    function minusTodoOrShoppingList() {
        form.remove();
    }

    plusButton.addEventListener('click', plusToDoList);
    inputNewListName.addEventListener('keypress', (event)=>{
        if (inputNewListName.value.length > 0 && event.keyCode === 13) {
            plusToDoList();
            inputNewListName.value = '';
        }

    });

    minusButton.addEventListener('click', minusTodoOrShoppingList);



}


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
    const listWraper = document.querySelector('.list-wraper');
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
            listWraper.classList.remove('not-visible');

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

    function minusTodoOrShoppingList() {
        form.remove();
    }

    plusButton.addEventListener('click', plusShoppingList);
    inputNewListName.addEventListener('keypress', (event)=>{
        if (inputNewListName.value.length > 0 && event.keyCode === 13) {
            plusShoppingList();
            inputNewListName.value = '';
        }

    });
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