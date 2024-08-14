import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    console.log(process.env.MONGODB_URL, "process.env.MONGODB_URL")
    if (!process.env.MONGODB_URL) {
        return console.error('MISSING MONGODB_URL');
    }

    if (isConnected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'Products',
        });

        isConnected = true;
        console.log('Mongodb is connected');
    } catch (error) {
        console.error('Mongodb Connection Error', error);
    }
};