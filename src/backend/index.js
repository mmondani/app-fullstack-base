//=======[ Settings, Imports & Data ]==========================================
var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');
const DeivcesRoutes = require("./devices/routes");

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

// Se cargan las rutas del módulo devices en el objeto app
DeivcesRoutes(app);


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
