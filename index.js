const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        myUser: User
      }

    type Photos {
        id: String
        path: String
      }

      type User {
        id: String
        name: String
        email: String
        photos: [Photos]
      }
    `;
const resolver = {
    Query : {
        myUser: () => {
            return {
              id: 3232324,
              name: 'John Doe',
              email: 'john.doe@example.com',
              photos: [{
                id: 123,
                path: '/img/path/here'
              }]
            }
          },
          photos: () => {
            return {
              id: 123,
              path: '/img/path/here'
            }
          }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolver
});
server.listen(3000)
.then(()=>{
    console.log("server is running on port 3000");
});