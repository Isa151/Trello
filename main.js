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


  

  const tasks = document.querySelectorAll('.box');
  const form = document.forms.add_task;
  const temp = []; 
  
  form.onsubmit = (e) => {
      e.preventDefault();
  
      const fm = new FormData(e.target);
      const title = fm.get('title');
      const description = fm.get('description');
  
      if (!title.trim() || !description.trim()) {
          alert("Заполните все поля.");
          return;
      }
  
      fetch('http://localhost:9000/todos')
          .then(response => response.json())
          .then(todos => {
              if (todos.some(todo => todo.title === title && todo.description === description)) {
                  alert("Эта задача уже существует.");
                  return;
              }
  
              const todo = { status: tasks, title, description };
  
              return fetch('http://localhost:9000/todos', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(todo),
              });
          })
          .then(() => {
              reloadTasks(); 
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
  };
  
  function reloadTasks() {
      fetch('http://localhost:9000/todos')
          .then(response => response.json())
          .then(todos => {
              clearTasksContainer(); 
              reload(todos, tasks);
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
  }
  
  
  
  function reload(todos, tasks) {
      tasks.splice(0, taks.length); 
  
      for (let todo of todos) {
          let div = document.createElement('div');
          let title_task = document.createElement('span');
          let description_task = document.createElement('p');
  
          div.setAttribute('id', todo.id);
          div.classList.add('task_box');
          div.setAttribute('draggable', true);
  
          title_task.classList.add('span');
          description_task.classList.add('p');
  
          title_task.innerHTML = todo.title;
          description_task.innerHTML = todo.description;
  
          div.append(title_task, description_task);
  
          
          switch (todo.status) {
              case "To do":
                  tasks[0].append(div);
                  break;
              case "In progress":
                  tasks[1].append(div);
                  break;
              case "Done":
                  tasks[2].append(div);
                  break;
              default:
                  tasks[0].append(div); 
          }
  
          div.addEventListener('dragstart', dragStart);
          div.addEventListener('dragend', dragEnd);
  
          temp.push(div);
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

    




