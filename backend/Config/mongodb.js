var mongoose = require('mongoose');
var db_url=process.env.db_url;
mongoose.connect(db_url);
mongoose.connection.on("connected",()=>{
    console.log("MongoDb Connected Successful");
});
module.exports=mongoose;
