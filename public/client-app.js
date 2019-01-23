import {sayHello} from './utils/client-app-utils.js'

/*
  This file contains code running in the browser.
  The main function is called as the web page is loaded.
 */

function main() {
    console.log("[INFO] main() function in client application is starting!");
    sayHello("World");
console.log(document.getElementById("myCategoryTree").innerHTML);
document.getElementById("myCategoryTree").innerHTML="<li><span class=\"caret\">I am from client-app.js</span></li>\n" +
    "    <li><span class=\"caret\">I am from client-app.js</span></li>\n" +
    "    <li><span class=\"caret\">I am from client-app.js</span></li>";
addElement("myCategoryTree","li","liAddedJS","<span>I am from client-app.js added dynamic</span>");
    let category1= createCategory("1_0","myCategoryTree","Jobb","Lurer du på noe gelder jobb","");
    let category1_1= createCategory("1_1","1_0","Jobb søking lenker","Er du ute etter jobb? Disse lenkene vil være nyttige for deg!","");
    let category2= createCategory("2_0","myCategoryTree","Lover og regler","Lurer du på noe gelder Lover of regler","");
    let category3= createCategory("3_0","myCategoryTree","Aktiviteter","Lurer du p[ noe gelder jobb","");
    let category4= createCategory("4_0","myCategoryTree","NorskOpplæring og utdanning ","Lurer du p[ noe gelder opplæring","");
    let category5= createCategory("5_0","myCategoryTree","Viktige linker ","Lurer du p[ noe gelder jobb","");
    const categoryArray=[category1,category1_1,category2,category3,category4,category5];
for (let i=0;i<categoryArray.length;i++){
    addElement(categoryArray[i].categoryFatherID,"li",categoryArray[i].categoryID,categoryArray[i].categoryName);

}
}

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    let p = document.getElementById(parentId);
    let newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function createCategory(categoryID,categoryFatherID,categoryName,categoryDescription,categoryTitle){
    let myCategory={};
    myCategory.categoryID=categoryID;
    myCategory.categoryFatherID=categoryFatherID;
    myCategory.categoryName=categoryName;
    myCategory.categoryDescription=categoryDescription;
    myCategory.categoryTitle=categoryTitle;
    return myCategory;

}
// Calling main on load
window.onload = main;
