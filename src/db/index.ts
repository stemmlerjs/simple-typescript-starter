import mongoose from 'mongoose';
import env from './../config/dotenv';

export default async function() {
  const DB_USER = env.DB_USER;
  const DB_PASSWORD = env.DB_PASSWORD;
  const DB_NAME = env.DB_NAME;

  const connectionString: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wqnzi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to database');
  } catch (e) {
    console.log('DB connection failed', e);
  }
}
