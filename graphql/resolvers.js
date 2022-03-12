
const User = require("../models/user");

module.exports = {
   
    getStatus: async function ({}, req) {
        return {status: 'status got'};
    },

    createUser: async function({userInput}, req) {
        const user = new User({
            name: userInput.name,
            email: userInput.email,
            password: userInput.password
        });
        await user.save();

        const createdUser = await user.save();
 console.log({...user._doc, _id: createdUser._id.toString() });

   return {name: userInput.name, email: userInput.email, password: userInput.password};
    }
}