'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('superpowers-to-superheroes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            superpowerId: {
                field: 'superpower_id',
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'superpowers',
                    key: 'id'
                }
            },
            superheroId: {
                field: 'superhero_id',
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'superheroes',
                    key: 'id'
                }
            },
            createdAt: {
                field: 'created_at',
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addConstraint('superpowers-to-superheroes', {
            fields: ['superpower_id', 'superhero_id'],
            type: "unique",
            name: 'unique_pair_constraint'
        })
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('superpowers-to-superheroes');
    }
};
