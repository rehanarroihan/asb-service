'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shipping.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    origin_branch_id: DataTypes.INTEGER,
    destination_branch_id: DataTypes.INTEGER,
    tracking_no: DataTypes.STRING,
    status: DataTypes.INTEGER,
    service: DataTypes.INTEGER,
    mode: DataTypes.INTEGER,
    price: DataTypes.STRING,
    payment_type: DataTypes.INTEGER,
    sender_name: DataTypes.STRING,
    sender_address: DataTypes.STRING,
    sender_phone: DataTypes.STRING,
    receiver_name: DataTypes.STRING,
    receiver_address: DataTypes.STRING,
    receiver_phone: DataTypes.STRING,
    stuff_content: DataTypes.STRING,
    stuff_weight: DataTypes.STRING,
    stuff_colly: DataTypes.STRING,
    stuff_reference_no: DataTypes.STRING,
    manifest_id: DataTypes.STRING,
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
    modelName: 'Shipping',
    tableName: 'shippings',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    underscored: true
  });
  return Shipping;
};