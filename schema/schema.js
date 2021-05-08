const { GraphQLSchema } = require("graphql");
const mutation = require("./mutations");
const { RootQuery } = require("./root_query_type");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
