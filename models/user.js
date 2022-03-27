const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

//research static function in nodejs
userSchema.encryptPassword = async function (password) {
    try{
    var salt = await bcrypt.genSalt(10);
    
    var hash = await bcrypt.hashSync(password, salt);
    console.log(hash);
    return hash;
    }
    catch(error) {
        console.error(error);
    }
    
    
};

userSchema.statics.createUser = async function (userName, userEmail, userPassword) {

    const myUser =mongoose.model("User", userSchema);
    const hashedPassword = await userSchema.encryptPassword(userPassword);
    const newUserOne = new myUser ({name: userName, email: userEmail, password: hashedPassword});


    console.log(myUser)
    await newUserOne.save();
}

userSchema.loginUser = async function (email, password) {

    const foundUser = await User.findOne({email: email});
    console.log(foundUser);


    // bcrypt.compare(password, )
}




module.exports = mongoose.model("User", userSchema);
