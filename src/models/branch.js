'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Branch.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    registration_code: DataTypes.STRING,
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Branch',
    tableName: 'branches',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    underscored: true
  });

  return Branch;
};