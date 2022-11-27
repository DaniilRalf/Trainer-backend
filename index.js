const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db');
const Models = require('./models/models');
const AuthorizationMiddleware = require('./middleware/authorization');

const {graphqlHTTP} = require('express-graphql');
const schema = require('./qraphql/schema');
const root = require('./controllers/qraphQL/index');


//middleware
let test = (req, res, next) => {
    next()
}

// CONSTANTS---------------------------------------
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use(AuthorizationMiddleware);
app.use('/graphql', test, graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
    // formatError: (err) => {
    //     return err.message
    // }
}))
// CONSTANTS---------------------------------------


// START APP----------------------------------------
const start = async () => {
    try {
        await sequelize.authenticate(); //подключение к БД
        await sequelize.sync({alter: true});  //сверяем БД с теми моделями что мы описали
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