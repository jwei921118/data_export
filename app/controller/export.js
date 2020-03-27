'use strict';

const Controller = require('egg').Controller;

class ExportController extends Controller {
    /**
     *
     *
     * @memberof ExportController
     */
    async exportsxls() {
        const {
            ctx,
            service
        } = this;

        const data = ctx.request.body;
        console.log(data)
        if (!data.parkingno) {
            ctx.body = {
                code: 1,
                msg: '参数parkingno缺失'
            }
        }
        const result = await service.export.exportsxls(data);
        ctx.body = result;
    }
}

module.exports = ExportController;