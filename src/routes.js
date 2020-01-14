import { Router } from 'express';

import API from './utils/apiUrl';

const routes = Router();

routes.post('/devs', async (req, res) => {
  const { github_username } = req.body;

  const API_response = await API.get(`${github_username}`);
  console.log(API_response.data);

  return res.json({ message: 'Hello world' });
});

export default routes;
