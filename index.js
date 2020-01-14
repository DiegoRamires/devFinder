import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import 'dotenv/config';

const app = express();
mongoose.connect(`${process.env.MongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(morgan('dev'));

app.post('/', (req, res) => {
  console.log(req.body);
  return res.json({ message: 'Hello world' });
});

const port = process.env.PORT || 3333;
app.listen(port, process.env.IP, () => {
  console.log('The App server is running!');
  console.log(`Access http://localhost/${port}`);
  console.log('Hit ctrl + c to stop!');
});
