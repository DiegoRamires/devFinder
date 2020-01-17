import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import 'dotenv/config';

import routes from './routes';
import { setupWebsocket } from './websocket';

const app = express();
mongoose.connect(`${process.env.MongoDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const server = http.Server(app);

setupWebsocket(server);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3334, process.env.IP, () => {
  console.log('The App server is running!');
  console.log(`Access http://localhost/${process.env.PORT}`);
  console.log('Hit ctrl + c to stop!');
});
