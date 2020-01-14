import { Router } from 'express';

const routes = Router();

routes.post('/', (req, res) => {
  console.log(req.body);
  return res.json({ message: 'Hello world' });
});

export default routes;
