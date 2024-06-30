'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DiaryEntry.belongsTo(models.User, { foreignKey: 'userId' });
      DiaryEntry.hasMany(models.Comment, { foreignKey: 'diaryEntryId' });
    }
  }
  DiaryEntry.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DiaryEntry',
  });
  return DiaryEntry;
};