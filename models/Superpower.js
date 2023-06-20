'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Superpower extends Model {

        static associate (models) {
            Superpower.belongsToMany(models.Superhero, {
                through: 'superpowers-to-superheroes',
                foreignKey: 'superpower_id'
            });
        }
    }

    Superpower.init({
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: true,
                notEmpty: true
            }
        }
    }, {
        sequelize,
        modelName: 'Superpower',
        tableName: 'superpowers',
        underscored: true
    });
    return Superpower;
};