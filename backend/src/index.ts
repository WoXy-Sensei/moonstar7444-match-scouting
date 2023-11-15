import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb+srv://bardiaramez:bardia1386@spotify.bg1xthc.mongodb.net/teamscout?retryWrites=true&w=majority');
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();