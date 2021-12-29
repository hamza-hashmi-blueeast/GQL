const express = require('express');
const app = express();

const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schemas/index.js')

//controllers
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));


app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
module.exports = app;
