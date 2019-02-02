/*
  This file contains code running in the browser.
  The main function is called as the web page is loaded.
 */

function main() {
    const userAction = async () => {
        const response = await fetch('http://localhost:3000/api/categories');
        const departure = await response.json(); //extract JSON from the http response
    }

}


// Calling main on load
window.onload = main;
