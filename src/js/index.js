import "../scss/main.scss";
("use strict");

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

const form1 = document.querySelector(".shopping-list__form1--js");
const list1 = document.querySelector(".shopping-list__list1--js");

//an array to hold the state of app
let items = [];

//submit handler - what happens when sb fullfill the form
function handleSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget);
  console.log(e.target);
  const name = e.currentTarget.item.value;
  //.item - bo currentTarget to form i musimy zejść do inputa, który ma określony atrybut name='item'
  if (!name) return; //empty enter won't add empty lines (or add attr    required in html to the input field)
  const item = {
    name: name,
    id: Date.now(),
    complete: false,
  };
  items.push(item); //push the item into state
  e.target.reset(); //e.currentTarget.item.value = ""; - clear the form
  //displayItems(); - instead of this, we fire off a custom event that will tell sb who cares that items have been updated
  list1.dispatchEvent(new CustomEvent("itemsUpdated"));
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
    ) //value id w buttnie i inpucie potrzebne do nasłuchiwania
    //${item.complete ? "checked" : ""} - aby ustawić w html czy checkbox jest zaznaczony czy nie, w obiekcie mamy info
    .join("");
  list1.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const storageItems = JSON.parse(localStorage.getItem("items"));
  if (storageItems) {
    items = storageItems; //items.push(...storageItems);
    list1.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function deleteItems(id) {
  items = items.filter((item) => item.id !== id);
  //filtrujemy tablicę i zostawiamy tylko te, które są inne
  list1.dispatchEvent(new CustomEvent("itemsUpdated"));
  //dzięki temu od razu poprawi listę i zapisze w local storage wow!
}

function markAsComplete(id) {
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete; //zamieni false na true i odwrotnie
  list1.dispatchEvent(new CustomEvent("itemsUpdated"));
}

form1.addEventListener("submit", handleSubmit); //enter, button i click
list1.addEventListener("itemsUpdated", displayItems);
list1.addEventListener("itemsUpdated", mirrorToLocalStorage);
//event delegation - listening on elements that we add dynamically
list1.addEventListener("click", function (e) {
  const id = parseInt(e.target.value); //potrzebna liczba, aby filter w deleteItems() działał poprawnie
  if (e.target.matches("button")) {
    //dotyczy selektora
    deleteItems(id);
  } //target - co faktycznie kliknięte
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage(); //odpalane na starcie
