import Dev from '../models/Dev';
import API from '../utils/apiUrl';

import parseStringAsArray from '../utils/parseStringAsArray';
import { findConnections, sendMessage } from '../websocket';

export default {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const API_response = await API.get(`${github_username}`);

      const { name = login, avatar_url, bio } = API_response.data;

      const techsArray = parseStringAsArray(techs);

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

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, 'new-dev', dev);

      return res.json(dev);
    }

    return res.status(422).send('User already exists');
  },

  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async destroy(req, res) {
    const { github_username } = req.body;
    const dev = await Dev.findOne({ github_username });

    if (!dev) {
      return res.status(422).json({ error: 'Dev does not exists!' });
    }

    if (dev) {
      await Dev.deleteOne({ github_username });
    }

    return res.send();
  },
};
