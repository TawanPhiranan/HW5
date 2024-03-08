import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";

export const router = express.Router();


//select *
router.get("/", (req, res) => {
    conn.query('select * from Creators', (err, result, fields) => {
        res.json(result);
    });
});


// Add 
router.post("/add", (req, res) => {
    const movid = req.query.movid
    const pid = req.query.person_id
    const sql = "INSERT INTO `Creators`(`movid`, `person_id`) VALUES (?,?)";
    conn.query(sql, [movid, pid], (err, result) => {
        if (err) throw err;
        res
            .status(201)
            .json({ affected_row: result.affectedRows, 
                last_idx: result.insertId });
    });
});

//Delete
router.delete("/:id", (req, res) => {
    let id = +req.params.id;
    conn.query("delete from Creators where cID= ?", [id], (err, result) => {
        if (err) throw err;
        res
            .status(200)
            .json({ affected_row: result.affectedRows });
    });
});

