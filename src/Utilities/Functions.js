function loadAllTodos() {
    fetch('/todos')
    .then(res => res.json())
    .then(todos => {
        const container = document.getElementById("todos");
        container.innerHTML = "";
        todos.forEach(todo => {
            const h5 = document.createElement('h5');
            h5.innerHTML = `<b>Task: </b><u>${todo.name}</u>  <b>Location:</b> <u>${todo.location}</u>  <b>Start Time: </b> <u>${todo.start_time}</u>  <b>End Time: </b> <u>${todo.end_time}</u>
            <button onclick="deleteTodo(event,'${todo._id}')" class="btn btn-danger ms-5">Done</button>
            <button onclick="loadTodo('${todo._id}')" class="btn btn-secondary mx-2">Edit</button>
            `
            container.appendChild(h5);
        });
    });
}

function loadTodo(id) {
    fetch(`/todo/${id}`)
    .then(res=>res.json())
    .then(data => {
        const update = document.getElementById('update');
        update.innerHTML = `
        <h3>Edit Todo</h3>
        <input type="text" value="${data.name}" id="name" class="form-control mb-3" placeholder="">
        <br>
        <input type="text" value="${data.location}" id="location" class="form-control mb-3" placeholder="">
        <br>
        <input type="text" value="${data.start_time}" id="start_time" class="form-control mb-3" placeholder="">
        <br>
        <input type="text" value="${data.end_time}" id="end_time" class="form-control mb-3" placeholder="">
        <br>
        <button onclick="updateTodo('${data._id}')" class="btn btn-primary">Update</button>
        `
    })

}

// function for updating data
function updateTodo(id) {
const name = document.getElementById('name').value;
const location = document.getElementById('location').value;
const start_time = document.getElementById('start_time').value;
const end_time = document.getElementById('end_time').value;
console.log(name, location, start_time, end_time);

const todo = {
    name,
    location,
    start_time,
    end_time
};

console.log(todo)

fetch(`/update/${id}`, {
method: 'PATCH',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(todo)
})
.then(res => res.json())
.then(result => {
if (result.success) {
    loadAllTodos();
    document.getElementById('update').innerHTML = '';
}
});
}



function deleteTodo(event, id) {
    fetch(`/delete/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            event.target.parentNode.style.display = 'none';
        } else {
            console.error("Delete failed:", res.message);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

window.deleteTodo = deleteTodo;
window.loadTodo = loadTodo;
window.updateTodo = updateTodo;

export {
    loadAllTodos
}
