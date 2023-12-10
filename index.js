import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "UserDB",
    password: "123456789",
    port: 5432,
});
db.connect();




app.get("/", (req,res)=>{
    res.render("home.ejs");
});

app.get("/login", (req,res)=>{
    res.render("login.ejs");
});

app.get("/register", (req,res)=>{
    res.render("register.ejs");
});

app.post("/register",async (req,res)=>{
    const newUser = req.body.username;
    const password = req.body.password;
    try{
        await db.query("INSERT INTO users (name , password) VALUES ($1,$2)", [newUser,password]);
        res.render("secrets.ejs");
    }catch(err){
        console.log(err);
    }   
});

app.post("/login",async (req,res)=>{
    const newUser = req.body.username;
    const password = req.body.password;

    
});



app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
