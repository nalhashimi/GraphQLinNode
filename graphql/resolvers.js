
const user = require("../models/user");

module.exports = {
   
    getStatus: async function ({}, req) {
        return {status: 'status got'};
    },

    createUser: async function({userInput}, req) {
        return {name: 'status got'};
    }
}