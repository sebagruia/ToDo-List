//Global Variables
const newList = document.querySelector('.newList');
const addToDoListButton = document.getElementById('buttonForAddingToDoList');
const addShoppingListButton = document.getElementById('buttonForAddingShoppingList');
const myListSummary = document.querySelector('.myListSummary');
const newListLi = document.querySelector('.newListLi')
// let count = 0;
let countButtons = 0;


const transitions = () => {
    const colFullwidth = document.querySelector('.col-full-width');
    colFullwidth.classList.toggle('transitionForColFullWidth');
    newList.classList.toggle('hidden');
}

newList.addEventListener('click', transitions);

const createFormforAddingListButtons = () => {
    const inputAddingButtonsHtml = `<form class="form-inline formWraper">
    <input type="text" id="inputNewListItem" class="form-control" placeholder="Name Your List"
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
    const inputNewListItem = document.getElementById('inputNewListItem');
    const myListSummaryWraper = document.querySelector('.myListSummary-wraper');

    const measureMyListSummaryHeight = () => {
        const myListSummaryHeight = myListSummary.scrollHeight;
        if (myListSummaryHeight > 200) {
            myListSummaryWraper.setAttribute('style', 'overflow-y:scroll');
        }
    }

    const pressPlusToDoListButton = () => {
        const windowWidth = window.innerWidth;
        if (inputNewListItem.value.length > 0) {
            const newLi = document.createElement('li');
            const buttonToHide = document.getElementById('dropdownMenuButton');
            newLi.classList.add('newListLi');

            if (windowWidth >= 992) {
                newLi.innerHTML = `<button type="button" class="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange ">${inputNewListItem.value}</button>`;
                if (buttonToHide.classList.contains('hidden')) {} else {
                    buttonToHide.classList.add('hidden');
                }

            } else {
                buttonToHide.classList.remove('hidden');
                newLi.innerHTML = `${inputNewListItem.value}`;
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

    const execute = () => {
        addListToUl(countButtons);
    }

    plusButton.addEventListener('click', () => {

        pressPlusToDoListButton();
        const newListLi = document.querySelectorAll('.newListLi');
        newListLi[countButtons].addEventListener('click', (event) => {
            console.log(`newListLi number ${countButtons}`);
            execute();
            const listWraper = document.querySelectorAll('.list-wraper');
            console.log(listWraper);
            for (let i = 0; i < listWraper.length; i++) {
                // if (!listWraper[i].classList.contains('not-visible')) {
                    listWraper[i].classList.add('not-visible')
                // }
            }

            let newIterator = countButtons-1
            listWraper[newIterator].classList.remove('not-visible');


        }, {
            once: true
        });


    });



    inputNewListItem.addEventListener('keypress', (event) => {
        if (inputNewListItem.value.length > 0 && event.key === "Enter") {
            pressPlusToDoListButton();
            const newListLi = document.querySelectorAll('.newListLi');
            console.log(`newListLi number ${countButtons}`);
            newListLi[countButtons].addEventListener('click', () => {
                execute();

            }, {
                once: true
            });

            
            inputNewListItem.value = '';
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
        const getFocus = ()=>{
            const myListSummary = document.querySelector('.myListSummary');
            if(myListSummary.childElementCount===0){} 
            else if(myListSummary.childElementCount>0){
                myListSummary.lastElementChild.focus();

            }  

            getFocus();
        
    }

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
    listWraper.classList.add('list-wraper', 'not-visible');

    const taskForm = document.createElement('form');
    taskForm.classList.add('taskForm');
    const taskFormHtml = `<div class="component1">
    <input type="text" class="form-control shadow input-new-line" placeholder="New item"
      aria-label="Insert text" aria-describedby="edit an existing entry field">
  </div>
  <div class="component2 insertEntryButton" role="button">
    <i class="far fa-plus-square"></i>
    <h5 class="addTask">Add new item</h5>
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
    newListLi.item(number).addEventListener('click', (event) => {
        console.log(`newListLi number at Second Hit ${countButtons}`);
        const listWraper = document.querySelectorAll('.list-wraper');
        for (let i = 0; i < listWraper.length; i++) {
                listWraper[i].classList.add('not-visible')
        }
        listWraper.item(number).classList.remove('not-visible');

    });

    const setUlListName = () => {
        const newLi = document.querySelectorAll('.newListLi');
        const todoName = document.querySelectorAll('.todo-name');
        const buttonOrange = document.querySelectorAll('.button-color-orange');
        if (windowWidth > 800) {
            todoName.item(number).innerHTML = buttonOrange.item(number).innerText;

        } else {
            todoName.item(number).innerHTML = newLi.item(number).innerText;
        }

    }
   
   
    const measureToDoListHeight = () => {
        const todolistHeight = todoList.item(number).scrollHeight;
        if (windowWidth > 992) {
            if (todolistHeight > 400) {
                listWraper.item(number).setAttribute('style', 'overflow-y:scroll');

            }

        } else {
            if (todolistHeight > 200) {
                listWraper.item(number).setAttribute('style', 'overflow-y:scroll');
            }


        }

    }


   

    const insertLineInUl = () => {

        const todoListHtml = createListForToDoUl();
        todoList.item(number).insertAdjacentHTML('afterbegin', todoListHtml);


        const li = document.querySelectorAll('.li-item');
        const checkedIcon = document.querySelectorAll('.fa-check-circle');
        const unCheckedIcon = document.querySelectorAll('.fa-circle');
        const listText = document.querySelectorAll('.p-text');
        listText.item(number).innerHTML = `${inputNewListEntry.item(number).value}`;
        const deleteIcon = document.querySelectorAll('.fa-times-circle');
        const editIcon = document.querySelectorAll('.fa-edit');

        setUlListName();

        // The function that creates the functionalitie of the check/uncheck boxes
        const checkOrUnchek = () => {
            unCheckedIcon.item(number).classList.toggle('hidden');
            checkedIcon.item(number).classList.toggle('hidden');
            if (!checkedIcon.item(number).classList.contains('hidden')) {
                listText.item(number).setAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');

            } else {
                listText.item(number).removeAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');
            }
        }

        const editText = () => {
            const modalInput = document.querySelector('.inputForModal');
            const markedList = document.querySelector('.marked');
            if (markedList === null) {} else {
                markedList.innerHTML = `${modalInput.value}`;
            }
        }
    
        

        // Events for check/uncheck boxes
        unCheckedIcon.item(number).addEventListener('click', checkOrUnchek);
        checkedIcon.item(number).addEventListener('click', checkOrUnchek);

        modalCancelButton.addEventListener('click', () => {
            listText.item(number).classList.remove('marked');
        });

        modalSaveButton.addEventListener('click', () => {
            editText();
            listText.item(number).classList.remove('marked');
        });

        measureToDoListHeight();
        // The function deletes the selected <li>
        const deleteList = () => {
            li.item(number).remove();
            if (todoList.item(number).childElementCount === 0) {
                listWraper.item(number).setAttribute('style', 'border-width:0px');
            }
        }
        // Event for delete icon
        deleteIcon.item(number).addEventListener('click', deleteList);

        editIcon.item(number).addEventListener('click', () => {
            if (listText.item(number).classList.contains('marked')) {} else {
                const modalInput = document.querySelector('.inputForModal');
                modalInput.value = listText.item(number).innerText;
                listText.item(number).classList.add('marked');
            }
        });


    }

    
    inputNewListEntry.item(number).addEventListener('keypress', (event) => {
        if (inputNewListEntry.item(number).value.length > 0 && event.key === "Enter") {
            insertLineInUl();
            inputNewListEntry.item(number).value = '';
        }
    });


    insertButton.item(number).addEventListener('click', (event) => {
        insertLineInUl();
        inputNewListEntry.item(number).value = '';
    });

    

    
    countButtons++;

}
// End Of ----- addListToUl() ------- 

