let DataBase = require('./db.js');
let db = new DataBase('OQSdb');


//add
// console.log('--------add----------');
// db.addToTable('teachersTable', ['kamran@gmail.com', 12345678])
//     .then(res => {
//         console.log('---------res---------', res);
//     })
//     .fail(err => {
//         console.log('----------err--------', err);
//     });

//edit
// console.log('---------edit---------');
// db.editDataInTable('teachersTable', {
//         feild: 'password',
//         feildValue: '87654321',
//         expressionFeild: 'email',
//         expressionFeildValue: 'kamran@gmail.com'
//     })
//     .then(res => {
//         console.log('---------res---------', res);
//     })
//     .fail(err => {
//         console.log('---------err---------', err);
//     });

//get
// console.log('---------get---------');
// db.getDataFromTable('teachersTable', {
//         expressionFeild: 'email',
//         expressionFeildValue: 'kamran@gmail.com'
//     })
//     .then(res => {
//         console.log('---------res---------', res);
//     })
//     .fail(err => {
//         console.log('---------err---------', err);
//     });

//delete
console.log('---------del---------');
db.deleteDataInTable('teachersTable', {
    expressionFeild: 'email',
    expressionFeildValue: 'kamran@gmail.com'
}).then(res => {
    console.log('---------res---------', res);
}).fail(err => {
    console.log('---------err---------', err);
});

console.log('--------all tests done----------');