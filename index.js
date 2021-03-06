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
//app.use(express.static("public"));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/brand", (req, res) => {
  res.render("brand");
});
app.get("/model", (req, res) => {
  Kar.find((err, docs) => {
    if (!err) {
      res.render("model", { Kar: docs });
    } else {
      console.log("Error in retrieving brand list :" + err);
    }
  });
});
app.get("/variant", (req, res) => {
  Kar.find((err, docs) => {
    if (!err) {
      res.render("variant", { Kar: docs });
    } else {
      console.log("Error in retrieving model list :" + err);
    }
  });
});

//to search a car
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
    const variant = req.body.variant;
    if (brand && model && variant) {
      Kar.find(
        { brand: brand, model: model, variant: variant },
        (err, foundResults) => {
          if (err) {
            console.log(err);
          } else {
            console.log(foundResults);

            /*foundResults.forEach((element) => {
            //console.log([foundResults]);
            if (element.model === model) {
              console.log(element);
            }
          });*/
          }
        }
      );
    } else if (!model && !variant) {
      Kar.find({ brand: brand }, (err, foundResults) => {
        if (err) {
          console.log(err);
        } else {
          console.log(foundResults);
        }
      });
    } else if (!variant) {
      Kar.find({ brand: brand, model: model }, (err, foundResults) => {
        if (err) {
          console.log(err);
        } else {
          console.log(foundResults);
        }
      });
    }
  }
);

//to get particular brand
app.get("/:brand", (req, res) => {
  Kar.find({ brand: req.params.brand }, (err, foundResults) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundResults);
    }
  });
});
//to get a particular model
app.get("/:brand/:model", (req, res) => {
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
//to get particular variant
app.get("/:brand/:model/:variant", (req, res) => {
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
//to add a brand
app.post("/brand", (req, res) => {
  console.log(req.body);
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
});
//to add model
app.post("/model", (req, res) => {
  console.log(req.body);
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
        err ? console.log(err) : res.send("new car model created succesfully");
      });
    }
  });
});
//to add variant
app.post("/variant", (req, res) => {
  console.log(req.body);
  const model = req.body.model;
  const brand = req.body.brand;

  Kar.findOne({ brand: brand, model: model }, (err, foundResults) => {
    if (err) {
      console.log(err);
    } else {
      const variant = req.body.variant;
      const newKar = new Kar({
        brand: brand,
        model: model,
        variant: variant,
      });
      newKar.save((err) => {
        err
          ? console.log(err)
          : res.send("new car variant created succesfully");
      });
    }
  });
});

app.listen(PORT, () => console.log("server started @port 3000"));
module.exports = app;
