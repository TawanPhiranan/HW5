import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { Person } from "../model/person_get_res";


export const router = express.Router();

// select *
router.get("/", (req, res) => {
    conn.query('select * from Person', (err, result, fields) => {
      res.json(result);
    });
  });

// Add 
router.post("/add", (req, res) => {
    let person: Person = req.body;
    let sql =
      "INSERT INTO `Person`(`name`, `age`, `detail`, `url`) VALUES (?,?,?,?)";
    sql = mysql.format(sql, [
      person.name,
      person.age,
      person.detail,
      person.url,
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });

  //Delete
  router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Person where person_id = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
  