'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.CV.hasOne(models.Dev, {
        foreignKey : {
          allowNul: false
        }
      })
    }
  };
  CV.init({
    title: DataTypes.STRING,
    skills: DataTypes.STRING,
    exp: DataTypes.STRING,
    diplomes: DataTypes.STRING,
    idDev: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CV',
  });
  return CV;
};