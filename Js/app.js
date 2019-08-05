//Global Variables
const newList = document.querySelector('.newList');
const addToDoListButton = document.getElementById('buttonForAddingToDoList');
const addShoppingListButton = document.getElementById('buttonForAddingShoppingList');
const myListSummary = document.querySelector('.myListSummary');
const newListLi = document.querySelector('.newListLi')
let count = 0;
let countButtons = 0;


function transitions() {
    const colFullwidth = document.querySelector('.col-full-width');
    colFullwidth.classList.toggle('transitionForColFullWidth');
    newList.classList.toggle('hidden');
}

newList.addEventListener('click', transitions);

function createFormforAddingListButtons() {
    const inputAddingButtonsHtml = `<form class="form-inline formWraper">
    <input type="text" id="inputNewListName" class="form-control" placeholder="Name Your List"
      aria-label="Insert text" aria-describedby="edit an existing entry field">
    <button type="button" id="plusButton" class=" btn-warning ">+</button>
    <button type="button" id="minusButton" class=" btn-warning ">-</button>
  </form>`;
    const listSummarySection = document.querySelector('.listSummarySection');
    listSummarySection.insertAdjacentHTML('afterbegin', inputAddingButtonsHtml);

}

function addToDoButtonAndForm() {

    const myListSummary = document.querySelector('.myListSummary');
    const form = document.querySelector('.formWraper');
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const inputNewListName = document.getElementById('inputNewListName');
    const myListSummaryWraper = document.querySelector('.myListSummary-wraper');

    function measureMyListSummaryHeight() {
        const myListSummaryHeight = myListSummary.scrollHeight;
        if (myListSummaryHeight > 200) {
            myListSummaryWraper.setAttribute('style', 'overflow-y:scroll');
        }
    }

    function pressPlusToDoListButton() {
        if (inputNewListName.value.length > 0) {
            const newLi = document.createElement('li');
            newLi.classList.add('newListLi');
            newLi.innerHTML = `<button type="button" class="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange ">${inputNewListName.value}</button>`
            myListSummary.insertAdjacentElement('beforeend', newLi);
            measureMyListSummaryHeight();
            form.remove();
        }
    }

    function minusTodoOrShoppingList() {
        form.remove();
    }

   
    plusButton.addEventListener('click', ()=>{

        pressPlusToDoListButton();
        const newListLi = document.querySelectorAll('.newListLi');
        newListLi[countButtons].addEventListener('click', ()=>{
            console.log('First Hit');
            execute();
           

        }, {once:true});

        

       
            
            
            newListLi[countButtons].addEventListener('click', ()=>{
                const allListWraper = document.querySelectorAll('.list-wraper')
                console.log(allListWraper);
                console.log('Second Hit');
                 
              
                    for(let i=0; i<allListWraper.length; i++){
                        if(!allListWraper[i].classlist.contains('not-visible')){
                            allListWraper[i].classList.toggle('not-visible');
                        }
                       
                        
                    }
                  
                    allListWraper[countButtons].classList.toggle('not-visible');
              
                
               

            });

       
        countButtons++;

    });



    inputNewListName.addEventListener('keypress', (event) => {
        if (inputNewListName.value.length > 0 && event.keyCode === 13) {
            pressPlusToDoListButton();
            inputNewListName.value = '';
        }

    });

    minusButton.addEventListener('click', minusTodoOrShoppingList);

}
// End Of ----- addToDoButtonAndForm() ------- 


// Functionalities for the buttons in the Nav
addToDoListButton.addEventListener('click', () => {
    let countForms = document.querySelectorAll('.formWraper')
    if (countForms.length === 0) {
        createFormforAddingListButtons();
        addToDoButtonAndForm();
    }

});

addShoppingListButton.addEventListener('click', () => {
    let countForms = document.querySelectorAll('.formWraper')
    if (countForms.length === 0) {
        createFormforAddingListButtons();
    }

});






function createDivListWraperHtml() {
    const divListWraperHtml = ` <form class="taskForm">
    <div class="component1">
      <input type="text" class="form-control shadow input-new-line" placeholder="New task"
        aria-label="Insert text" aria-describedby="edit an existing entry field">
    </div>
    <div class="component2 insertEntryButton" role="button">
      <i class="far fa-plus-square"></i>
      <h5 class="addTask">Add a task</h5>
    </div>
  </form>
   <h3 class="todo-name"></h3>
  <ul class="todo-list">`;

    return divListWraperHtml;

}

function createListForToDoUl() {
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
                    </li>`;
    return liHtml;
}

function createDivListWraper() {
    const listContent = document.querySelector('.list-content');
    const listWraper = document.createElement('div');
    listWraper.classList.add('list-wraper');
    listWraper.innerHTML = createDivListWraperHtml();
    listContent.appendChild(listWraper);

}


function addListToUl(number) {

    createDivListWraper();
    const listWraper = document.querySelectorAll('.list-wraper');
    const modalCancelButton = document.getElementById('modalCancelButton');
    const modalSaveButton = document.getElementById('modalSaveButton');

    const insertButton = document.querySelectorAll('.insertEntryButton');
    const inputNewListEntry = document.querySelectorAll('.input-new-line');

    const todoList = document.querySelectorAll('.todo-list');

    function setUlListName() {
        const todoName = document.querySelectorAll('.todo-name');
        const buttonOrange = document.querySelectorAll('.button-color-orange');
        todoName[number].innerHTML = buttonOrange[number].innerText;
    }

    function editText() {
        const modalInput = document.querySelector('.inputForModal');
        const markedList = document.querySelector('.marked');
        if (markedList === null) {} else {
            markedList.innerHTML = `${modalInput.value}`;
        }
    }

    function measureToDoListHeight() {
        const todolistHeight = todoList[number].scrollHeight;
        if (todolistHeight > 400) {
            listWraper[number].setAttribute('style', 'overflow-y:scroll');
            todoList[number].setAttribute('style', 'border-bottom: 0.5px solid #d1ccc0;');
        }
    }

    function insertLineInUl() {

        if (inputNewListEntry[number].value.length > 0) {
            const todoListHtml = createListForToDoUl();
            todoList[number].insertAdjacentHTML('afterbegin', todoListHtml);


            const li = document.querySelectorAll('.li-item');
            const checkedIcon = document.querySelectorAll('.fa-check-circle');
            const unCheckedIcon = document.querySelectorAll('.fa-circle');
            const listText = document.querySelectorAll('.p-text');
            listText[number].innerHTML = `${inputNewListEntry[number].value}`;
            const deleteIcon = document.querySelectorAll('.fa-times-circle');
            const editIcon = document.querySelectorAll('.fa-edit');

            setUlListName();

            // The function that creates the functionalitie of the check/uncheck boxes
            function checkOrUnchek() {
                unCheckedIcon[number].classList.toggle('hidden');
                checkedIcon[number].classList.toggle('hidden');
                if (!checkedIcon[number].classList.contains('hidden')) {
                    listText[number].setAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');

                } else {
                    listText[number].removeAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');
                }
            }

            // Events for check/uncheck boxes
            unCheckedIcon[number].addEventListener('click', checkOrUnchek);
            checkedIcon[number].addEventListener('click', checkOrUnchek);

            modalCancelButton.addEventListener('click', () => {
                listText[number].classList.remove('marked');
            });

            modalSaveButton.addEventListener('click', () => {
                editText();
                listText[number].classList.remove('marked');
            });

            measureToDoListHeight();
            // The function deletes the selected <li>
            function deleteList() {
                li[number].remove();
                if (todoList[number].childElementCount === 0) {
                    listWraper[number].setAttribute('style', 'border-width:0px');
                }
            }
            // Event for delete icon
            deleteIcon[number].addEventListener('click', deleteList);

            editIcon[number].addEventListener('click', () => {
                if (listText[number].classList.contains('marked')) {} else {
                    const modalInput = document.querySelector('.inputForModal');
                    modalInput.value = listText[number].innerText;
                    listText[number].classList.add('marked');
                }
            });

        }

    }



    insertButton[number].addEventListener('click', (event) => {
        insertLineInUl();
        inputNewListEntry[number].value = '';
    });

    inputNewListEntry[number].addEventListener('keypress', (event) => {
        if (inputNewListEntry[number].value.length > 0 && event.keyCode === 13) {
            insertLineInUl();
            inputNewListEntry[number].value = '';
        }
    });

}
// End Of ----- createDivListWraper() ------- 

function execute (){
    addListToUl(count);
    count++;
}

    // newListLi.addEventListener('click', execute, {once:true});





// myListSummary.addEventListener('click', execute, {once:true});












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
        if (myListSummaryHeight > 200) {
            myListSummaryWraper.setAttribute('style', 'overflow-y:scroll');

        }
    }


    function plusShoppingList() {
        if (inputNewListName.value.length > 0) {
            const newLi = document.createElement('li');
            newLi.classList.add('newListLi');
            // newLi.innerHTML = `<i class="fas fa-cart-plus"></i><p>${inputNewListName.value}</p>`
            newLi.innerHTML = `<button type="button" class="btn btn-outline-success btn-lg btn-block capitalize  buton-color-green">${inputNewListName.value}</button>`
            myListSummary.insertAdjacentElement('afterbegin', newLi);
            measureMyListSummaryHeight();
            setNameForToDoList();
            form.remove();

            const inputNewListEntry = document.getElementById('input-new-line');
            const insertButton = document.querySelector('insertEntryButton');

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