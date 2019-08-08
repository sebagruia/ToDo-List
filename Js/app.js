//Global Variables
const newList = document.querySelector('.newList');
const addToDoListButton = document.getElementById('buttonForAddingToDoList');
const addShoppingListButton = document.getElementById('buttonForAddingShoppingList');
const myListSummary = document.querySelector('.myListSummary');
const newListLi = document.querySelector('.newListLi')
let count = 0;
let countButtons = 0;


const transitions = () =>{
    const colFullwidth = document.querySelector('.col-full-width');
    colFullwidth.classList.toggle('transitionForColFullWidth');
    newList.classList.toggle('hidden');
}

newList.addEventListener('click', transitions);

const createFormforAddingListButtons = () => {
    const inputAddingButtonsHtml = `<form class="form-inline formWraper">
    <input type="text" id="inputNewListName" class="form-control" placeholder="Name Your List"
      aria-label="Insert text" aria-describedby="edit an existing entry field">
    <button type="button" id="plusButton" class=" btn-warning ">+</button>
    <button type="button" id="minusButton" class=" btn-warning ">-</button>
  </form>`;
    const listSummarySection = document.querySelector('.listSummarySection');
    listSummarySection.insertAdjacentHTML('afterbegin', inputAddingButtonsHtml);

}

const addToDoButtonAndForm = () => {

    const myListSummary = document.querySelector('.myListSummary');
    const form = document.querySelector('.formWraper');
    const plusButton = document.getElementById('plusButton');
    const minusButton = document.getElementById('minusButton');
    const inputNewListName = document.getElementById('inputNewListName');
    const myListSummaryWraper = document.querySelector('.myListSummary-wraper');

    const measureMyListSummaryHeight = () => {
        const myListSummaryHeight = myListSummary.scrollHeight;
        if (myListSummaryHeight > 200) {
            myListSummaryWraper.setAttribute('style', 'overflow-y:scroll');
        }
    }

    const pressPlusToDoListButton = () => {
        const windowWidth = window.innerWidth;
        console.log(windowWidth);
        if (inputNewListName.value.length > 0) {
            const newLi = document.createElement('li');
            const buttonToHide = document.getElementById('dropdownMenuButton');
            newLi.classList.add('newListLi');
            if (windowWidth > 800) {
                newLi.innerHTML = `<button type="button" class="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange ">${inputNewListName.value}</button>`;
                if (buttonToHide.classList.contains('hidden')) {} else {
                    buttonToHide.classList.add('hidden');
                }

            } else {
                buttonToHide.classList.remove('hidden');
                newLi.innerHTML = `${inputNewListName.value}`;
                newLi.classList.add('dropdown-item');
                myListSummary.classList.add('dropdown-menu');
                myListSummary.setAttribute('aria-labelledby', 'dropdownMenuButton');
            }
            myListSummary.insertAdjacentElement('beforeend', newLi);
        }


        measureMyListSummaryHeight();
        form.remove();


    }




    const minusTodoOrShoppingList = () => {
        form.remove();
    }


    plusButton.addEventListener('click', () => {

        pressPlusToDoListButton();
        const newListLi = document.querySelectorAll('.newListLi');
        newListLi[countButtons].addEventListener('click', () => {
            execute();


        }, {
            once: true
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



const createListForToDoUl = () => {
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
    return liHtml;
}

const createDivListWraper = () => {
    const listContent = document.querySelector('.list-content');
    const listWraper = document.createElement('div');
    listWraper.classList.add('list-wraper');

    const taskForm = document.createElement('form');
    taskForm.classList.add('taskForm');
    const taskFormHtml = `<div class="component1">
    <input type="text" class="form-control shadow input-new-line" placeholder="New task"
      aria-label="Insert text" aria-describedby="edit an existing entry field">
  </div>
  <div class="component2 insertEntryButton" role="button">
    <i class="far fa-plus-square"></i>
    <h5 class="addTask">Add a task</h5>
  </div>`;
    taskForm.innerHTML = taskFormHtml;
    listWraper.insertAdjacentElement('afterbegin', taskForm);

    const todoName = document.createElement('h3');
    todoName.classList.add('todo-name');
    taskForm.insertAdjacentElement('afterend', todoName);

    const todoList = document.createElement('ul');
    todoList.classList.add('todo-list');
    listWraper.insertAdjacentElement('beforeend', todoList);
    listContent.appendChild(listWraper);

}


const addListToUl = (number) => {
    createDivListWraper();
    const windowWidth = window.innerWidth;
    const listWraper = document.querySelectorAll('.list-wraper');
    const modalCancelButton = document.getElementById('modalCancelButton');
    const modalSaveButton = document.getElementById('modalSaveButton');

    const insertButton = document.querySelectorAll('.insertEntryButton');
    const inputNewListEntry = document.querySelectorAll('.input-new-line');

    const todoList = document.querySelectorAll('.todo-list');


    const newListLi = document.querySelectorAll('.newListLi');
    newListLi[number].addEventListener('click', () => {
        console.log('Second Hit');
        const listWraper = document.querySelectorAll('.list-wraper');
        for (let i = 0; i < listWraper.length; i++) {
            if (!listWraper[i].classList.contains('not-visible')) {
                listWraper[i].classList.toggle('not-visible')
            }
        }
        listWraper[number].classList.toggle('not-visible');

    });

    const setUlListName = () => {
        const newLi = document.querySelectorAll('.newListLi');
        const todoName = document.querySelectorAll('.todo-name');
        const buttonOrange = document.querySelectorAll('.button-color-orange');
        if (windowWidth > 800) {
            todoName[number].innerHTML = buttonOrange[number].innerText;

        } else {
            todoName[number].innerHTML = newLi[number].innerText;
        }

    }

    const editText = () => {
        const modalInput = document.querySelector('.inputForModal');
        const markedList = document.querySelector('.marked');
        if (markedList === null) {} else {
            markedList.innerHTML = `${modalInput.value}`;
        }
    }

    const  measureToDoListHeight = () => {
        const todolistHeight = todoList[number].scrollHeight;
        if (windowWidth > 992) {
            if (todolistHeight > 400) {
                listWraper[number].setAttribute('style', 'overflow-y:scroll');
            
        }

    } else  {
        if(todolistHeight > 200){
            listWraper[number].setAttribute('style', 'overflow-y:scroll');
        }
        

    }

    }

    const insertLineInUl = () => {

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
        const checkOrUnchek = () => {
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
        const deleteList = () => {
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
// End Of ----- addListToUl() ------- 

const execute = () => {
    addListToUl(count);
    count++;
}