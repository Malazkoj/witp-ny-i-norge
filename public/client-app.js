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
            let openingHours= activitiesJson["0"].openingHours;
            let location= activitiesJson["0"].location;

            //1st Activity
            document.getElementById("imgActivity1").src = activitiesJson["0"].imgURL;
            document.getElementById("headingActivity1").innerHTML=activitiesJson["0"].activityTitle;
            document.getElementById("shortDescriptionActivity1").innerHTML=activitiesJson["0"].shortDescription;
            document.getElementById("externalLinkActivity1").href=activitiesJson["0"].link;
            document.getElementById("dateTimeActivity1").innerHTML=openingHours.dayOfWeek + ", " + openingHours.date + " - kl " + openingHours.clock;
            document.getElementById("locationActivity1").innerHTML=location.placeName + ", " + location.address + ", " + location.city;
            document.getElementById("locationActivity1").href=location.googleMapsUrl;

            //2nd Activity
            openingHours= activitiesJson["1"].openingHours;
            location= activitiesJson["1"].location;

            document.getElementById("imgActivity2").src = activitiesJson["1"].imgURL;
            document.getElementById("headingActivity2").innerHTML=activitiesJson["1"].activityTitle;
            document.getElementById("shortDescriptionActivity2").innerHTML=activitiesJson["1"].shortDescription;
            document.getElementById("externalLinkActivity2").href=activitiesJson["1"].link;
            document.getElementById("dateTimeActivity2").innerHTML=openingHours.dayOfWeek + ", " + openingHours.date + " - kl " + openingHours.clock;
            document.getElementById("locationActivity2").innerHTML=location.placeName + ", " + location.address + ", " + location.city;
            document.getElementById("locationActivity2").href=location.googleMapsUrl;

            //3rd Activity
            openingHours= activitiesJson["2"].openingHours;
            location= activitiesJson["2"].location;

            document.getElementById("imgActivity3").src = activitiesJson["2"].imgURL;
            document.getElementById("headingActivity3").innerHTML=activitiesJson["2"].activityTitle;
            document.getElementById("shortDescriptionActivity3").innerHTML=activitiesJson["2"].shortDescription;
            document.getElementById("externalLinkActivity3").href=activitiesJson["2"].link;
            document.getElementById("dateTimeActivity3").innerHTML=openingHours.dayOfWeek + ", " + openingHours.date + " - kl " + openingHours.clock;
            document.getElementById("locationActivity3").innerHTML=location.placeName + ", " + location.address + ", " + location.city;
            document.getElementById("locationActivity3").href=location.googleMapsUrl;
            //End of activities
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
