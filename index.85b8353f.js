!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},,function(e,t,n){"use strict";n.r(t);n(0);function o(e){if(!e)throw new Error("No shopping list found!");var t=e.querySelector(".shopping-list__header"),n=e.querySelector(".shopping-list__buttonEdit"),o=e.querySelector(".shopping-list__form"),r=e.querySelector(".shopping-list__list"),i=e.id,c=[];n.addEventListener("click",(function(e){e.preventDefault();var n=prompt();t.textContent=n,localStorage.setItem("header".concat(i),t.textContent)})),o.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget.item.value;if(t){var n={name:t,id:Date.now(),complete:!1};c.push(n),e.target.reset(),r.dispatchEvent(new CustomEvent("itemsUpdated"))}})),r.addEventListener("itemsUpdated",(function(){var e=c.map((function(e){return'<li class="shopping-list__item">\n      <input \n        type="checkbox" \n        id="check + '.concat(e.id,'"\n        value="').concat(e.id,'"\n        ').concat(e.complete?"checked":"",'\n      >\n      <label \n        class="itemName"\n        for="check + ').concat(e.id,'"\n      >\n      <span class="shopping-list__newCheckbox"></span>\n      ').concat(e.name,'</label>\n      <button \n        value="').concat(e.id,'" \n        aria-label="remove ').concat(e.name,'"\n      >&times;</button>\n      </li>')})).join("");r.innerHTML=e})),r.addEventListener("itemsUpdated",(function(){localStorage.setItem("items".concat(i),JSON.stringify(c))})),r.addEventListener("click",(function(e){var t=parseInt(e.target.value);e.target.matches("button")&&function(e){c=c.filter((function(t){return t.id!==e})),r.dispatchEvent(new CustomEvent("itemsUpdated"))}(t),e.target.matches('input[type="checkbox"]')&&function(e){var t=c.find((function(t){return t.id===e}));t.complete=!t.complete,r.dispatchEvent(new CustomEvent("itemsUpdated"))}(t)})),function(){var e=JSON.parse(localStorage.getItem("items".concat(i)));e&&(c=e,r.dispatchEvent(new CustomEvent("itemsUpdated")));var n=localStorage.getItem("header".concat(i));n?t.textContent=n:localStorage.setItem("header".concat(i),t.textContent)}()}"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("service-worker.js").then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))}));o(document.querySelector(".shopping-list-1")),o(document.querySelector(".shopping-list-2")),o(document.querySelector(".shopping-list-3"))}]);