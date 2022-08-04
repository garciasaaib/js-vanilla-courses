const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Player', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('username', value.toUpperCase());
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('active', 'injured', 'retired')
    },
    skill: {
      type: DataTypes.INTEGER,
      get() {
        // return this.skill + ' points'; // Wrong!
        return this.getDataValue('skill') + ' points';
      },
      validate: {
        min: 0,
        max: 100,
        isEven(value) {
          if(value % 2 !== 0) {
            throw new Error('Only even values are allowed!')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', (this.firstName + this.lastName + value).split('').sort(() => 0.5 - Math.random()).join(''));
      }
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set() {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }
  }, {
    // timestamps: false
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
  });
}