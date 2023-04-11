import mongoose from "mongoose";


const ConnectDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB)
    .then(()=> console.log(`MongoDB Connected!`))
    .catch((error) => console.log(`Couldn't Connected to DB!`, error))
}

export default ConnectDB;