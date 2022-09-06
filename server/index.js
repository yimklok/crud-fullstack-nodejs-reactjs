const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudapi'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get',(req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet,(error,result)=>{
        res.send(result)
    })
})
 
app.post('/api/post',(req,res)=>{
    const {name,email,contact} = req.body;
    //The req. body object allows you to access data in a string or JSON object from the client side. 
    //You generally use the req. body object to receive data through POST and PUT requests in the Express server.
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        if(error)
            console.log('error',error);
    })
})

app.delete('/api/remove/:id',(req,res)=>{
    const {id} = req.params;
    //params is an object of the req object that contains route parameters. 
    //If the params are specified when a URL is built, then the req. params object will be populated when the URL is requested
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error)
            console.log('error',error);
    })
})

app.get('/api/get/:id',(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet,id,(error,result)=>{
        if(error)
            console.log(error);
        res.send(result)
    })
})

app.put('/api/update/:id',(req,res)=>{
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?,email = ?, contact = ? WhERE id = ?";
    db.query(sqlUpdate,[name,email,contact,id],(error,result)=>{
        res.send(result)
    })
})



app.get('/',(req,res)=>{
    // const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES ('thida','thida@gamil.com','0976065126')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log('error',error);
    //     console.log('result',result);
    // })
    // res.send('Hello express');
})

app.listen(5000,()=>{
    console.log('Server is running on port 5000.')
})