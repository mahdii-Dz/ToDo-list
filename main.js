let input = document.getElementById('input');
let btn = document.getElementById('btn');
let itemscontainer = document.querySelector('.items-container');

window.addEventListener('load', loadTodos);

function loadTodos() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('todo-')) {
            keys.push(key);
        }
    }

    // Sort keys based on the timestamp
    keys.sort((a, b) => {
        const timestampA = parseInt(a.split('-')[1]);
        const timestampB = parseInt(b.split('-')[1]);
        return timestampA - timestampB;
    });
    // Add sorted items to the DOM
    keys.forEach(key => {
        const todoText = localStorage.getItem(key);
        addtodotoDOM(todoText, key);
    });
    
}


function addtodotoDOM(todotext, key){
    const ToDoitemcontainer = document.createElement('div');

    const ToDoitem = document.createElement('h4');
    ToDoitem.textContent = todotext;

    const deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    
    ToDoitemcontainer.dataset.key = key;

    deletebtn.onclick = function () {
        itemscontainer.removeChild(ToDoitemcontainer);
        localStorage.removeItem(ToDoitemcontainer.dataset.key);
    };

    ToDoitemcontainer.appendChild(ToDoitem);
    ToDoitemcontainer.appendChild(deletebtn);
    function randombgcolor(){
        let randomcolor = Math.floor(Math.random()*16777215).toString(16);
        let color = '#' + randomcolor;
        color.padStart(6, '0');
        ToDoitemcontainer.style.backgroundColor = color;
    }
    randombgcolor();

    itemscontainer.appendChild(ToDoitemcontainer);

    
}
function newtodo(){
    if (input.value.trim() === '') {
        alert('Please enter a to-do item!');
        return;
    }
    
    let key = 'todo-' + Date.now()
    addtodotoDOM(input.value, key);
    localStorage.setItem(key, input.value);
    input.value = '';
};
btn.addEventListener('click', newtodo);

input.addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
        newtodo();
    }
})


