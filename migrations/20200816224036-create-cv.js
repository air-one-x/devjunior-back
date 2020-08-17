'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CVs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      exp: {
        type: Sequelize.STRING
      },
      diplomes: {
        type: Sequelize.STRING
      },
      idDev: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Devs',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CVs');
  }
};