const express = require('express');
const server = express();
const path = requrire('path');


const staticPath = path.join(___dirname,".../public")

server.use(express.static(staticPath));

server.get("/",(req,res)=>{
    res.write("<h1>Hello Omkar & Dinesh</h1>")
    res.send();
});

server.listen(4000);