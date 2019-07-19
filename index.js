const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");

const app = express();

const connectionString = process.env.DATABASE_URL || "postgres://postgre:pass123@localhost:5000/postgres";
const pool = new Pool({
  connectionString: connectionString
});

express()
  .use(express.static(path.join(__dirname, 'public/')))
  .use(express.urlencoded({
    extended: true
  }))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', getlist)
  .post('/hw', postHw)
  // .post('/addHw', (req, res) => res.render('pages/addHw'))
  // .post('/addList', (req, res) => res.render('pages/addList'))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

let hw = "SELECT hw_id, start_date, hw_name, hw_text, class_code, end_date FROM hw";
let list = "SELECT list_id, list, list_text, start_date, end_date FROM to_do";

// function getView(req, res) {
//   pool.connect,
//     function (req) {
//       req.query('SELECT * FROM hw', (result) => {
//         done();
//         res.send(result.rows);
//       });
//     }
// }

function postHw(req, res) {
  res.json({
    success: true
  })
}

function getlist(req, res) {
  getHwFromDb();
  getListFromDb();
}

  getHwFromDb(function (error, result) {
    if (error || result == null) {
      res.status(500).json({
        success: false,
        data: error
      });
    } else {
      res.send({
        result: result,
      });
      res.end();
    }
  });

function getHwFromDb(callback) {
  var sql = "SELECT hw_id, start_date, hw_name, hw_text, class_code, end_date FROM hw";

  pool.query(sql, function (err, result) {
    if (err) {
      console.log("An error with the DB occured");
      console.log(err);
      callback(err, null);
    }
    callback(null, result.rows);
  });
}

getListFromDb(function (error, result) {
  if (error || result == null) {
    res.status(501).json({
      success: false,
      data: error
    });
  } else {
    res.send({
      result: result,
    });
    res.end();
  }
});

function getListFromDb(callback) {
var sql = "SELECT list_id, list, list_text, start_date, end_date FROM to_do";

pool.query(sql, function (err, result) {
  if (err) {
    console.log("An error with the DB occured");
    console.log(err);
    callback(err, null);
  }
  callback(null, result.rows);
});
}