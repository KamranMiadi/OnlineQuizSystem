/*jshint esversion: 6 */


let sqlite = require('sqlite3').verbose();
let q = require('q');
const dbName = 'OQSdb';
class DataBase {

    constructor(dbName) {
        this.dbName = dbName;
        this.db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.log('Could not connect to database', err);
            }
        });
    }

    //adds and entity to table. 
    addToTable(tableName, dataObject) {
        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.error('Could not connect to database----------->', err);
            }

        });
        
        let defered = q.defer();
        db.run(`INSERT INTO ${tableName}${self.makeQueryVariblesString(tableName)}`,
            dataObject,
            function (err) {
                if (err) {
                    console.trace(err.message);
                    db.close((err) => {
                        if (err) {
                            console.error('errorInAddToDB------------->', err);
                        }
                    });
                    defered.reject({
                        code: 'Data exists',
                        message: err
                    });
                }
                db.close((err) => {
                    if (err) {
                        console.error('errorInAddToDB------------->>', err);
                    }
                });
                defered.resolve({
                    message: `A row has been inserted with id: ${this.lastID}`,
                    dataId: this.lastID
                });

            });
        return defered.promise;

    }

    //edits an entity in table
    editDataInTable(tableName, dataObject) {

        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.error('Could not connect to database----------->', err);
            }

        });

        let defered = q.defer();
        db.run(`UPDATE ${tableName} 
        SET ${dataObject.feild} = ? 
        WHERE ${dataObject.expressionFeild} = ?`,
            [dataObject.feildValue, dataObject.expressionFeildValue],
            function (err) {
                if (err) {
                    console.trace(err.message);
                    db.close((err) => {
                        if (err) {
                            console.error('errorInUpdateDB------------->', err);
                        }
                    });
                    defered.reject({
                        code: 'dataNotFound',
                        message: err
                    });
                }
                db.close((err) => {
                    if (err) {
                        console.error('errorInUpdateDB------------->>', err);
                    }
                });
                defered.resolve({
                    message: `A row has been updated.`,
                    dataId: this.changes
                });

            });
        return defered.promise;

    }

    //deletes an entity in table
    deleteDataInTable(tableName, dataObject) {

        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.error('Could not connect to database----------->', err);
            }

        });

        let defered = q.defer();
        db.run(`DELETE  
        FROM ${tableName}
        WHERE ${dataObject.expressionFeild} = ?`,
            [dataObject.expressionFeildValue],
            function (err, row) {
                if (err) {
                    console.trace(err.message);
                    db.close((err) => {
                        if (err) {
                            console.error('errorInDeleteFromDB------------->', err);
                        }
                    });
                    defered.reject({
                        code: 'dataNotFound',
                        message: err
                    });
                }
                db.close((err) => {
                    if (err) {
                        console.error('errorInDeleteFromDB------------->>', err);
                    }
                });
                defered.resolve({
                    message: `data deleted.`,
                    data: this.changes
                });

            });

        return defered.promise;
    }

    //get entity/entities from table 
    getDataFromTable(tableName, dataObject) {

        let self = this;
        let db = new sqlite.Database(`${dbName}.db`, (err) => {
            if (err) {
                console.error('Could not connect to database----------->', err);
            }

        });

        let defered = q.defer();
        db.get(`SELECT *  
        FROM ${tableName}
        WHERE ${dataObject.expressionFeild} = ?`,
            [dataObject.expressionFeildValue],
            function (err, row) {
                if (err) {
                    console.trace(err.message);
                    db.close((err) => {
                        if (err) {
                            console.error('errorInGetFromDB------------->', err);
                        }
                    });
                    defered.reject({
                        code: 'dataNotFound',
                        message: err
                    });
                }
                db.close((err) => {
                    if (err) {
                        console.error('errorInGetFromDB------------->>', err);
                    }
                });
                defered.resolve({
                    message: `data found.`,
                    data: row
                });

            });

        return defered.promise;
    }

    makeQueryVariblesString(tableName) {
        if (tableName == 'teachersTable') {
            return '(email, password) VALUES(? ,?)';
        } else if (tableName == 'quizzesTable') {
            return '(teacherEmail, name, time, questions) VALUES(?, ?, ?, ?)';
        } else if (tableName == 'studentsTalbe') {
            return '(email, password) VALUES(? ,?)';
        } else if (tableName == 'answersTable') {
            return '(studentEmail, studentAnswers, quizId) VALUES(?, ?, ?,)';
        } else return false;
    }
}

module.exports = DataBase;