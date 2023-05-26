# Übung 7
 
 folder /routes in express root dir
 
 Ergebnis in index.js
 - Model wird modifiziert
 - View werden modifiziert
 weil
 - route spricht den Controller an (wähle View)
 - damit ist Controller-Logik in routing files abgebildet
 
 img s. iPhone

users.js
’’’’js

var express = require('express');
var router = expressRouter();

var userController = require('../controllers/userController');

/*Get users list*/
//localhost/users

router.route('/')
  .get(usersController.getUsers)
  .post(usersController.createUser);

//localhost/users/register
router.get('/register', function(req,res,next){
  res.render('formular', { title: 'Register' });
});

//localhost/users/neueperson
//save a new user object
router.route('/neueperson)
  .post(usersController.g);

router.get('/:id', userController.readUser);

module.exports = router;

’’’’

’’’’json

[
  {
    "id": 0,
    "name": "üü",
    "vorname": "",
    "mail": "",
    "password": "",
    "file": ""
  },
  {
    "id": 1,
    "name": "öö",
    "vorname": "",
    "mail": "",
    "password": "",
    "file": ""
  },

  {
    "id": 2,
    "name": "ähneln",
    "vorname": "",
    "mail": "",
    "password": "",
    "file": ""
  }

]

’’’’

usersController.js

’’’’js

…

const getUsers = (req,res) => {
  try {
    if(req.files){
      let file = req.files.file;
      file.mv('/public/uploads'+file.name);
      filename = '/uploads/'+file.name;
    } catch {
        
  }

  let user = {
    //create ids, with and without already existing ids
    id: users.length? users[users.length-1].id+1:0,
    //read values from the forms fields
    name: req.body.name,
    vorname: req.body.vorname,
    mail: req.body.mail,
    password: req.body.pwd,
    //file upload
    file: filename
  }
  users.push(user);
  let data = JSON.stringify(users,null,2);
  fs.writeFileSync('./models/users.json',data);

  console.log(user);
  res.render('formular', { title: 'Register'});
}

const createUser = (req,res) => {
  //
}

const readUser = (req,res) => {

  // get the id of all existing users
  let existingUsers = users.find(element => element.id == req.param.id);

  //send the JSON data of all existing users
 
  res.send(existingUsers);
}

const getNewestUser = (req,res) => {

  // get the id of all existing users
  let existingUsers = users.find(element => element.id == req.param.id);
  //send the JSON data of the LAST existing users
  res.send(existingUsers[existingUsers.length-1]);
}

module.exports = {
  getUsers,
  createUsers,
  readUser

’’’’


 
 ## Routes
 
 - Route bindet Controller ein und greift auf Controller-Functionen zu

# Übung 8 Model

folder /models in express root dir mit JS files
 
 ## Modell 
 
 - beinhaltet Daten
 - beinhaltet idR Logik
 
 - ist eine json Datei mit Daten (blog.json)
 - wird über routing weitergeleitet (s. Übung 7)
 
 # Übung 9 Controller
 
 folder /controllers in express root dir
 
 - Datei aus Ü8 in einen wiederrverwendbaren Controller überführen
 
 i.e. userController.js
 
 - inhalt der Route functions (aus user.js) in die functionen des controllers ausschneiden
 - function(req,res,...)mit aufruf der functions des controllers ersetzen
  - Parameter der Function werden automatisch mitgeschickt und müssen nicht deklariert werden
  - id: users.length? users[users.length-1].id+1 : 0
  if users.length != null, get the id of the last user and save it in id+1, else create an id 0
  - es muss nach ids gesucht werden, weil ansonsten alte id Einträge gelöscht werden
  - man miss nach einer bestimmten id gesucht werden können, um User auszuwählen
  - &rarr; Array-Filter-Methode anwenden: Array.prototype.find()
  
 
 
 
 ## Controller
 
 - liest Daten des Modells ein
 - enthält Rückgaben des Clients
 
 - Wiederverwendbarkeit der Steuerung für mehere Projekte
 - modifiziert das Model, kann dessen Logik enthalten
 - wählt den view aus
 
 - Rückgaben kann HTLM sein,
   - oder json, etc (s. )
   
  # Middleware (SU)
  
  - hängt sich zeischen den eigenen Code 
  - bereits fertige Softwarekomponenten
  - Aufgaben wie z.B. das Datum
  
  ## Morgan
  
  - Ausgabe in der Serverkonsole
  - i.e. app.use(logger('dev')) in app.js
    - muss oben deklariert sein, damit die Fehler der Routen und anderen Sachen alle geloggt werden muss
  - log Morgan code to file (s. Folie)
  
 # View (SU)
 
- HTML
- kann dynamisch sein in Express (EJS)
  - view engine EJS kann auch andere Formate wie PUG sein, Prof. mag PUG nicht
  
 ## EJS Baukastensystem
 
 - Elemente wie
   - Navigation
   - Footer 
- include statement in EJS: <%= ejsFile >
- *unsecure* include statement in EJS: <%- ejsFile >
 
- looping EJS elements: 
’’’’ejs
<ul>
  <li>
    <% array.forEach(element =>  { %>
      <li><%= element %></li>
    <% }); %>
</ul>

’’’’

-displaying elements conditionally

’’’’ejs
<% if (typeOf(test) != 'undefined') { %>
  <p><%= text %></p>
<% }); %>



’’’’
