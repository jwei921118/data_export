const {
    Service
} = require('egg');

const xlsx = require('node-xlsx');

const fs = require('fs');

const path = require('path');


const {
    parkingData
} = require('../constant/exportField');

/**
 *
 * 导出服务
 * @class ExportService
 * @extends {Service}
 */
class ExportService extends Service {
    /**
     *
     * 导出excl
     * @param {*} data
     * @returns
     * @memberof ExportService
     */
    async exportsxls(data) {
        let {
            ctx,
            app
        } = this;

        let {
            Op
        } = app.Sequelize;

        try {
            const result = await ctx.model.ParkingData.findAll({
                where: {
                    parkingno: data.parkingno,
                    id: {
                        [Op.lte]: 50
                    }
                }
            });
            // console.log(result);
            if (result && result instanceof Array) {

                let arr = this.exportParkingData(result);
                let expData = [{
                    name: data.parkingno,
                    data: arr
                }];
                let buffer = xlsx.build(expData);

                fs.writeFileSync('./app/public/parkingData.xls', buffer);

                // fs.writeFileSync('./parkingData.xls', buffer, {
                //     encoding: 'utf8'
                // });

                // fs.writeFile('./app/public/parkingData.xls', buffer, (err) => {
                //     if (err) {
                //         throw err;
                //     }
                // })
                return {
                    code: 0,
                    data: arr
                }
            }

        } catch (error) {
            console.log(error)
            return {
                code: 1,
                msg: '数据库错误'
            }
        }
    }

    /**
     *
     * 
     * @memberof ExportService
     */
    exportParkingData(arr) {
        return this.gnData(arr, parkingData);
    }

    /**
     *
     * 生成arr
     * @memberof ExportService
     */
    gnData(arr, config) {
        let d = arr.map((v) => {
            return JSON.parse(v.data);
        });
        let xlsArr = [];
        d.forEach((v) => {
            let r = [];
            config.forEach((val) => {
                r.push(v[val.key]);
            });
            xlsArr.push(r);
        });
        xlsArr.unshift(config.map(v => v.name));
        return xlsArr;
    }
}

module.exports = ExportService;