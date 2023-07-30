const {DataTypes} = require('sequelize');
const sequelize = require('../db')
// ----------IMPORTS----------------------------


const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
    username: { type: DataTypes.STRING, unique: true, required: true },
    first_name: { type: DataTypes.STRING, required: true },
    last_name: { type: DataTypes.STRING, required: true},
    password: {type: DataTypes.STRING, required: true},
    is_active: {type: DataTypes.BOOLEAN, required: true, defaultValue: true},
});
const Role = sequelize.define("role", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    value: {type: DataTypes.STRING, unique: true}
});
const Personal = sequelize.define("personal", {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
    gender: {type: DataTypes.INTEGER, required: true},
    height: {type: DataTypes.INTEGER, required: true},
    birth_day: {type: DataTypes.FLOAT, required: true},
    start_train: {type: DataTypes.FLOAT, required: true},
})
const Parameter = sequelize.define("parameter", {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
    weight: {type: DataTypes.INTEGER, required: true},
    shoulder_bust: {type: DataTypes.INTEGER, required: true},
    shoulder_girth: {type: DataTypes.INTEGER, required: true},
    shoulder_hips: {type: DataTypes.INTEGER, required: true},
    shoulder_hip: {type: DataTypes.INTEGER, required: true},
    date_metering: {type: DataTypes.FLOAT, required: true},
})
const Schedule = sequelize.define('schedule', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
    date: {type: DataTypes.FLOAT, required: true},
    description: {type: DataTypes.STRING, required: false},
    time_start: {type: DataTypes.STRING, required: false},
    time_duration: {type: DataTypes.STRING, required: false},
})
const Photo = sequelize.define('photo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
    file_name: {type: DataTypes.STRING, unique: false},
    date: {type: DataTypes.FLOAT, required: true},
    angle: {type: DataTypes.STRING, required: false},
    type: {type: DataTypes.INTEGER, required: true},
})
const Feed = sequelize.define('feed', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement:true},
    protein: {type: DataTypes.STRING, required: false},
    fat: {type: DataTypes.STRING, required: false},
    carbohydrates: {type: DataTypes.STRING, required: false},
    recommendation: {type: DataTypes.STRING, required: false},
})

Role.hasMany(User)
User.belongsTo(Role)

User.hasOne(Personal)
Personal.belongsTo(User)

User.hasMany(Parameter)
Parameter.belongsTo(User)

User.hasMany(Schedule)
Schedule.belongsTo(User)

User.hasMany(Photo)
Photo.belongsTo(User)

User.hasOne(Feed)
Feed.belongsTo(User)

module.exports = {
    User,
    Role,
    Personal,
    Parameter,
    Schedule,
    Photo,
    Feed,
}
