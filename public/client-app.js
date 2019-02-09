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
/*
            interestTitles = Object.values(myJson);
*/
            populateInterestDropDownList(myJson);
        });

}

document.addEventListener('DOMContentLoaded',  function() {
    document.querySelector('select[name="inputGroupSelect02"]').onchange=getActivitiesForInterest;}, false);

//    document.getElementById("fetch-schedule-button").addEventListener("click", function() { userAction()}, false);



function getActivitiesForInterest(event) {
    console.log("here");
    let val = event.target.value;

    console.log(val);
/*
    let option = $('#inputGroupSelect02 option:selected');
    console.log(option);
    let value = option.value;
*/

    let url = '/api/activities-for-interest?interestTitle='+val;
    console.log(url);
    const response = fetch(url)
        .then(function (respone) {
            console.log(respone);
            return respone.json();

        })
        .then(function (activitiesJson) {
            let activityTitle = activitiesJson["0"].activityTitle;
            document.getElementById("heading1").innerHTML=activityTitle;
            document.getElementById("heading1").innerHTML=activityTitle;
            document.getElementById("heading1").innerHTML=activityTitle;
            return activitiesJson;
        })
}
function populateInterestDropDownList(interestTitles){

    var dropdown = document.getElementById("inputGroupSelect02");
    console.log(interestTitles);

    let keys = Object.keys(interestTitles);

    // Loop through the array
    for (var i = 0; i < keys.length; ++i) {
        // Append the element to the end of Array list
        console.log(keys);
        dropdown[dropdown.length] = new Option(interestTitles[keys[i]], keys[i]);
        console.log(dropdown[dropdown.length]);
    }

}

// Calling main on load
window.onload = main;
