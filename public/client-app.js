/*
  This file contains code running in the browser.
  The main function is called as the web page is loaded.
 */

function main() {
    let interestTitles = [];

    const response = fetch('/api/interest-titles')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            interestTitles = Object.values(myJson);
            populateInterestDropDownList(interestTitles);
        });


}

function getActivitiesForInterest() {
    let option = $('#inputGroupSelect02 option:selected');
    let value = option.value;

    const response = fetch('/api/activities-for-interest?interestTitle='+value)
        .then(function (respone) {
            return respone.json();

        })
        .then(function (activitiesJson) {
            console.log(activitiesJson);
        })
}
function populateInterestDropDownList(interestTitles){

    var dropdown = document.getElementById("inputGroupSelect02");

    // Loop through the array
    for (var i = 0; i < interestTitles.length; ++i) {
        // Append the element to the end of Array list
        dropdown[dropdown.length] = new Option(interestTitles[i], interestTitles[i]);
    }

}

// Calling main on load
window.onload = main;
