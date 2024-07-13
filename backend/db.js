const mongoose = require('mongoose');
const mongouri="mongodb://localhost:27017/inotebook"
const connectToMongo=async()=>{
    // mongoose.connect(mongouri,()=>{
        // console.log("successfully connected to Mongo DB")
    // })
    mongoose.connect(mongouri)
    // mongoose no longer accepts a callback

}
// const connectToMongo = async () => {
//     try {
//       await mongoose.connect(mongouri);
//       console.log("successfully connected to Mongo DB");
//     } catch (error) {
//       console.error("Error connecting to Mongo DB:", error);
//     }}
module.exports=connectToMongo;