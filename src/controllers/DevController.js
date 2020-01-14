import Dev from '../models/Dev';

import API from '../utils/apiUrl';

export default {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const API_response = await API.get(`${github_username}`);

    const { name = login, avatar_url, bio } = API_response.data;

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
  },
};
