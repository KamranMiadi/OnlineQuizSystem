/*jshint esversion: 6 */
let sqlite = require('sqlite3').verbose();
const dbName = 'OQSdb';
let teachersTableName = 'teachersTable';
let studentsTableName = 'studentsTable';
let quizzesTableName = 'quizzesTable';
let answersTableName = 'answersTable';
let db = new sqlite.Database(`${dbName}.db`, (err) => {
    if (err) {
        console.log('Could not connect to database', err);
    }
});
// create teachers table
db.run(`CREATE TABLE ${teachersTableName}(email TEXT PRIMARY KEY, password TEXT)`);
db.run(`CREATE TABLE ${quizzesTableName}(teacherEmail TEXT , name TEXT PRIMARY KEY, time INTEGER, questions TEXT,key TEXT)`);
db.run(`CREATE TABLE ${studentsTableName}(email TEXT PRIMARY KEY, password TEXT)`);
db.run(`CREATE TABLE ${answersTableName}(studentEmail TEXT, studentAnswers TEXT, quizId INTEGER, PRIMARY KEY (studentEmail, quizId))`);

db.close((err) => {
    if (err) {
        console.error('error in createTable------------------->>', err.message);
    }
});