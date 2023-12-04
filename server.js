const express = require('express');
const cors=require("cors");
const mysql =require("mysql2");


const app=express();

app.use(express.json());


app.use(cors());

const db=mysql.createConnection({
host:"localhost",
user:"root",
password:"Danuraha@9",
database:"hobby",

})

app.get("/",(req,res)=>{
    const sql="SELECT * FROM hobbies";
    db.query(sql,(err,data)=>{
        console.log(err);
        if(err) return res.json("Error");
        return res.json(data);
    })
   

})


app.post('/create', (req, res) => {
    const { userName, hobbyName } = req.body;
    const sql = 'INSERT INTO hobbies (userName, hobbyName) VALUES (?, ?)';
    const values = [userName, hobbyName];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Assuming your INSERT query returns the ID of the newly inserted row
      const insertedId = result.insertId;
      console.log(`Inserted row with ID: ${insertedId}`);
  
      res.json({ success: true, insertedId });
    });
  });
  

app.listen(8082,()=>{
    console.log('listening');
});