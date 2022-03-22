
const User = require("../models/user");

module.exports = {
   
    getStatus: async function ({}, req) {
        return {status: 'status got'};
    },

    createUser: async function({userInput}, req) {

        hashedPassword = User.encryptPassword(userInput.password);
        console.log(hashedPassword);
        const user = new User({
            name: userInput.name,
            email: userInput.email,
            password: userInput.password
        });
        await user.save();

        const createdUser = await user.save();

        return {name: userInput.name, email: userInput.email, password: userInput.password};

    }
}

//mutation {
    // createUser(userInput: {name: "Test Name2", email: "email2", password: "password2"}) {
    //     name
    //     email
    //   }