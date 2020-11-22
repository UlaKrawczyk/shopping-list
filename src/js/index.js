import "../scss/main.scss";
("use strict");

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */
const forms = document.querySelectorAll(".shopping-list__form");
const list1 = document.querySelector(".shopping-list__list1--js");
const list2 = document.querySelector(".shopping-list__list2--js");
const list3 = document.querySelector(".shopping-list__list3--js");
const lists = document.querySelectorAll(".shopping-list__list");

let items1 = [];
let items2 = [];
let items3 = [];

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;

  const item = {
    name: name,
    id: Date.now(),
    complete: false,
  };

  const whichForm = e.target.classList.value;
  if (whichForm.includes("form1")) {
    items1.push(item);
  } else if (whichForm.includes("form2")) {
    items2.push(item);
  } else {
    items3.push(item);
  }
  e.target.reset();
  lists.forEach((list) => list.dispatchEvent(new CustomEvent("itemsUpdated")));
}

function displayItems(e) {
  const whichList = e.target.classList.value;

  if (whichList.includes("list1")) {
    const html = items1
      .map(
        (item) => `<li class="shopping-list__item">
      <input 
        type="checkbox" 
        id="check + ${item.id}"
        value="${item.id}"
        ${item.complete ? "checked" : ""}
      >
      <label 
        class="itemName"
        for="check + ${item.id}"
      >
      <span class="shopping-list__newCheckbox"></span>
      ${item.name}</label>
      <button 
        value="${item.id}" 
        aria-label="remove ${item.name}"
      >&times;</button>
      </li>`
      )
      .join("");
    list1.innerHTML = html;
  } else if (whichList.includes("list2")) {
    const html = items2
      .map(
        (item) => `<li class="shopping-list__item">
      <input 
        type="checkbox" 
        id="check + ${item.id}"
        value="${item.id}"
        ${item.complete ? "checked" : ""}
      >
      <label 
        class="itemName"
        for="check + ${item.id}"
      >
      <span class="shopping-list__newCheckbox"></span>
      ${item.name}</label>
      <button 
        value="${item.id}" 
        aria-label="remove ${item.name}"
      >&times;</button>
      </li>`
      )
      .join("");
    list2.innerHTML = html;
  } else {
    const html = items3
      .map(
        (item) => `<li class="shopping-list__item">
      <input 
        type="checkbox" 
        id="check + ${item.id}"
        value="${item.id}"
        ${item.complete ? "checked" : ""}
      >
      <label 
        class="itemName"
        for="check + ${item.id}"
      >
      <span class="shopping-list__newCheckbox"></span>
      ${item.name}</label>
      <button 
        value="${item.id}" 
        aria-label="remove ${item.name}"
      >&times;</button>
      </li>`
      )
      .join("");
    list3.innerHTML = html;
  }
}
function mirrorToLocalStorage(e) {
  const whichList = e.target.classList.value;

  if (whichList.includes("list1")) {
    localStorage.setItem("items1", JSON.stringify(items1));
  } else if (whichList.includes("list2")) {
    localStorage.setItem("items2", JSON.stringify(items2));
  } else {
    localStorage.setItem("items3", JSON.stringify(items3));
  }
}
function restoreFromLocalStorage() {
  const storageItems1 = JSON.parse(localStorage.getItem("items1"));
  if (storageItems1) {
    items1 = storageItems1; //items.push(...storageItems);
    list1.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
  const storageItems2 = JSON.parse(localStorage.getItem("items2"));
  if (storageItems2) {
    items2 = storageItems2; //items.push(...storageItems);
    list2.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
  const storageItems3 = JSON.parse(localStorage.getItem("items3"));
  if (storageItems3) {
    items3 = storageItems3; //items.push(...storageItems);
    list3.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function deleteItems(id) {
  items1 = items1.filter((item) => item.id !== id);
  items2 = items2.filter((item) => item.id !== id);
  items3 = items3.filter((item) => item.id !== id);
  lists.forEach((list) => list.dispatchEvent(new CustomEvent("itemsUpdated")));
}

function markAsComplete(id) {
  console.log(id);
  const itemRef1 = items1.find((item) => item.id === id);
  const itemRef2 = items2.find((item) => item.id === id);
  const itemRef3 = items3.find((item) => item.id === id);
  if (itemRef1) {
    itemRef1.complete = !itemRef1.complete;
  } else if (itemRef2) {
    itemRef2.complete = !itemRef2.complete;
  } else if (itemRef3) {
    itemRef3.complete = !itemRef3.complete;
  }
  lists.forEach((list) => list.dispatchEvent(new CustomEvent("itemsUpdated")));
}

forms.forEach((form) => form.addEventListener("submit", handleSubmit));
lists.forEach((list) => list.addEventListener("itemsUpdated", displayItems));
lists.forEach((list) =>
  list.addEventListener("itemsUpdated", mirrorToLocalStorage)
);

lists.forEach((list) =>
  list.addEventListener("click", function (e) {
    const id = parseInt(e.target.value);
    if (e.target.matches("button")) {
      deleteItems(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
      markAsComplete(id);
    }
  })
);

restoreFromLocalStorage();
