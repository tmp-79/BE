const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./router/index.js')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const app = express();
require('dotenv').config()

//connect DB
const connectDb = require("./config/db");
connectDb();

//swagger demo


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Users REST API',
            description: "A REST API built with Express and MongoDB. This API provides movie catchphrases and the context of the catchphrase in the movie."
        },
    },
    apis: ["./router/index.js"]
}

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json());

// app.listen(3000);
let corsOptions = "http://localhost:4200"
app.use(cors(corsOptions));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/', routes)

app.listen(process.env.PORT || 5000, () => console.log('Up and running 🚀'));
