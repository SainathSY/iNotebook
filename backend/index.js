const connectToMongo=require('./db');
connectToMongo();

const express = require('express')
const port = 5000

const cors = require('cors');
const app = express();

app.use(cors({
  origin: ["https://i-notebook-frontend-steel.vercel.app"],
  methods: ['GET', 'POST','PUT','DELETE', 'OPTIONS'],
  credentials: true
}));


app.use(express.json())
app.get('/', (req, res) => {res.json("Hello, world!");});

app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
