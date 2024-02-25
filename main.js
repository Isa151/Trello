function openAside() {
    document.getElementById("myAside").style.width = "250px";
    document.getElementById("mainContent").style.width = "calc(100% - 250px)";
}

function closeAside() {
    document.getElementById("myAside").style.width = "0";
    document.getElementById("mainContent").style.width = "100%";
}

function openModal() {
    document.getElementById('myModal').style.display = 'block';
  }


  function closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }


  window.onclick = function(event) {
    let  modal = document.getElementById('myModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }





const tasks = document.querySelectorAll('.box');
const form = document.forms.add_task

let todos = []
let temp = []
let temp_id

form.onsubmit = (e) => {
    e.preventDefault()

    const fm = new FormData(e.target)

    const todo = { id: Math.random() }

    fm.forEach((val, key) => todo[key] = val)

    todos.push(todo)
    reload(todos, tasks)

    console.log(todo);
}

function reload(arr, places) {
    places.forEach(el => el.innerHTML = "")

    for (let todo of arr) {
        let div = document.createElement('div')
        let title_task = document.createElement('span')
        let description_task = document.createElement('p')

        div.setAttribute('id', todo.id)
        div.classList.add('task_box')
        div.setAttribute('draggable', true)

        title_task.classList.add('span')
        description_task.classList.add('p')

        title_task.innerHTML = todo.title
        description_task.innerHTML = todo.description

        div.append(title_task, description_task)
        switch (todo.status) {
            case "To do":
                places[0].append(div)
                break;
            case "In progress":
                places[1].append(div)
                break;
            case "Done":
                places[2].append(div)
                break;
        }

        div.addEventListener('dragstart', dragStart)
        div.addEventListener('dragend', dragEnd)

        temp.push(div)

    }
}

for (let task of tasks) {
    task.addEventListener('dragover', dragOver)
    task.addEventListener('dragenter', dragEnter)
    task.addEventListener('dragleave', dragLeave)
    task.addEventListener('drop', dragDrop)
}

function dragStart() {
    temp_id = this.id
    this.classList.add('hold')
    setTimeout(() => (this.className = 'invisible'), 0)
}

function dragEnd() {
    this.className = 'fill'
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    event.preventDefault()
    this.className += ' hovered'
}


function dragLeave() {
    this.className = 'box'
}

function dragDrop() {
    this.className = 'box'
    temp.forEach((item) => {
        if(item.id === temp_id) {
            this.append(item)
        }
    })
}