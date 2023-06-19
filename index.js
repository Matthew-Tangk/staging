console.log("Hello World!");
const express = require("express");
const app = express();

app
  .use(express.json())
  .post("/concertbuddies", (req, res) => {
    const status = req.body.status;
    saveStatusToMongoDB(status); // Call a function to save status to MongoDB
    res.sendStatus(200);
  })
  .get("/concertbuddies", (req, res) => {
    res.render("stage.ejs");
  })
  .use(express.static("static"))
  .set("view engine", "ejs")
  .set("views", "views");

app.listen(699);

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
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}

async function saveStatusToMongoDB(status) {
  try {
    await client.connect();
    const db = client.db("toggle_button"); // Replace "your-database-name" with the actual database name
    const collection = db.collection("status_toggle_button"); // Replace "your-collection-name" with the actual collection name
    await collection.insertOne({ status });
    console.log("Status saved to MongoDB");
  } catch (error) {
    console.error("Error saving status to MongoDB:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
