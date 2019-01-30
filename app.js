import express from 'express'
import {getResourceById} from './api/api-utils.js'

const app = express();
const categories = hardCodedCatogries();
/*
   Static resources: all the files under ./public will be returned from /
   -----------------
 */
app.use(express.static('public'));


/*
   API endpoints
   -------------
 */

/*
  Endpoint: Hent resource by Id
  Method: GET
  Path: /api/path/to/a/unique/ressource/:Id
  Request params: Id
  Response: a json resource like { resource: { id: "1", content: "resource1" } }
 */
app.get('/api/categories', function (req, res) {

    let id = req.params.id;
    console.log(`Received a GET request /api/path/to/a/unique/ressource for the following id: '${id}'`);
    let resource = getResourceById(parseInt(id));
    //console.log(`Retreived the corresponding resource: '${resource.id}'`);

    res.send(categories);
    //res.send(hardCodedCatogries());
});


// Let Heroku eventually decide which port the application should be listen
const port = process.env.PORT || 3000
// Starting the web server
app.listen(port, () => console.log('Starting web application on port 3000...'));

// Required by ESM (ES6)s
export {}
// main(){

// }
function hardCodedCatogries() {
    return {
        Shopping: {
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

    }
}

function hardCodeSpecialCatgory(categoryName){

}