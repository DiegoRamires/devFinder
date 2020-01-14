import Dev from '../models/Dev';
import API from '../utils/apiUrl';

export default {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const API_response = await API.get(`${github_username}`);

      const { name = login, avatar_url, bio } = API_response.data;

      const techsArray = techs.split(',').map(tech => tech.trim());

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
      return res.json(dev);
    }

    return res.status(422).send('User already exists');
  },

  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },
};
