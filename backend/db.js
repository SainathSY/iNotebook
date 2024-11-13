const mongoose=require('mongoose');
const mongoURI="mongodb+srv://sainathsy:Sainath%402003@mongocluster.adcy6.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,{dbName: 'iNotebook'});
    console.log("Connected to Mongo")
}

module.exports = connectToMongo; 