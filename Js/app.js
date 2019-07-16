const input = document.getElementById('input-new-line');
const newLineButton = document.querySelector('.btn-light');
const todoInput = document.querySelector('.todo-input');
const listWraper = document.querySelector('.list-wraper');
const todoList = document.querySelector('.todo-list');

function addListToUl(){
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" value="Text"> ${input.value}`;
    listWraper.setAttribute('style', 'border: 1px solid #cecece; border-radius:5px; ');
    todoList.insertAdjacentElement('beforeend', li);
}

  


newLineButton.addEventListener('click', ()=>{
    if(input.value.length>0){
        addListToUl();
        console.log(input.value);
        input.value = '';

    }

});

newLineButton.addEventListener('keypress', (event)=>{
    if(input.value.length>0 && event.keyCode === 13){
        console.log(event.keyCode);
        addListToUl();
        console.log(input.value);
        input.value = '';

    }

});
