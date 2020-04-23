const express= require('express');
const bodyParser = require('body-parser');
const db = require('./models/db');
const itemController = require('./controllers/item.controller');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

app.use('/api/items', itemController);

const port = 3000;

app.listen(port, () => console.log('Server started on port ' + port));