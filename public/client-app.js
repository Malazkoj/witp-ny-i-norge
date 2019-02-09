/*
  This file contains code running in the browser.
  The main function is called as the web page is loaded.
 */

function main() {

    fetch('/api/interest-titles')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            populateInterestDropDownList(myJson);
        });

    getActivitiesForInterestDefault();

}

document.addEventListener('DOMContentLoaded',  function() {
    document.querySelector('select[name="inputGroupSelect02"]').onchange=getActivitiesForInterest;}, false);

//    document.getElementById("fetch-schedule-button").addEventListener("click", function() { userAction()}, false);



function getActivitiesForInterest(event) {

    let val = event.target.value;
    let url = '/api/activities-for-interest?interestTitle='+val;
    fetchActivitiesByUrl(url);
}



function getActivitiesForInterestDefault() {

    let val = "turmuligheter";
    let url = '/api/activities-for-interest?interestTitle='+val;
    fetchActivitiesByUrl(url);

}

function fetchActivitiesByUrl(url) {
    fetch(url)
        .then(function (respone) {
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
            document.getElementById("dateTimeActivity1").innerHTML=openingHours.dayOfWeek + " " + openingHours.date + "  " + openingHours.clockStart + " - " + openingHours.clockFinish;
            document.getElementById("locationActivity1").innerHTML=location.placeName + ", " + location.address + ", " + location.city;
            document.getElementById("locationActivity1").href=location.googleMapsUrl;

            //2nd Activity
            openingHours= activitiesJson["1"].openingHours;
            location= activitiesJson["1"].location;

            document.getElementById("imgActivity2").src = activitiesJson["1"].imgURL;
            document.getElementById("headingActivity2").innerHTML=activitiesJson["1"].activityTitle;
            document.getElementById("shortDescriptionActivity2").innerHTML=activitiesJson["1"].shortDescription;
            document.getElementById("externalLinkActivity2").href=activitiesJson["1"].link;
            document.getElementById("dateTimeActivity2").innerHTML=openingHours.dayOfWeek + " " + openingHours.date + "  " + openingHours.clockStart + " - " + openingHours.clockFinish;
            document.getElementById("locationActivity2").innerHTML=location.placeName + ", " + location.address + ", " + location.city;
            document.getElementById("locationActivity2").href=location.googleMapsUrl;

            //3rd Activity
            openingHours= activitiesJson["2"].openingHours;
            location= activitiesJson["2"].location;

            document.getElementById("imgActivity3").src = activitiesJson["2"].imgURL;
            document.getElementById("headingActivity3").innerHTML=activitiesJson["2"].activityTitle;
            document.getElementById("shortDescriptionActivity3").innerHTML=activitiesJson["2"].shortDescription;
            document.getElementById("externalLinkActivity3").href=activitiesJson["2"].link;
            document.getElementById("dateTimeActivity3").innerHTML=openingHours.dayOfWeek + " " + openingHours.date + "  " + openingHours.clockStart + " - " + openingHours.clockFinish;
            document.getElementById("locationActivity3").innerHTML=location.placeName + ", " + location.address + ", " + location.city;
            document.getElementById("locationActivity3").href=location.googleMapsUrl;
            //End of activities
        });
}

function populateInterestDropDownList(interestTitles){

    var dropdown = document.getElementById("inputGroupSelect02");

    let keys = Object.keys(interestTitles);

    for (var i = 0; i < keys.length; ++i) {
        dropdown[dropdown.length] = new Option(interestTitles[keys[i]], keys[i]);
    }

}

// Calling main on load
window.onload = main;
