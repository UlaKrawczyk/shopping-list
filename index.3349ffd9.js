!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},,function(e,t,n){"use strict";n.r(t);n(0);"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("service-worker.js").then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))}));var i=document.querySelectorAll(".shopping-list__form"),r=document.querySelector(".shopping-list__list1--js"),o=document.querySelector(".shopping-list__list2--js"),c=document.querySelector(".shopping-list__list3--js"),a=document.querySelectorAll(".shopping-list__list"),s=document.querySelectorAll(".shopping-list__buttonEdit"),l=document.querySelectorAll(".shopping-list__header"),u=[],d=[],p=[],f=[];function m(e){e.preventDefault();var t=e.currentTarget.previousElementSibling,n=prompt();t.textContent=n,f[t.id]=n,localStorage.setItem("headers",JSON.stringify(f))}function v(e){e.preventDefault();var t=e.currentTarget.item.value;if(t){var n={name:t,id:Date.now(),complete:!1},i=e.target.classList.value;i.includes("form1")?u.push(n):i.includes("form2")?d.push(n):p.push(n),e.target.reset(),a.forEach((function(e){return e.dispatchEvent(new CustomEvent("itemsUpdated"))}))}}function h(e){var t=e.target.classList.value;if(t.includes("list1")){var n=u.map((function(e){return'<li class="shopping-list__item">\n      <input \n        type="checkbox" \n        id="check + '.concat(e.id,'"\n        value="').concat(e.id,'"\n        ').concat(e.complete?"checked":"",'\n      >\n      <label \n        class="itemName"\n        for="check + ').concat(e.id,'"\n      >\n      <span class="shopping-list__newCheckbox"></span>\n      ').concat(e.name,'</label>\n      <button \n        value="').concat(e.id,'" \n        aria-label="remove ').concat(e.name,'"\n      >&times;</button>\n      </li>')})).join("");r.innerHTML=n}else if(t.includes("list2")){var i=d.map((function(e){return'<li class="shopping-list__item">\n      <input \n        type="checkbox" \n        id="check + '.concat(e.id,'"\n        value="').concat(e.id,'"\n        ').concat(e.complete?"checked":"",'\n      >\n      <label \n        class="itemName"\n        for="check + ').concat(e.id,'"\n      >\n      <span class="shopping-list__newCheckbox"></span>\n      ').concat(e.name,'</label>\n      <button \n        value="').concat(e.id,'" \n        aria-label="remove ').concat(e.name,'"\n      >&times;</button>\n      </li>')})).join("");o.innerHTML=i}else{var a=p.map((function(e){return'<li class="shopping-list__item">\n      <input \n        type="checkbox" \n        id="check + '.concat(e.id,'"\n        value="').concat(e.id,'"\n        ').concat(e.complete?"checked":"",'\n      >\n      <label \n        class="itemName"\n        for="check + ').concat(e.id,'"\n      >\n      <span class="shopping-list__newCheckbox"></span>\n      ').concat(e.name,'</label>\n      <button \n        value="').concat(e.id,'" \n        aria-label="remove ').concat(e.name,'"\n      >&times;</button>\n      </li>')})).join("");c.innerHTML=a}}function g(e){var t=e.target.classList.value;t.includes("list1")?localStorage.setItem("items1",JSON.stringify(u)):t.includes("list2")?localStorage.setItem("items2",JSON.stringify(d)):localStorage.setItem("items3",JSON.stringify(p))}l.forEach((function(e){return f.push(e.innerText)})),s.forEach((function(e){return e.addEventListener("click",m)})),i.forEach((function(e){return e.addEventListener("submit",v)})),a.forEach((function(e){return e.addEventListener("itemsUpdated",h)})),a.forEach((function(e){return e.addEventListener("itemsUpdated",g)})),a.forEach((function(e){return e.addEventListener("click",(function(e){var t=parseInt(e.target.value);e.target.matches("button")&&function(e){u=u.filter((function(t){return t.id!==e})),d=d.filter((function(t){return t.id!==e})),p=p.filter((function(t){return t.id!==e})),a.forEach((function(e){return e.dispatchEvent(new CustomEvent("itemsUpdated"))}))}(t),e.target.matches('input[type="checkbox"]')&&function(e){console.log(e);var t=u.find((function(t){return t.id===e})),n=d.find((function(t){return t.id===e})),i=p.find((function(t){return t.id===e}));t?t.complete=!t.complete:n?n.complete=!n.complete:i&&(i.complete=!i.complete),a.forEach((function(e){return e.dispatchEvent(new CustomEvent("itemsUpdated"))}))}(t)}))})),function(){var e=JSON.parse(localStorage.getItem("items1"));e&&(u=e,r.dispatchEvent(new CustomEvent("itemsUpdated")));var t=JSON.parse(localStorage.getItem("items2"));t&&(d=t,o.dispatchEvent(new CustomEvent("itemsUpdated")));var n=JSON.parse(localStorage.getItem("items3"));n&&(p=n,c.dispatchEvent(new CustomEvent("itemsUpdated")));var i=JSON.parse(localStorage.getItem("headers"));if(i){f=i;for(var a=0;a<f.length;a++)l[a].textContent=f[a]}else localStorage.setItem("headers",JSON.stringify(f))}()}]);