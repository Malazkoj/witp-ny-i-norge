import express from 'express'
import {getResourceById} from './api/api-utils.js'
import bodyParser from 'body-parser'


const app = express();
app.use(bodyParser.json());

/*
   Static resources: all the files under ./public will be returned from /
   -----------------
 */
app.use(express.static('public'));

const categories = getHardCodedCategories();


/*
   API endpoints
   -------------
 */
app.get('/api/place-names', function (req, res) {
    res.send(getPlaces());
});

app.get('/api/interest-titles', function (req, res) {
    res.send(getInterestTitles());
} );

app.get('/api/activities-for-interest', function (req, res) {
    let interestTitle = req.query.interestTitle;

    res.send(getActivitiesForInterest(interestTitle));
} );


app.get('/api/categories', function (req, res) {

    res.send(categories);
    //res.send(hardCodedCatogries());
});
app.get('/api/categories/:id', function (req, res) {
    let id = req.params.id;
    console.log('received Get Sopping');
    let resource = getResourceById(id);
    console.log(resource.toString());
    res.send(getSubCategoryById(id));
});

// Let Heroku eventually decide which port the application should be listen
const port = process.env.PORT || 3000;

// Serving static resources here (all the files under ./public)
app.use(express.static('public'));

// Starting the web server
app.listen(port, () => console.log('Starting web application on port 3000...'));


// Required by ESM (ES6)s
export {}

function getSubCategoryById(id){
    switch (id) {
        case 'shopping': return categories.Shopping;
    }
    return categories.id;
}


function getInterestTitles(){

    let titles = {};
    const keys = Object.keys(categories);

    for (const key of keys) {
        titles[key] = categories[key].titel;
    }
    return titles;
}

function getPlaces() {
    let places = [];
//TODO needs optimization
    const interestKeys = Object.keys(categories);
    for(const interestKey of interestKeys){
        let activityKeys = Object.keys(categories[interestKey]);
         for( const activityKey of activityKeys){
             if(!isNaN(Number(activityKey))){
                 let cityName = categories[interestKey][activityKey].location.city;
                 if(!places.includes(cityName)){
                     places.push(cityName);
                 }
             }
         }
    }
    return places;
}


/*

function getPlacesWithDistricts() {
    let placesArr = [];
    let placesWithDistricts = {};
    const interestKeys = Object.keys(categories);
    for(const interestKey of interestKeys){
        let activityKeys = Object.keys(categories[interestKey]);
        console.log("activityKeys", activityKeys);
         for( const activityKey of activityKeys){
             console.log(activityKey);
             if(!isNaN(Number(activityKey))){
                 console.log(activityKey);
                 let cityName = categories[interestKey][activityKey].location.city;
                 let districtName = categories[interestKey][activityKey].location.district;
                 console.log(cityName);
                 if(!placesArr.includes(cityName)){
                     placesArr.push(cityName);
                 }
                 if(placesWithDistricts[cityName] == null){
                     placesWithDistricts[cityName] = [districtName];
                 }else{
                     //if(!placesWithDistricts[cityName].includes(districtName)){
                     let a = [];
                        a = placesWithDistricts[cityName];
                        console.log(typeof a);
                        console.log(a.length);
                         //placesWithDistricts[cityName] = a.push(districtName);
                     //}
                 }
             }
         }
    }
    console.log(placesArr);
    console.log(placesWithDistricts);
    return placesArr;
    //return {"places":placesArr};
}
* */
function getActivitiesForInterest(interestTitle){
    return categories[interestTitle];
}

function getHardCodedCategories() {
    return {
        aktiviteterForBarn:{
            titel:"Aktiviteter For Barn",
            0: {
                activityTitle:"SIRKUS MIKKELIKSKI",
                shortDescription:"ÈGAL TEATER PRESENTERER DEN KLASISKE ALF PRØYSEN TEATER FORESTILLINGEN SIRKUS MIKKELIKSKI Bli kjent med de søte, underlige og gode dyrebarna fra Prøysens univers. Møt Bolla Pinnsvin, Helene Harefrøken, Nøtteliten, med sirkus sjarlatanene Ruski og Snuski, når Sirkus Mikkelikski inviterer til en forrykende festforestilling for hele familien.",
                link:
                    "https://www.detskjerioslo.no/hvaskjer/108883.html",
                openingHours:
                    {
                        dayOfWeek: "Lørdag",
                        date: "02.03.2019",
                        clockStart: "14.00",
                        clockFinish: "16.00"
                    }
                ,
                location: {
                    placeName: "Egal teater",
                    address:"Munkedamsveien 80a",
                    area:"Oslo",
                    city:"Oslo",
                    zipCode:"0270",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/Egal+Teater+AS/@59.9112968,10.7107724,16.63z/data=!4m5!3m4!1s0x46416e150cc6a5ff:0x3cca8cbcda9ad4f9!8m2!3d59.9116517!4d10.7144286",
                },
                imgURL: "http://www.lovethispic.com/uploaded_images/26332-Beautiful-Morning.jpg",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Alna",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Sub category 3",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://wallpapersmug.com/download/720x1280/fd510a/heaven-tunnel-cave-4k.jpg",
                ageGroup:["barn"]
            }
        },
        festivaler:{
            titel:"Festivaler",
            0: {
                activityTitle:"Øyafestivalen",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.visitoslo.com/Images/Bilder%20Oslo/Hva%20skjer/Oyafestivalen-14-konsert-Rival-Sons-foto-Erik-Moholdt-%C3%98ya.jpg?t=ScaleToFill%7C1450x720&ts=4UdVjKb%2FloVhq59WbtG3OBFI1Ew%3D&pr=2.625",
                ageGroup:["famile"]
            },
            1: {
                activityTitle:"Miniøya",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.visitoslo.com/Images/Bilder%20Oslo/Hva%20skjer/Mini%C3%B8ya.jpg?t=ScaleDownToFill%7c704x352&ts=3kUqZ3xSCHiWBC3rnFYwRsOHb44%3d",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Kirkemusikkfestival",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.visitoslo.com/Images/Bilder%20Oslo/Hva%20skjer/Kirkemusikkfestivalen_Aapning_Lars-Flydal.jpg?t=ScaleToFill%7c725x360&ts=R90iZYF1kF%2fZk1UVfMqkIYqlVlk%3d&pr=1",
                ageGroup:["voksne"]
            }
        },
        idrettstilbud:{
            titel:"Idrettstilbud",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://photos.smugmug.com/SHK/SHK-J04/2018-Furuset-Skedsmo-J04/i-M9tLBQX/0/c2667414/X3/BK180121-1731-X3.jpg",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.snow-forecast.com/resortphotos2/Holmenkollen.jpg",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Sub category 3",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://heidif21mk2.files.wordpress.com/2012/09/4-svc3b8mming.jpg",
                ageGroup:["barn"]
            }
        },
        leksehjelp:{
            titel:"Leksehjelp",
            0: {
                activityTitle:"Voksenopplæring leksehjelp",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.driva.no/_incoming/article12605305.ece/7o5pu3/ALTERNATES/w980-default/leksehjelp.jpg",
                ageGroup:["voksne"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.uio.no/om/samarbeid/samfunn-og-naringsliv/studentsamarbeid/vitenskapsbutikken/prosjekter/redd-barna/betydningen%20av%20leksehjelp/leksehjelp-foto-til-annonse.png",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Sub category 3",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.hammerfest.kommune.no/getfile.php/4246243.1646.kikwn777ipwllk/450x300/leksehjelp.jpg",
                ageGroup:["barn"]
            }
        },
        natur:{
            titel:"Natur",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "http://www.lovethispic.com/uploaded_images/26332-Beautiful-Morning.jpg",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Sub category 3",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://wallpapersmug.com/download/720x1280/fd510a/heaven-tunnel-cave-4k.jpg",
                ageGroup:["barn"]
            }
        },
        turmuligheter:{
            titel:"Turmuligheter",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "http://www.lovethispic.com/uploaded_images/26332-Beautiful-Morning.jpg",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Sub category 3",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://wallpapersmug.com/download/720x1280/fd510a/heaven-tunnel-cave-4k.jpg",
                ageGroup:["barn"]
            }
        },
        restauranterOgCafeer:{
            titel:"Restauranter Og Cafeer",
            0: {
                activityTitle:"Andershusa",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://andershusa.com/wp-content/uploads/2018/09/topphem-where-to-eat-in-oslo-norway-restaurants-bars-coffee-shops-wine-cocktails-food-foodie-eat-eating-fine-casual-dining-best-tips-recommendation-guide-travel-2018-59-500x334@2x.jpg",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://andershusa.com/wp-content/uploads/2018/09/gioia-is-where-to-eat-in-oslo-norway-restaurants-bars-coffee-shops-wine-cocktails-food-foodie-eat-eating-fine-casual-dining-best-tips-recommendation-guide-travel-2017-57.jpg",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Sub category 3",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://gapyearescape.com/wp-content/uploads/2018/06/Best-Breakfast-in-Oslo.jpg",
                ageGroup:["barn"]
            }
        },
        kulturelleTilbud:{
            titel:"Kulturelle Tilbud",
            0: {
                activityTitle:"Opera",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/OsloOpera_20080605-1.jpg/250px-OsloOpera_20080605-1.jpg",
                ageGroup:["barn", "voksne"]
            },
            1: {
                activityTitle:"Karl Johan",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    }
                ,
                location: {
                    placeName: "Måsan aktivitetssenter",
                    address:"Kjerulfsgate 38",
                    area:"Akershus",
                    city:"Lillestrøm",
                    zipCode:"2000",
                    district: "Måsan",
                    googleMapsUrl: "https://www.google.com/maps/place/Kjerulfs+gate+38,+2000+Lillestr%C3%B8m/@59.9596772,11.0570777,17z/data=!3m1!4b1!4m5!3m4!1s0x46417c991ccdcc2d:0xa0edaea2f9a8cd7b!8m2!3d59.9596772!4d11.0592664",
                },
                imgURL: "https://www.torggatablad.no/wp-content/uploads/2017/03/Karl-Johans-gate.jpg",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Musikk",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.visitoslo.com/Images/Bilder%20Oslo/Hva%20skjer/Kirkemusikkfestivalen_Aapning_Lars-Flydal.jpg?t=ScaleToFill%7c725x360&ts=R90iZYF1kF%2fZk1UVfMqkIYqlVlk%3d&pr=1",
                ageGroup:["barn"]
            }

        },
        sosialeMoteplasser:{
            titel:"Sosiale Møteplasser",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkGR-vojjQVQCFsb2f5bNWg85xij9uwNtjkWnZ3bTsixtrfBel",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "http://1.bp.blogspot.com/-TMSFvyEUZmw/VAOPM4CmGDI/AAAAAAAAABA/TyK7kuJ7Ac4/s1600/17.mai%2Bfeiring.jpg",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Aktivitet",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.godeidrettsanlegg.no/system/files/styles/field_slideshow_large/private/sites/default/files/Annleggstype/Naermiljo/Maasan_aktivitetspark/Maasan_aktivitetspark.png?itok=yi0W6ufw",
                ageGroup:["barn", "ungdomer"]
            }
        },
        religioseMoteplasser:{
            titel:"Religiøse Møteplasser",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://d3jf2jipiivcgq.cloudfront.net/18465396534ce91838ba29d8.07143232.jpg",
                ageGroup:["barn", "voksne", "familie"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "http://media3.origo.no/-/cache/image/1534108_hefb4ba7079918336ea8b_v1286641802_562x450.jpeg",
                ageGroup:["barn", "voksne", "familie"]
            },
            2: {
                activityTitle:"Sub category 3",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://c1.staticflickr.com/3/2826/33429199074_e8166f893d_b.jpg",
                ageGroup:["barn"]
            }
        },
        frivilligArbeid:{
            titel:"Frivillig Arbeid",
            0: {
                activityTitle:"Redd barna",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.oki.com/no/printing/images/save-the-children_tcm91-39944.png",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Rødekors",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://pbs.twimg.com/profile_images/1764199300/Oslo_sos_medier_400x400.png",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Blå kors",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG5REZmpkXCOdXqO4dMis9hhLAVOFeAvV-DqnWnDGIb3EBG4cM",
                ageGroup:["barn"]
            }

        },
        shopping: {
            titel:"Shopping",
            0: {
                activityTitle:"Storsenter",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "28.02.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "http://tekstilforum.no/sites/all/files/styles/fullwidth/public/Arkiv/tekstilforum/2012/strommen-storsenter-gang.jpg?itok=LST40IX0",
                ageGroup:["alle"]
            },
            1: {
                activityTitle:"Loppemarked",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://www.detskjerioslo.no/hvaskjer/bilder/normal/468_2018_08_29_210711.jpg",
                ageGroup:["barn"]
            },
            2: {
                activityTitle:"Frukt og grønt",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        dayOfWeek: "Mandag",
                        date: "10.03.2019",
                        clockStart: "10.00",
                        clockFinish: "11.00"
                    },
                location: {
                    placeName: "SoCentral",
                    address:"Øvre Slottsgate 3",
                    area:"Akershus",
                    city:"Oslo",
                    zipCode:"0157",
                    district: "Sentrum",
                    googleMapsUrl: "https://www.google.com/maps/place/SoCentral/@59.911117,10.7380262,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e87c47c7db5:0x3bd24f750232b68d!8m2!3d59.911117!4d10.7402149",
                },
                imgURL: "https://lh5.googleusercontent.com/p/AF1QipN2Fp89ymqArfZblzLIUnYAro8JSW4lwrr4yGCf=w240-h160-k-no",
                ageGroup:["barn"]
            }
        }
    }
}

function hardCodeSpecialCatgory(categoryName){

}