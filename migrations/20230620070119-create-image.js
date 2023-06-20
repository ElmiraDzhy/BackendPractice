'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            path: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            superheroId: {
                field: 'superhero_id',
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'superheroes'
                    },
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
    },
    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('images');
    }
};