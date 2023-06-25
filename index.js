console.log("Hello World!");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.get("/concertbuddies", (req, res) => {
  res.render("stage.ejs");
});

app
  .set("view engine", "ejs")
  .set("views", "views")
  .use(express.static("assets"))
  .use(express.json());

app.use(bodyParser.json());

require("dotenv").config(); // Load environment variables from .env file

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("Error:", error);
  }
}

run().catch(console.dir);

app.post("/updateStatus/:artist", async (req, res) => {
  const artist = req.params.artist;
  const status = req.body.status;

  try {
    await run(); // Connect to MongoDB before performing the update

    const collection = client.db("toggle_button").collection("artists");
    await collection.updateOne({ name: artist }, { $set: { status: status } });

    console.log("Status updated:", artist, status);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500);
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

app.listen(699, () => {
  console.log("Server is running on port 699");
});
