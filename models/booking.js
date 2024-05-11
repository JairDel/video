module.exports = (sequelize, type) => {
    const Booking = sequelize.define('booking', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        startDate: { type: type.DATE },
        endDate: { type: type.DATE },
        memberId: { type: type.INTEGER },
        copyId: { type: type.INTEGER },
    });
    return Booking;
}