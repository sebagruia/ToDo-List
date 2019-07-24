
//Global Variables
const inputNewListEntry = document.getElementById('input-new-line');
const insertButton = document.querySelector('#insertEntryButton');
const todoList = document.querySelector('.todo-list');
const listWraper = document.querySelector('.list-wraper');
const newList = document.querySelector('.newList');
const inputListTitle = document.querySelector('#input-List-title');


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
    editIcon.classList.add('far','fa-edit', 'text-info');
    editIcon.setAttribute('role', 'button');
    editIcon.setAttribute('data-toggle', 'modal');
    editIcon.setAttribute('data-target', '#Modal');

    const quantityButton = document.createElement('input');
    quantityButton.classList.add('quantity');
    quantityButton.setAttribute('type', 'number');
    quantityButton.setAttribute('name', 'quantity');
    quantityButton.setAttribute('min', '1');
    quantityButton.setAttribute('max', '20');
    quantityButton.setAttribute('placeholder', '1');

    divEditList.appendChild(deleteIcon);
    divEditList.appendChild(editIcon);
    divEditList.appendChild(quantityButton);

    

    divLi.appendChild(divCheckList);
    divLi.appendChild(divEditList);

    todoList.appendChild(li);

        // // The function measures the height of todo <ul> and adds 
        // overflow:scroll if a certain value is exceded
        measureToDoListHeight();

        // The function that creates the functionalitie of the check/uncheck boxes
    function checkOrUnchek() {
        unCheckedIcon.classList.toggle('hidden');
        checkedIcon.classList.toggle('hidden');
        if(!checkedIcon.classList.contains('hidden')){
            listText.setAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');

        }
        else{
            listText.removeAttribute('style', 'text-decoration:line-through', 'text-decoration-color:#2b3f5d');
        }
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
// End Of ----- createList() ------- 


// The function that adds the created <li> to the <ul>
function addListToUl() {
        if (inputNewListEntry.value.length > 0) {
        createList();
    }
}

function measureToDoListHeight(){
    const todolistHeight = todoList.scrollHeight;
    console.log(todolistHeight);
    if(todolistHeight>300){
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

function transitions(){
    const col1 = document.querySelector('.col1');
    col1.classList.toggle('transitionForCol1');

    const form = document.querySelector('.form');
    form.classList.toggle('formTransition');

    
    inputNewListEntry.classList.toggle('hidden');
    inputListTitle.classList.toggle('hidden');
    insertButton.classList.toggle('hidden'); 
    newList.classList.toggle('hidden');

    const formGroup2Flex = document.querySelector('.form-group2-flex');
    formGroup2Flex.classList.toggle('hidden');

    


}

newList.addEventListener('click', transitions);

