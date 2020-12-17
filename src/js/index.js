import "../scss/main.scss";
("use strict");
import { registerSW } from "./pwa.js";
registerSW();

function ShoppingList(shoppingList) {
  if (!shoppingList) {
    throw new Error("No shopping list found!");
  }
  const header = shoppingList.querySelector(".shopping-list__header");
  const editButton = shoppingList.querySelector(".shopping-list__buttonEdit");
  const form = shoppingList.querySelector(".shopping-list__form");
  const list = shoppingList.querySelector(".shopping-list__list");

  let listId = shoppingList.id;
  let items = [];

  function editHeader(e) {
    e.preventDefault();
    const newHeader = prompt();
    header.textContent = newHeader;
    localStorage.setItem(`header${listId}`, header.textContent);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    if (!name) return;
    const item = {
      name: name,
      id: Date.now(),
      complete: false,
    };
    items.push(item);
    e.target.reset();
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }

  function displayItems() {
    const html = items
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
    list.innerHTML = html;
  }

  function mirrorToLocalStorage() {
    localStorage.setItem(`items${listId}`, JSON.stringify(items));
  }

  function restoreFromLocalStorage() {
    const storageItems = JSON.parse(localStorage.getItem(`items${listId}`));
    if (storageItems) {
      (items = storageItems),
        list.dispatchEvent(new CustomEvent("itemsUpdated"));
    }

    const storageHeader = localStorage.getItem(`header${listId}`);
    if (storageHeader) {
      header.textContent = storageHeader;
    } else {
      localStorage.setItem(`header${listId}`, header.textContent);
    }
  }

  function deleteItems(id) {
    items = items.filter((item) => item.id !== id);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }

  function markAsComplete(id) {
    const itemRef = items.find((item) => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }

  editButton.addEventListener("click", editHeader);
  form.addEventListener("submit", handleSubmit); //enter, button i click
  list.addEventListener("itemsUpdated", displayItems);
  list.addEventListener("itemsUpdated", mirrorToLocalStorage);
  list.addEventListener("click", function (e) {
    const id = parseInt(e.target.value);
    if (e.target.matches("button")) {
      deleteItems(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
      markAsComplete(id);
    }
  });

  restoreFromLocalStorage();
}
const shoppingList1 = ShoppingList(document.querySelector(".shopping-list-1"));
const shoppingList2 = ShoppingList(document.querySelector(".shopping-list-2"));
const shoppingList3 = ShoppingList(document.querySelector(".shopping-list-3"));
