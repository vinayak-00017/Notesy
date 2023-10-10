const express = require('express');
const userRouter = require("./routes/user")
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use("/user",userRouter);

mongoose.connect(`${process.env.MONGO_URL}`,
                {dbName : `${process.env.MONGO_DB}`}
)

app.listen(3000, () => console.log('Server is listening on port 3000'))



