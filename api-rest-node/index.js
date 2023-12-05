'user scrict'

var mongoose = require('mongoose');
var app      = require('./app'); //
var port     = process.env.PORT || 3999;


mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/api_rest_node',{
mongoose.connect('mongodb://192.168.0.3:27017/api_rest_node',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }).then(()=>{
        console.log('La conexion a la base de datos de mongo se ha realizado');

        // Crear el servidor
        app.listen(port,() => {
            console.log('el servidor esta corriendo perfectamente http://localhost:3999 esta funcionando');
        })

    }).catch(error => console.log(error) );