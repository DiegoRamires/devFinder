import { Router } from 'express';

import Dev from './models/Dev';

import API from './utils/apiUrl';

const routes = Router();

routes.post('/devs', async (req, res) => {
  const { github_username, techs, latitude, longitude } = req.body;

  const API_response = await API.get(`${github_username}`);

  const { name = login, avatar_url, bio } = API_response.data;

  console.log(name, avatar_url, bio, github_username);

  const techsArray = techs.split(',').map(tech => tech.trim());

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location,
  });

  return res.json(dev);
});

export default routes;
