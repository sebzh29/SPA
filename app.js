const express = require('express');
const app = express();
const bdd = require('./modele/controller.js');

app.use(express.urlencoded({ extended: true })) // recuperer le body format x-www-form (formulaire classique)
app.use(express.json()) // recuprer json

app.set('views', __dirname + '/mesvues');
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render('index2');  // index2 mesvues/index2.ejs sans variables
    // rendu complet de notre page principale avec menu
    // cette page possede des liens vers les routes (ex /articles) qui renvoi du json
})

app.get('/articles',function(req,res) {
    bdd.getArticles('article',function(datas){
            res.json(datas)
    })
})

app.get('/addarticle', function(req,res) {
    console.log(req.body);
    bdd.createarticle('article', req.body, function(){
        res.render('form')
    })
})


app.listen(8080, function() {
    console.log('le serveur fonctionne sur le port: 8080');
})
