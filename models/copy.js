module.exports = (sequelize, type) => {
    const Copy = sequelize.define('copies', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        movieId: {type: type.INTEGER},
        number: {type: type.INTEGER},
        format: {type: type.ENUM, values: ['VHS', 'DVD', 'BLU_RAY'],},
        status: {type: type.ENUM, values: ['available', 'lost', 'damage'],},
    });
    return Copy;
}