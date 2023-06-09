const Sequelize = require("sequelize");

const sequelize =require('../utils/database')

const User = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
    },
    password:{
        type:Sequelize.STRING,
    },
    ispremiumuser:Sequelize.BOOLEAN,
    totalExpenses: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
})
   

module.exports=User;