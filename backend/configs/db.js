import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => { console.log("Database Connected Succesfully") })

        let mongoDbUri = process.env.MONGODB_URI
        const projectName = "urban-voice"

        if (!mongoDbUri) {
            throw new Error("MONGODB_URI environment variable not set")
        }

        if (mongoDbUri.endsWith("/")) {
            mongoDbUri = mongoDbUri.slice(0, -1)
        }

        await mongoose.connect(`${mongoDbUri}/${projectName}`)

    } catch (error) {
        console.log("Error connecting to MongoDB", error);


    }
}

export default connectDB;