const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const sequelize = require('./db');
const Models = require('./models/models');
const AuthorizationMiddleware = require('./middleware/authorization');

const {graphqlHTTP} = require('express-graphql');
const schema = require('./api/qraphql/schema');
const root = require('./controllers/qraphQL/index');
const routers = require("./api/routers");
const defaultData = require("./workers/defolt-data");


//middleware
//==== добавить обработку ошибок
let test = (req, res, next) => {
    next()
}

// CONSTANTS---------------------------------------
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cors());
app.use(fileUpload());

app.use(AuthorizationMiddleware);
app.use('/graphql', test, graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
    // formatError: (err) => {
    //     return err.message
    // }
}))
app.use('/api', routers)
// CONSTANTS---------------------------------------


// START APP----------------------------------------
const start = async () => {
    try {
        await sequelize.authenticate(); //подключение к БД
        await sequelize.sync({alter: true});  //сверяем БД с теми моделями что мы описали
        await defaultData(); // создаем дефолтные роли
        await app.listen(PORT, () => console.log(`SERVER START ON - http://localhost:${PORT}`));  //запуск сервера
    } catch (e) {
        console.log(`ERROR - ${e}`) //отлавливаем ошибку при подключении
    }
}
start();
// START APP----------------------------------------


app.get('/', (req, res) => {
    res.json('SERVER START');
})