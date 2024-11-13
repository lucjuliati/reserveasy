import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../index'

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
    },
},
)