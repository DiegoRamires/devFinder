import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes';

const app = express();
mongoose.connect(`${process.env.MongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, process.env.IP, () => {
  console.log('The App server is running!');
  console.log(`Access http://localhost/${process.env.PORT}`);
  console.log('Hit ctrl + c to stop!');
});
