const express = require('express');
const userRouter = require("./routes/user")
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use("/user",userRouter);

mongoose.connect('mongodb+srv://ea3y:2NWuD7oy3Hhhunzr@cluster0.vhxkjn2.mongodb.net/KEEP',
                {dbName : 'KEEP'}
)

app.listen(3000, () => console.log('Server is listening on port 3000'))



