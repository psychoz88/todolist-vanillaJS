function onPageLoaded() {
  const ul = document.querySelector("ul.todos");
  const input = document.querySelector("input[type = 'text']");
  const pensil = document.querySelector("#pensil");
  const lists = document.querySelectorAll("li");
  const span = document.getElementsByTagName("span");
  const container = document.querySelector("div");
  const saveBtn = document.querySelector(".save");
  const clearBtn = document.querySelector(".clear");
  const tipsBtn = document.querySelector(".showTips");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.querySelector(".closeTips");

  function createTodo() {
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");
    const newTodo = input.value;
    textSpan.append(newTodo);

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("todo-trash");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt");
    deleteBtn.appendChild(icon);

    ul.appendChild(li).append(textSpan, deleteBtn);
    input.value = "";
    listenDeleteTodo(deleteBtn);
  } // createToDo

  function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
      element.parentElement.remove();
      event.stopPropagation();
    });
  } // listebDeleteTodo

  function loadTodo() {
    const data = localStorage.getItem("todos");
    if (data) {
      ul.innerHTML = data;
    }

    const deleteButtons = document.querySelectorAll("span.todo-trash");
    for (const button of deleteButtons) {
      listenDeleteTodo(button);
    }
  } // loadTodo

  input.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;
    if (keyPressed.which == keyEnter) {
      createTodo();
    }
  });

    function onClickTodo(event) {
        if (event.target.className === "todo-text") {
            event.target.classList.add("checked");
        } else if (event.target.className === "todo-text checked") {
            event.target.classList.remove("checked");
        }
      };

  ul.addEventListener("click", onClickTodo);

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("todos", ul.innerHTML);
  });

  clearBtn.addEventListener("click", () => {
    ul.innerHTML = "";
    localStorage.removeItem("todos", ul.innerHTML);
  });

  tipsBtn.addEventListener("click", () => {
    overlay.style.height = "100%";
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.height = 0;
  });

  loadTodo();
} // onPageLoaded

document.addEventListener("DOMContentLoaded", onPageLoaded);
