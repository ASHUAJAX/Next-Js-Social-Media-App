import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const mongoUrl: any = process.env.MONGO_DB_URL;
        const mongooseResp: object = await mongoose.connect(mongoUrl);

        if (mongooseResp) {
            
        }else{
            throw new Error("DB Connection Failed!");
        }
    } catch (err:any) {
        // console.log(err.message);
    }
}

export default dbConnection;
