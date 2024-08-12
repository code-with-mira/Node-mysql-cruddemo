const express = require("express");
const app = express();
const con = require("./config");
const port = process.env.PORT || 4000
app.use(express.json());
app.get("/", (req, res) => {
  con.query("select * from users", (err, result) => {
    if (err) {
      res.send("err");
    } else {
      res.send(result);
    }
  });
});
app.post("/", (req, res) => {
  const data = req.body;
  con.query("Insert INTO users SET ?", data, (err, result, fields) => {
    if (err) throw err;
    res.send(result);
    // check post api in postman under select post request nd body under raw under type json data.
    // nd then click send so insert data in mysql database.
    // all routes are same "/" bcos diffrent method get,put, post,delete with same route u can use.
    // bt same method with dont use same route. for example 2 get api so same get method with routwe name should be diffrent.
  });
});
app.put("/:id", (req, res) => {
  //in postman under localhost:4000/2 i want 2 numder id data update.
  // so pass 2 nd then body under row under pass json data then click send so update 2 number id data in mysql database.
  const data = [req.body.name, req.body.password, req.params.id];
  con.query(
    "UPDATE users SET name = ?, password = ? WHERE id = ?",
    data,
    (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.delete("/:id", (req, res) => {
  con.query(
    "DELETE FROM users WHERE id =" + req.params.id,

    (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.listen(port);
