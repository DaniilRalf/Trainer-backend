const {
    Role,
    User,
    Personal,
    Parameter,
    Schedule
} = require('../../models/models');

const bcrypt = require('bcryptjs')
const {all} = require("express/lib/application");

const root = {

    createClient: async ({input}) => {
        const userSearch = await User.findOne({where: {username: input.username}});
        if (userSearch){
            return new Error('Пользователь c таким ником уже существует');
        }
        const hashPassword = await bcrypt.hash(input.password, 3)
        const dataUser = {
            username: input.username,
            first_name: input.first_name,
            last_name: input.last_name,
            password: hashPassword,
        };
        const dataPersonal = {
            gender: input.personal.gender,
            height: input.personal.height,
            birth_day: input.personal.birth_day,
            start_train: input.personal.start_train,
        };
        const userItem = await User.create(dataUser);
        const personalItem = await Personal.create(dataPersonal);
        const searchRole = await Role.findOne({where: {id: input.roleId}});
        await userItem.setPersonal(personalItem);
        await searchRole.addUsers([userItem]);
        return {
            username: input.username,
        }
    },

    eventWithParameterClient: async ({input}) => {
        if (input.parameters.event === 'add') {
            /** Create new item Parameter for user*/
            const userSearch = await User.findOne({where: {id: input.id}})
            if (!userSearch){
                return new Error('Пользователя не существует')
            }
            const dataPersonal = {
                weight: input.parameters.weight,
                shoulder_hips: input.parameters.shoulder_hips,
                shoulder_hip: input.parameters.shoulder_hip,
                shoulder_girth: input.parameters.shoulder_girth,
                shoulder_bust: input.parameters.shoulder_bust,
                date_metering: input.parameters.date_metering
            };
            const parametersItem = await Parameter.create(dataPersonal)
            await userSearch.addParameters([parametersItem]);
            return {id: input.id}
        }
        if (input.parameters.event === 'update') {
            /** Update item Parameter*/
            const parameterSearch = await Parameter.findOne({where: {id: input.parameters.id}})
            if (!parameterSearch){
                return new Error('Параметер не найден не существует')
            }
            for (let [key, value] of Object.entries(input.parameters)) {
                if (key !== 'id' && value) {
                    await parameterSearch.update({[key]: value})
                }
            }
            return {id: input.id}
        }
        /** Remove new item Parameter for user*/
        if (input.parameters.event === 'remove') {
            const parameterSearch = await Parameter.findOne({where: {id: input.id}})
            if (!parameterSearch){
                return new Error('Параметер не найден')
            }
            await Parameter.destroy({where: {id: parameterSearch.id}})
            return {id: input.id}
        }
    },

     updatePersonalClient: async ({input}) => {
        const personalSearch = await Personal.findOne({where: {id: input.id}})
        if (!personalSearch){
            return new Error('Персональные данные не найдены')
        }
        for (let [key, value] of Object.entries(input)) {
            if (key !== 'id' && value) {
                await personalSearch.update({[key]: value})
            }
        }
        return {id: input.id}
    },

    getAllClients: async () => {
        const allClients = await User.findAll({
            where: {roleId: 1},
            include: [Role, Personal, Parameter, Schedule],
        });
        // TODO: потом стоит добавить отдельную строку для исходного пароля чтобы админ мог его видеть
        // allClients.forEach(client => {
        //     const validPassword = bcrypt.compareSync(
        //         client.password,
        //         userSearch.password,
        //     )
        //     client.password =
        // })
        return allClients;
    },

    createTrainingDays: async ({input}) => {
        const userSearch = await User.findOne({where: {id: input.id}});
        if (!userSearch){
            return new Error('Пользователя не существует')
        }
        for (const schedule of input.schedules) {
            const dataSchedules = {
                date: schedule.date,
                description: schedule.description,
                time_start: schedule.time_start,
                time_duration: schedule.time_duration,
            }
            const scheduleItem = await Schedule.create(dataSchedules)
            await userSearch.addSchedules([scheduleItem])
          }
        return {id: input.id}
    }

}
module.exports = root
