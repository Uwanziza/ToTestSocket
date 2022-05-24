var express= require("express");
const path = require("path");
var app = express();
var http= require ("http").createServer(app);
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delivery'
})
con.connect(function(err){
    if (err) console.log(err)
    console.log("MySql db Connected!");

})
var objects = [];
var socketCount = 0

var io =require("socket.io")(http);
io.on("connection",function(socket){
     socketCount++
     io.sockets.emit('users connected', socketCount)

     socket.on('disconnect', function() {
         socketCount--
         io.sockets.emit('users disconnected', socketCount)
     })
     socket.on('new msg', function(data){
        // New msg added, push to all sockets and insert into db
        objects.push(data)
        io.sockets.emit('new msg', data)
        con.query('INSERT INTO message (content) VALUES (?)',data.content)

    })


   

});

app.get("/",function (request, result){
   result.sendFile(`${__dirname}/index.html`);
   
    //console.log(__dirname)
    });

var port=3004;
http.listen(port,function(){
console.log("Listening to port " +port); 
}); 



//var isInitObjects = false

//console.log("user conncted")
/*socket.on('disconnect',()=>{
    console.log("User disconnected")
    })*/

    /*socket.on('chat',(msg)=>{
        console.log("mesg:"+msg)
        io.emit('chat:',msg)
        })*/

        /*socket.on('chat',(msg)=>{
            io.emit('chat:',msg)
            })*/
            

 /*var notes = []
var isInitNotes = false
var socketCount = 0*/

 /* // Socket has connected, increase socket count
     socketCount++
     // Let all sockets know how many are connected
     io.sockets.emit('users connected', socketCount)
  
     socket.on('disconnect', function() {
         // Decrease the socket count on a disconnect, emit
         socketCount--
         io.sockets.emit('users connected', socketCount)
     })
     socket.on('new note', function(data){
        // New note added, push to all sockets and insert into db
        notes.push(data)
        io.sockets.emit('new note', data)
        // Use node's db injection format to filter incoming data
        con.query('INSERT INTO notes (note) VALUES (?)', data.note)
    })*/







    /* socket.on("newuser",function(username){
       socket.broadcast.emit('update',username + "joined the conversation");
   });
   socket.on("exituser",function(username){
    socket.broadcast.emit('update',username + "left the conversation");
});
socket.on("chat",function(message){
    socket.broadcast.emit('chat',message);
});*/