const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Accesss-Control-Allow-Origin", "*");
  next();
});

app.use(express.json({ limit: "10mb" }));

let db = new sqlite3.Database("mydatabase.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to dataabase");
});

app.post("/validatePassword", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  db.all(
    ` select * from  usertesting  where username ='${username}' AND password ='${password}' `,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send(console.log("koi milgeya"));
      } else {
        res.send({ validation: false });
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  db.run(`INSERT INTO  usertesting(username, email, password) VALUES(?, ?, ?)`, [`${username}, ${email}, ${password}`], function (err) {
    if (err) {
    console.log(db.all(`SELECT * FROM  usertesting `));
      return console.log(err.message);
    }
    // get the last insert id
    console.log(db.all(`SELECT * FROM  usertesting `));
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
});

app.listen(3001, () => console.log("listing port at 3001"));
