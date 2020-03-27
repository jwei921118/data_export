// 停车数据


module.exports = app => {

    const {
        INTEGER,
        STRING,
        DATE
    } = app.Sequelize;
    const ParkingData = app.model.define('inc_parkingdata', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        parkingno: {
            type: STRING,
            primaryKey: true,
            autoIncrement: false
        },
        type: INTEGER,
        data: STRING,
        status: INTEGER,
        created_at: DATE,
        updated_at: DATE
    }, {
        freezeTableName: true,
        tableName: 'inc_parkingdata',
        timestamps: false,
    });
    return ParkingData;

};