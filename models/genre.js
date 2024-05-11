const { Sequelize } = require("sequelize");
//modelos singular, tablas en plural

module.exports = (sequelize, type) => {
    const Genre = sequelize.define('genres', { //para definir el modelo a utiliar en genre
        id:{ type: type.INTEGER, primaryKey:true, autoIncrement:true},
        description: type.STRING,
        status: type.BOOLEAN
    }); 
    return Genre;
};