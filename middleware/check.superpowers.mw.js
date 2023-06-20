const {Superhero, Superpower} = require('../models');

module.exports.checkSuperpowers = async (req, res, next) => {
    try {
        const {superpowers} = JSON.parse(req.body.payload);
        if (superpowers && superpowers.length > 0) {

            for (let i = 0; i < superpowers.length; i++) {

                const rows = await Superpower.findAll({
                    where: {
                        description: superpowers[i]
                    }
                })
                if (rows.length === 0) {
                    const newPower = await Superpower.create({
                        description: superpowers[i]
                    })
                }
            }
        }

        next();
    } catch (err) {
        next(err);
    }
}