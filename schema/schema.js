const { GraphQLSchema } = require("graphql");
const mutation = require("./mutations");
const query = require("./root_query_type");

module.exports = new GraphQLSchema({
  query,
  mutation,
});
