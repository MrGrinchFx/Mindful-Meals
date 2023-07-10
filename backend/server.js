
require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const recipeRoutes = require("./routes/recipes");
//initialize the app with express function
const app = express();
//listen for requests at port #
//middleware
app.use(express.json()) //any requests that have some json body, will be parsed and attaches it to the request object

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
});

//connect to the database

mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT, () =>{
        console.log("listening at port", process.env.PORT);
    })
}).catch((err) =>{
    console.log(err);
})

//routing to the root page
app.use('/api/recipes',recipeRoutes);

