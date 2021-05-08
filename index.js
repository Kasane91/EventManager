const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
require("./models/events");
require("./models/user");
require("./models/bookingModel");

const mongoose = require("mongoose");
const schema = require("./schema/schema");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,

    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("YOLOMEISTERS UNITE");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
