const express = require("express");
require("dotenv").config();
const Person = require("./models/person");

const app = express();
var morgan = require("morgan");

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    const date = new Date();
    response.send(
      `<p>Phonebook has info for ${count} people</p><p>${date}</p>`,
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  if (!id) {
    return response.status(400).json({ error: "id missing" });
  }

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      response.status(400).json({ error: "malformatted id" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "content missing" });
  }

  Person.findOne({ name: body.name }).then((existing) => {
    if (existing) {
      return response.status(409).json({ error: "name must be unique" });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person.save().then((saved) => {
      response.json(saved);
    });
  });
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
