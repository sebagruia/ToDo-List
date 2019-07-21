
//Global Variables
const input = document.getElementById('input-new-line');
const insertButton = document.querySelector('.btn-light');
const todoList = document.querySelector('.todo-list');
const listWraper = document.querySelector('.list-wraper');

// The function that creates the <li> and its HTML content 
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

    const listText = document.createElement('p');
    listText.innerHTML = `${input.value}`;

    divCheckList.appendChild(unCheckedIcon);
    divCheckList.appendChild(checkedIcon);
    divCheckList.appendChild(listText);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-times-circle');
    deleteIcon.setAttribute('role', 'button');

    const editIcon = document.createElement('i');
    editIcon.classList.add('far','fa-edit','btn','btn-primary');
    editIcon.setAttribute('role', 'button');
    editIcon.setAttribute('data-toggle', 'modal');
    editIcon.setAttribute('data-target', '#Modal');

    divEditList.appendChild(deleteIcon);
    divEditList.appendChild(editIcon);

    divLi.appendChild(divCheckList);
    divLi.appendChild(divEditList);

    todoList.appendChild(li);

// The function that creates the functionalitie of the check/uncheck boxes
    function checkOrUnchek() {
        unCheckedIcon.classList.toggle('hidden');
        checkedIcon.classList.toggle('hidden');
    }
// Events for check/uncheck boxes
    unCheckedIcon.addEventListener('click', checkOrUnchek);
    checkedIcon.addEventListener('click', checkOrUnchek);

// The function deletes the selected <li>
    function deleteList() {
        li.remove();
        if(todoList.childElementCount===0){
            listWraper.setAttribute('style', 'border-width:0px');
        }
    }
// Event for delete icon
    deleteIcon.addEventListener('click', deleteList);
    
// Event for delete icon
    editIcon.addEventListener('click', ()=>{
        if(listText.classList.contains('marked')){}
        else{
            const modalInput = document.querySelector('.inputForModal');
            modalInput.value=listText.innerText;
            listText.classList.add('marked');
            

        }

    });

// Event for edit text box
    function editText () {
        const modalInput = document.querySelector('.inputForModal');
        const markedList = document.querySelector('.marked');
        if(markedList===null){}
        else{
            markedList.innerHTML = `${modalInput.value}`;
        }
            
    }

// Event for Cancel button
    const modalCancelButton = document.getElementById('modalCancelButton');
    modalCancelButton.addEventListener('click', ()=>{
        listText.classList.remove('marked');
    });

// Event for Save button
    const modalSaveButton = document.getElementById('modalSaveButton');
    modalSaveButton.addEventListener('click', ()=>{
        editText();
        listText.classList.remove('marked');
    });
   

}

// The function that adds the created <li> to the <ul>
function addListToUl() {
        if (input.value.length > 0) {
        createList();
        listWraper.setAttribute('style', 'border: 1px solid #cecece; border-radius:5px; ');
    }
}

// Event for Insert button
insertButton.addEventListener('click', () => {
    addListToUl();
    input.value = '';
});

// Event for <input> using the Enter Key
input.addEventListener('keypress', (event) => {
    if (input.value.length > 0 && event.keyCode === 13) {
        addListToUl();
        input.value = '';
    }
});