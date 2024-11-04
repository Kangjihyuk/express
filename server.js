const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");
const db = mysql.createConnection({
  host: "localhost",
  database: "crud_db",
  user: "root",
  password: "",
});

const app = express();
const port = 5000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(BodyParser.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) throw err;

  app.get("/", (req, res) => {
    const sql = "SELECT * FROM nama_orang";

    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "husni" });
    });
  });

  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO nama_orang (nama_lengkap,sekolah , alamat) VALUES ('${req.body.nama}', '${req.body.sekolah}','${req.body.alamat}')`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(port, () => {
  console.log(`server already to use http://localhost:${port}`);
});
