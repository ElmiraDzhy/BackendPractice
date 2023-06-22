const {Superhero, Superpower} = require('../models');

module.exports.checkSuperpowers = async (req, res, next) => {
    try {
        const {superpowers} = JSON.parse(req.body.payload);
        if (superpowers && superpowers.length > 0) {

            for (let i = 0; i < superpowers.length; i++) {
                await Superpower.findOrCreate({
                    where: {
                        description: superpowers[i]
                    },
                    defaults: {
                        description: superpowers[i]
                    }
                });
            }
        }

        next();
    } catch (err) {
        next(err);
    }
}