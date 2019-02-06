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

    const values = Object.values(categories);
    let titles = [];

    for (const value of values) {
        titles.push(value.titel)
    }
    return titles;
}

function getActivitiesForInterest(interestTitle){
    return categories[interestTitle];
}

function getHardCodedCategories() {
    return {
        aktiviteterForBarn:{
            titel:"Aktiviteter For Barn",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        },
        festivaler:{
            titel:"Festivaler",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["famile"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
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
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        },
        leksehjelp:{
            titel:"Leksehjelp",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
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
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
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
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        },
        restauranterOgCafeer:{
            titel:"Restauranter Og Cafeer",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        },
        kulturelleTilbud:{
            titel:"Kulturelle Tilbud",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
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
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        },
        religioseMoteplasser:{
            titel:"Religiøse Møteplasser",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        },
        frivilligArbeid:{
            titel:"Frivillig Arbeid",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        },
        shopping: {
            titel:"Shopping",
            0: {
                activityTitle:"Sub category 1",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                OpeningHours:
                    {
                        date: "28.02.2019",
                        clock: "10.00",
                    }
                ,
                Location: "Oslo",
                imgURL: "",
                ageGroup:["barn"]
            },
            1: {
                activityTitle:"Sub category 2",
                shortDescription:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.",
                link:
                    "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                openingHours:
                    {
                        date: "10.03.2019",
                        clock: "10.00",
                    }
                ,
                location: "Lillestrøm",
                imgURL: "",
                ageGroup:["barn"]
            }
        }
/*
        shopping: {
            parentName: "Shopping",
            LoppeMarked: {
                0: {
                    link:
                        "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                    OpeningHours:
                        {
                            date: "28.02.2019",
                            clock: "10.00",
                        }
                    ,
                    Location: "Oslo",
                    imgURL: "",
                },
                1: {
                    link:
                        "https://www.loppemarkeder.com/oslo-nordstrand-skole-4-og-5-mai-2019/",
                    OpeningHours:
                        {
                            date: "10.03.2019",
                            clock: "10.00",
                        }
                    ,
                    Location: "Lillestrøm",
                    imgURL: "",
                }
            },
        },
        Jobb: {
            parentName: "Jobb",
        },
        Lover_og_regler: {
            parentName: "Lover og regler",
        },
        Activities: {
            parentName: "Activities",
            indoors: {
                0: {
                    link: "liil nr 0",
                    shortDescriotion: "Iam short descriptsn for 0io",
                    imgURL: "img url 0",
                    ageGroup: ["barn", "ung", "eldre"],
                },
                1: {
                    link: "link nk 1",
                    shortDescriotion: "s rd  1",
                    imgURL: "img url 1",
                    ageGroup: ["barn", "ung", "eldre"],
                }
            },
            outdoors: {
                0: {
                    link: "link 0 ountdoors",
                    shortDescriotion: "s d 0  outdoors",
                    imgURL: "img url 0 outdoors",
                    ageGroup: ["barn", "ung", "eldre"],
                },
                1: {
                    link: "1 ou",
                    shortDescriotion: "1 s d ou",
                    imgURL: "imgurl1 1 ou",
                    ageGroup: ["barn", "ung", "eldre"],
                }
            }
        }
*/

    }
}

function hardCodeSpecialCatgory(categoryName){

}