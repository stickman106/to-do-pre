let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const taskTemplate = document.getElementById("to-do__item-template");

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks ? tasks : items;
}

function createItem(item) {
    const clone = taskTemplate.content
        .querySelector(".to-do__item")
        .cloneNode(true);

    const textElement = clone.querySelector(".to-do__item-text");
    textElement.textContent = item;

    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");

    deleteButton.addEventListener("click", () => {
        clone.remove();
        items = getTasksFromDOM();
        saveTasks(items);
    });

    const duplicateButton = clone.querySelector(
        ".to-do__item-button_type_duplicate"
    );

    duplicateButton.addEventListener("click", () => {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const items = getTasksFromDOM();
        saveTasks(items);
    });

    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    editButton.addEventListener("click", () => {
        textElement.setAttribute("contenteditable", true);
        textElement.focus();
    });

    textElement.addEventListener("blur", () => {
        textElement.setAttribute("contenteditable", false);
        const taskList = getTasksFromDOM();
        saveTasks(taskList);
    });

    return clone;
}

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = inputElement.value;
    if (taskText.trim() === "") return;
    const newTask = createItem(taskText);
    listElement.prepend(newTask);
    items = getTasksFromDOM();
    saveTasks(items);
    inputElement.value = "";
});

items = loadTasks();

items.forEach((task) => {
    const element = createItem(task);
    listElement.append(element);
});

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];

    itemsNamesElements.forEach((task) => tasks.push(task.textContent));

    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}