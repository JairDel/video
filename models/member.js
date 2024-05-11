const AddressType = {
    street: type.STRING,
    number: type.STRING,
    memberId: type.INTEGER,
    zip: type.STRING,
    city: type.STRING,
    state: type.STRING,
    country: type.STRING,
}

module.exports = (sequelize, type) => {
    const Member = sequelize.define('members', {
        id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        name: type.STRING,
        lastName: type.STRING,
        address: {type: AddressType},
        phone: type.STRING, 
    });
    return Member;
};