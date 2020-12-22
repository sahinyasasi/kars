const express = require("express");
const PORT = 3000;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Kar = require("./models/kars");
let app = express();
mongoose.connect("mongodb://localhost:27017/carsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/brand", (req, res) => {
  res.render("brand");
});
app.get("/model", (req, res) => {
  res.render("model");
});
app.get("/variant", (req, res) => {
  res.render("variant");
});

app.post("/index", (req, res) =>
  /*async function () {
      const brand = req.body.brand;
      const findResult = await Kars.find({
        brand: brand,
        
      });
      console.log
      await cursor.forEach(console.log("ho"));*/

  {
    const brand = req.body.brand;
    const model = req.body.model;
    Kar.find({ brand: brand }, (err, foundResults) => {
      if (err) {
        console.log(err);
      } else {
        const account = foundResults.find((acc) => acc.model === model);
        console.log(account);

        /*foundResults.forEach((element) => {
          //console.log([foundResults]);
          if (element.model === model) {
            console.log(element);
          }
        });*/
      }
    });
  }
);
app.get("/index/:brand", (req, res) => {
  Kar.find({ brand: req.params.brand }, (err, foundResults) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundResults);
    }
  });
});
app.get("/index/:brand/:model", (req, res) => {
  Kar.find(
    { brand: req.params.brand, model: req.params.model },
    (err, foundResults) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundResults);
      }
    }
  );
});
app.get("/index/:brand/:model/:variant", (req, res) => {
  Kar.find(
    {
      brand: req.params.brand,
      model: req.params.model,
      variant: req.params.variant,
    },
    (err, foundResults) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundResults);
      }
    }
  );
});

/*app.post("/brand", (req, res) => {
  const brand = req.body.brand;
  const model = req.body.model;
  const variant = req.body.variant;
  const newKar = new Kar({
    brand: brand,
    model: model,
    variant: variant,
  });
  newKar.save((err) => {
    err ? console.log(err) : res.send("new car created succesfully");
  });
});*/

/*app.post("/model", (req, res) => {
  const brand = req.body.brand;

  Kar.findOne({ brand: brand }, (err, foundResults) => {
    if (err) {
      console.log(err);
    } else {
      const model = req.body.model;
      const variant = req.body.variant;
      const newKar = new Kar({
        brand: brand,
        model: model,
        variant: variant,
      });
      newKar.save((err) => {
        err ? console.log(err) : res.send("new car created succesfully");
      });
    }
  });
});*/

app.listen(PORT, () => console.log("server started @port 3000"));
