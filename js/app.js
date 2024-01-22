import { pageManagerApp, managerLocalStorage } from "./controllers/main.js";
import { sectionNotFound } from "./pages/not-found.js";

// function randomValues() {
//   anime({
//     targets: '.square, .circle, .triangle',
//     translateX: function() {
//       return anime.random(-500, 500);
//     },
// 		translateY: function() {
//       return anime.random(-300, 300);
//     },
// 		rotate: function() {
// 			return anime.random(0, 360);
// 		},
// 		scale: function() {
// 			return anime.random(.2, 2);
// 		},
//     duration: 10000,
// 		easing: 'easeInOutQuad',
//     complete: randomValues,
// 	});
// }

const divAlert = document.querySelector(".alert");
const btnMenu = document.getElementById("btn-show-menu");
const listMenu = document.querySelector('.navigation_list');

btnMenu.addEventListener("click",()=>{
  console.log("click");
  listMenu.classList.toggle('navigation_list--active')
})

const mainContainer = document.querySelector('.main_container')
const pageApplication = document.querySelector('.navigation_app')
  pageApplication.addEventListener('click', e =>{
    const isLiItem = e.target.tagName === 'LI' && e.target.classList.contains('dropdown_li')
    if(isLiItem){
      const dataset = e.target.dataset.page;
      const getPage = pageManagerApp(dataset)
      if(getPage === undefined){
        mainContainer.innerHTML = ''
        mainContainer.appendChild(sectionNotFound())
        return
      }
      mainContainer.innerHTML = ''
      mainContainer.appendChild(getPage.page())
    }
    const isListNav = e.target.tagName === 'LI' && e.target.classList.contains('navigation_li-app')
    if(isListNav){
      const dataset = e.target.dataset.page
      const getPage = pageManagerApp(dataset)
      if(getPage === undefined){
        mainContainer.innerHTML = ''
        mainContainer.appendChild(sectionNotFound())
        return
      }
      mainContainer.innerHTML = ''
      mainContainer.appendChild(getPage.page())
    }
  })



document.addEventListener('DOMContentLoaded', ()=>{
  // randomValues();
  // mainContainer.appendChild(sectionNotFound())
})



