const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDef');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config');

const pubSub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubSub})
});

mongoose
    .connect(MONGODB , {useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: PORT});
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.log(err)
    })