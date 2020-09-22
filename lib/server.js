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
fastify.register(require('./app/teacher/teacherSignUp'));
//fastify.register(require('./app/teacher/teacherLogin'));
// fastify.register(require('./app/teacher/addStudent'));
// fastify.register(require('./app/teacher/addQuiz'));
// fastify.register(require('./app/teacher/getStudent'));
// fastify.register(require('./app/teacher/getQuiz'));
// fastify.register(require('./app/teacher/startQuiz'));
// fastify.register(require('./app/teacher/addStudent'));
// fastify.register(require('./app/teacher/getStudentsScore'));


// //student APIs
// fastify.register(require('./app/student/studentLogin'));
// fastify.register(require('./app/student/submitAnswers'));
// fastify.register(require('./app/student/getQuizzes'));
// fastify.register(require('./app/student/getQuizScore'));

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