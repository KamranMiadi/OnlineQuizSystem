/*jshint esversion: 6 */



const fastify = require('fastify')({
  logger: true
});
const path = require('path');

// Enable the fastify CORS plugin
fastify.register(require('fastify-cors'), {
  origin: '*',
  credentials: true
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
});

// register APIs here ***********************************

//teacher APIs
fastify.register(require('./teacher/teacherSignUp'));
fastify.register(require('./teacher/teacherLogin'));
fastify.register(require('./teacher/addStudent'));
fastify.register(require('./teacher/addQuiz'));
fastify.register(require('./teacher/getStudent'));
fastify.register(require('./teacher/getQuiz'));
fastify.register(require('./teacher/startQuiz'));
fastify.register(require('./teacher/addStudent'));
fastify.register(require('./teacher/getStudentsScore'));


//student APIs
fastify.register(require('./student/studentLogin'));
fastify.register(require('./student/submitAnswers'));
fastify.register(require('./student/getQuizzes'));
fastify.register(require('./student/getQuizScore'));

//********************************************************


fastify.get('/', function (req, reply) {
  reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

fastify.listen(3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});