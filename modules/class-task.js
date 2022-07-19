const toDoContainer = document.getElementById('to-do-list');

export default class {
  constructor(description, completed = false, index = 0) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  addTask(taskList) {
    taskList.push(this);
    this.index = taskList.length;
  }

  displayTask(taskList) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    toDoContainer.appendChild(taskItem);

    const taskCheck = document.createElement('input');
    taskCheck.type = 'checkbox';
    taskItem.appendChild(taskCheck);
    if (this.completed === true) {
      taskCheck.checked = true;
    }

    const taskDescription = document.createElement('input');
    taskDescription.setAttribute('type', 'text');
    taskDescription.setAttribute('value', this.description);
    taskDescription.classList.add('description');
    taskItem.appendChild(taskDescription);

    const taskMove = document.createElement('button');
    taskMove.classList.add('move-btn');
    taskMove.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    taskItem.appendChild(taskMove);

    const taskDelete = document.createElement('button');
    taskDelete.classList.add('delete-btn', 'hide');
    taskDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    taskItem.appendChild(taskDelete);

    const lineHr = document.createElement('hr');
    toDoContainer.appendChild(lineHr);

    taskCheck.addEventListener('change', () => {
      if (taskCheck.checked === true) {
        taskCheck.classList.add('checked');
        this.completed = true;
      } else {
        taskCheck.classList.remove('checked');
        this.completed = false;
      }

      taskList = JSON.parse(localStorage.getItem('taskList'));

      for (let i = 0; i < taskList.length; i += 1) {
        if (taskList[i].description === this.description) {
          taskList[i].completed = this.completed;
        }
      }

      localStorage.setItem('taskList', JSON.stringify(taskList));
    });

    taskDescription.addEventListener('click', () => {
      taskItem.classList.add('onfocus');
      taskDelete.classList.remove('hide');
      taskMove.classList.add('hide');
    });

    taskDescription.addEventListener('change', () => {
      taskList = JSON.parse(localStorage.getItem('taskList'));

      for (let i = 0; i < taskList.length; i += 1) {
        if (taskList[i].description === this.description) {
          taskList[i].description = taskDescription.value;
        }
      }

      localStorage.setItem('taskList', JSON.stringify(taskList));
    });

    document.body.addEventListener('click', () => {
      taskItem.classList.remove('onfocus');
      taskDelete.classList.add('hide');
      taskMove.classList.remove('hide');
    }, true);

    taskDelete.addEventListener('click', () => {
      let taskList = JSON.parse(localStorage.getItem('taskList'));
      taskList = taskList.filter((x) => (x.description !== this.description));
      for (let i = 0; i < taskList.length; i += 1) {
        taskList[i].index = i + 1;
      }
      taskItem.remove();
      lineHr.remove();

      localStorage.setItem('taskList', JSON.stringify(taskList));
    });
  }
}
