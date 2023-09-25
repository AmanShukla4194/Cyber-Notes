const connectToMongo = require('./db');
const express = require('express');
// const mongoose = require('mongoose');
connectToMongo();

const app = express();
const port = 5000;
const cors = require('cors');


// const URI = 'mongodb://0.0.0.0/Aman';
// mongoose.connect(URI);
// const conn = mongoose.connection;

// conn.once('open', ()=> {
//   console.log("connection Successfull");
// })

// conn.on('error', ()=> {
//   console.log("error occured");
//   process.exit();
// })

// Server Listening Code Starts here!

// app.get('/', (req, res) => {
//   res.send('Hello World 2.0!')
// });

// app.get('/home', (req, res) => {
//   res.send("<h1>Welcome to Home</h1>")
// });

app.use(cors())
app.use(express.json());   // to use the req.body we need this middleware

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Cyber Notes backend app listening on port ${port}`)
});
