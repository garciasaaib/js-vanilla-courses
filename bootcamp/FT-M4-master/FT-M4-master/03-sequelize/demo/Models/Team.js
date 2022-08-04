const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Team', {
    code: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    one: { type: DataTypes.STRING,  unique: 'compositeIndex' },
    two: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
  });
}