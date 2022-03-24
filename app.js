
const express = require('express');
const bodyParser = require('body-parser')
const app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


require('dotenv').config()

const port = process.env.PORT || 3000;

//conexion a base de datos
const mongoose = require('mongoose');


const uri= `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@realmcluster.cwwq3.mongodb.net/${process.env.BASE}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('base de datos conectada'))
.catch(e => console.log(e))
 

//motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname +  '/views');




app.use(express.static(__dirname + "/public"))

app.use('/', require('./router/rutaweb'));
app.use('/mascotas', require('./router/mascotas'));


app.use('/', (req, res, next) =>{
    res.status(404).render("404",{
        titulo: "404",
        descripcion: "Titulo del sitio Web"
    })
})





app.listen(port, () =>{
    console.log('servidor a su servicio en el puerto', port)
})