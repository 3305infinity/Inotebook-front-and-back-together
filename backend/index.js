const express = require('express');
const connectToMongo=require('./db');
const app = express()
const port = 5000
connectToMongo()
var cors = require('cors')
app.use(cors())
//to fetch the body from the api with api/auth we have to use a middleware
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
  console.log(` iNotebook backend on port http://localhost:${port}`)
})