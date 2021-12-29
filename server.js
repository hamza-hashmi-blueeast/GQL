const express = require('express');
const app = express();

const mockData = require('./MOCK_DATA.json');
const graphql= require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');
const {graphqlHTTP} = require('express-graphql');

const UserType = new GraphQLObjectType({
  "name":"User",
  fields:()=>({
    id          : {type : GraphQLInt},
    first_name  : {type : GraphQLString},
    last_name   : {type : GraphQLString},
    email       : {type : GraphQLString},
    gender      : {type : GraphQLString},
    ip_address  : {type : GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  "name":"RootQueryType",
  fields:{
    getAllUsers : {
      type : new GraphQLList(UserType),
      args: {id: { type: GraphQLInt}},
        resolve(parent, args){
          return mockData;
        }
    }
  }
});

const Mutation = new GraphQLObjectType({
  "name":"Mutation",
  fields:{
    createUser : {
      type : UserType,
      args: {
        first_name  : {type : GraphQLString},
        last_name   : {type : GraphQLString},
        email       : {type : GraphQLString},
        gender      : {type : GraphQLString},
        ip_address  : {type : GraphQLString}
      },
      resolve(parent, args){
        mockData.push({
          id: mockData.length + 1,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          gender: args.gender,
          ip_address: args.ip_address
        });
        return args;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery, mutation: Mutation
})

//controllers
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));


app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})
module.exports = app;
