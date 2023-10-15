const fs = require('fs')
const path = require('path')
const {Photo} = require("../models/models")
const schedule = require('node-schedule')

module.exports = async() => {
    try {
        const rule = new schedule.RecurrenceRule()
        rule.date = 10 /** День месяца для запуска функции: 10 */

        schedule.scheduleJob(rule, () => {
            const directoryPath = path.join(__dirname, '../', 'static');
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.log('Unable to read directory:', err)
                    return
                }
                /** получение всех файлов из БД */
                findActualPhotos().then((data) => {
                    const actualPhotos = []
                    data.forEach(item => {
                        actualPhotos.push(item?.file_name)
                    })

                    /** проходимся по всем файлам который есть в Static и удаляем не используемые */
                    files.forEach(fileInStatic => {
                        const filePath = path.join(directoryPath, fileInStatic);
                        const fileStats = fs.statSync(filePath);
                        if (!actualPhotos.includes(fileInStatic) && fileStats.isFile()) {
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.log(`Error deleting file ${fileInStatic}:`, err);
                                    return;
                                }
                                console.log(`Deleted file: ${fileInStatic}`);
                            });
                        }
                    })
                })
            })
            const findActualPhotos = async() => {
                return await Photo.findAll()
            }
        })

    } catch (e) {
        console.log('Unknown error:', e)
    }
}
