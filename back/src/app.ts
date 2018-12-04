import express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";

createConnection().then(connection => {
    var app = express();
app.use(bodyParser.json())

app.post("/auth", function(req: Request, res: Response){
    //
});

app.get('/post', function(req: Request, res: Response){
    // 
});

app.get('/post/:id', function(req: Request, res: Response){
    //
});

app.get('/post/:id/comments', function(req: Request, res: Response){
    //
});

app.post('/post', function(req : Request, res: Response){
    
});

app.put('/post/:id', function(req: Request, res: Response){

});

app.delete('/post/:id', function(req: Request, res: Response){

});

app.listen(3200);
}).catch(error => console.log(error))