
require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/userRoutes")
//initialize the app with express function
const app = express();
//listen for requests at port #
//middleware
app.use(express.json({ limit: '100MB' })) //any requests that have some json body, will be parsed and attaches it to the request object

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
});

//connect to the database

mongoose.connect('mongodb+srv://2003kevinle:Kevinle17631763@mernapp.db5objb.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    app.listen(4000, () =>{
        console.log("listening at port", 4000);
    })
}).catch((err) =>{
    console.log(err);
})

//routing to the root page
app.use('/api/recipes',recipeRoutes);
app.use('/api/user', userRoutes)

