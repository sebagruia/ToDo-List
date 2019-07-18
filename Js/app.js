const input = document.getElementById('input-new-line');
const newListButton = document.querySelector('.btn-light');
const todoList = document.querySelector('.todo-list');
const listWraper = document.querySelector('.list-wraper');


function createList() {
    const li = document.createElement('li');

    const divLi = document.createElement('div');
    divLi.classList.add('list-content');
       
    li.appendChild(divLi);

    const divCheckList = document.createElement('div');
    divCheckList.classList.add('check-list');

    const divEditList = document.createElement('div');
    divEditList.classList.add('edit-list');

    const unCheckedIcon = document.createElement('i');
    unCheckedIcon.classList.add('far', 'fa-square');
    unCheckedIcon.setAttribute('role', 'button');

    const checkedIcon = document.createElement('i');
    checkedIcon.classList.add('far', 'fa-check-square', 'hidden');
    checkedIcon.setAttribute('role', 'button');

    divCheckList.appendChild(unCheckedIcon);
    divCheckList.appendChild(checkedIcon);
    divCheckList.appendChild(document.createTextNode(input.value));
    

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-times-circle');
    deleteIcon.setAttribute('role', 'button');

    const editIcon = document.createElement('i');
    editIcon.classList.add('far', 'fa-edit');
    editIcon.setAttribute('role', 'button');

    divEditList.appendChild(deleteIcon);
    divEditList.appendChild(editIcon);

    divLi.appendChild(divCheckList);
    divLi.appendChild(divEditList);

    

    todoList.appendChild(li);

    function checkOrUnchek() {
        unCheckedIcon.classList.toggle('hidden');
        checkedIcon.classList.toggle('hidden');
    }

    unCheckedIcon.addEventListener('click', checkOrUnchek);
    checkedIcon.addEventListener('click', checkOrUnchek);

    function deleteList() {
        li.remove();
        if(todoList.childElementCount===0){
            listWraper.setAttribute('style', 'border-width:0px');
        }
    }

    deleteIcon.addEventListener('click', deleteList);

    function editText (){
        divCheckList.textContent = prompt();
    }

    editIcon.addEventListener('click', editText);
}


function addListToUl() {
        if (input.value.length > 0) {
        createList();
        listWraper.setAttribute('style', 'border: 1px solid #cecece; border-radius:5px; ');
    }
}

newListButton.addEventListener('click', () => {
    addListToUl();
    input.value = '';
});


input.addEventListener('keypress', (event) => {
    if (input.value.length > 0 && event.keyCode === 13) {
        addListToUl();
        input.value = '';
    }
});