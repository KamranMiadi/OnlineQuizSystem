/*jshint esversion: 8 */
let DataBase = require('../../../db/db.js');
let db = new DataBase();
async function routes(fastify, options) {
    fastify.post('/answers', async (request, reply) => {
        db.addToTable('teachersTable', request.data)
            .then(result => {
                console.log('----------reult--------', result);
                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({
                        message: 'success',
                        data: result
                    });
            }).fail(err => {
                console.log('---------err---------', err);
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({
                        code: 'teacherSignUpError',
                        error: err
                    });
            });
    });
}
module.exports = routes;