import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

export default {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
    });
    return res.json({ devs });
  },
};
