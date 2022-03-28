
const User = require("../models/user");

module.exports = {
   
    getStatus: async function ({}, req) {
        return {status: 'status got'};
    },

    createUser: async function({userInput}, req) {

        // hashedPassword = User.encryptPassword(userInput.password);
        // console.log(hashedPassword);
        // const user = new User({
        //     name: userInput.name,
        //     email: userInput.email,
        //     password: userInput.password
        // });
        // await user.save();

        // const createdUser = await user.save();

        // return {name: userInput.name, email: userInput.email, password: userInput.password};

        return await User.createUser(userInput.name, userInput.email, userInput.password);

    },

    loginUser: async function ({email, password}) {
        let token;
        try {
            token = await User.loginUser(email, password);
        } catch (error) {
            console.error(error);
        }
        return token;
    }
}
