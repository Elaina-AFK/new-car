const express = require("express");
const db = require("./db.js");
const session = require("express-session");
// database

const port = 3000;

// middleware function

const Authenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
    return;
  }
  res.status(401).send({ isAuthenticated: false });
};

// api
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "very secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Car Table

app.get("/api/carData", Authenticated, async (req, res) => {
  const carData = await db.Car.find({}).select(
    "id name price year added modified -_id"
  );
  res.send(JSON.stringify(carData));
});

app.post("/api/carData", async (req, res) => {
  const userData = req.body;
  const isAlreadyExist = await db.Car.exists({ name: req.body.name });
  if (isAlreadyExist) {
    res.send(JSON.stringify({ pass: false }));
    return;
  }
  const addedDate = new Date();
  const id = Number(new Date()).toString(32);
  const newCar = new db.Car({
    ...userData,
    added: addedDate,
    modified: addedDate,
    id: id,
  });
  await newCar.save();
  res.send(
    JSON.stringify({
      pass: true,
    })
  );
});

app.put("/api/carData", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    await db.Car.findOneAndUpdate(
      { id: id },
      { ...updateData, modified: new Date() }
    );
    res.send({ pass: true });
  } catch (e) {
    res.send({ pass: false });
  }
});

app.delete("/api/carData", async (req, res) => {
  const id = req.body.id;
  const deleted = await db.Car.findOneAndDelete({ id });
  deleted ? res.send({ pass: true }) : res.send({ pass: false });
});

// Login

app.post("/api/login", async (req, res) => {
  const userData = req.body;
  const user = await db.Member.findOne({
    username: userData.username,
    password: userData.password,
  });
  if (user) {
    req.session.user = {};
    req.session.user.username = user.username;
    req.session.user.role = user.role;
    res.send(JSON.stringify({ pass: true }));
    return;
  }
  return res.send(JSON.stringify({ pass: false }));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
