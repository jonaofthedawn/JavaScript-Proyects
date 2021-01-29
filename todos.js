/*

let input = prompt("What would you like to do?");
const todos =['Collect Chicken eggs', 'Clean litter box'];
while(input !== 'quit' && input !=='q'){ 
    
    if(input === 'list') {
        console.log('********************')
        for ( let i = 0; i < todos.length; i++){
            console.log(`${i}: ${todos[i]}`);
        } console.log('********************')

    } else if (input === 'new') {
        const newTodo = prompt('Ok What is the new todo?');
        todos.push(newTodo);
        console.log(`${newTodo} added to the list!`)

    } else if ( input === 'delete'){
        const index = parseInt (prompt('Ok, enter the index to delete:'));
       if (!Number.isNaN(index)){
        const deleted = todos.splice(index, 1);
        console.log(`Ok, deleted ${deleted[0]}`);
        
       } else{
           console.log('Unknown index');
       }
    }
    input = prompt("what would you like to do?")
}
console.log("OK YOU QUIT THE APP!")
*/
// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners 
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();
    //to Create a DIv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //to create an LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODOS TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
        // TO CREATE A CHECK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // to create a trash button.
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // to append to list
    todoList.appendChild(todoDiv);
    //clear todo input 
    todoInput.value = '';
}

function deleteCheck (e) {
    const item = e.target;
    // To Delete Items 
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    // To check items completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none'
                }
                break;
                case 'uncompleted':
                    if (!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none'
                    }
                    break;
        }
    })
}


function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
      todos = [];
  } else{
      todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
    todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //to create an LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
  
        // TO CREATE A CHECK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // to create a trash button.
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // to append to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));
}

