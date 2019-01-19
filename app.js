import express from 'express'
import {getResourceById} from './api/api-utils.js'

const app = express();

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
app.get('/api/path/to/a/unique/ressource/:id', function (req, res) {

    let id = req.params.id;
    console.log(`Received a GET request /api/path/to/a/unique/ressource for the following id: '${id}'`);
    let resource = getResourceById(parseInt(id));
    console.log(`Retreived the corresponding resource: '${resource.id}'`);

    res.send(`{"resource": { "id": "${resource.id}", "content": "${resource.content}"}}`);
});


// Let Heroku eventually decide which port the application should be listen
const port = process.env.PORT || 3000
// Starting the web server
app.listen(port, () => console.log('Starting web application on port 3000...'));

// Required by ESM (ES6)
export {}
// main(){
     const categoryArray =createCategoryTreeNO();
// }
// create the category tree in norwegian
function createCategoryTreeNO() {
    //categoryfather is 0 if it's a general/hoved category, or categoryFather is its category's father and it's a sub category
    //let category = {categoryID:0,categoryFatherID:"",categoryName:"",categoryDescription:"",categoryTitle:""};
    let category1= createCategory("1.0","0","Jobb","Lurer du på noe gelder jobb","");
    let category2= createCategory("2.0","0","Lover og regler","Lurer du på noe gelder Lover of regler","");
    let category3= createCategory("3.0","0","Aktiviteter","Lurer du p[ noe gelder jobb","");
    let category4= createCategory("4.0","0","NorskOpplæring og utdanning ","Lurer du p[ noe gelder opplæring","");
    let category5= createCategory("5.0","0","Viktige linker ","Lurer du p[ noe gelder jobb","");
const categoryArray=[category1,category2,category3,category4,category5];
return categoryArray;
    //const categoryArray=[
    //    category.categoryID=1.
    //]

}
function createCategory(categoryID,categoryFatherID,categoryName,categoryDescription,categoryTitle){
    let myCategory={};
    myCategory.categoryID=categoryID;
    myCategory.categoryName=categoryFatherID;
    myCategory.categoryName=categoryName;
    myCategory.categoryDescription=categoryDescription;
    myCategory.categoryTitle=categoryTitle;
    return myCategory;

}