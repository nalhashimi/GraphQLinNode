const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    resetToken: {
        type: String,
        required: false
    },
    tokenExpirationDate: {
        type: Number,
        required: false
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
    const myUser = mongoose.model("User", userSchema);
    const hashedPassword = await userSchema.encryptPassword(userPassword);
    const newUserOne = new myUser ({name: userName, email: userEmail, password: hashedPassword});
    try {
        await newUserOne.save();
        console.log(newUserOne._id);
    }
    catch(error) {
        console.error(error);
    }
    return {id: newUserOne._id.toString()}
}

userSchema.statics.loginUser = async function (email, password) {
    
    const foundUser = await this.findOne({email: email});
    if(!foundUser) {
        const error = new Error("User not found");
        error.code = 401;
        throw error;
    }


  //async function checkUser(username, password) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, foundUser.password);

    if(!match) {
        const error = new Error("Incorrect Password");
        error.code = 401;
        throw error;
    }

    const token = jwt.sign({email: foundUser.email, name: foundUser._id.toString()}, 'bunnywabbit')
    

    return {token: token, userId: foundUser._id.toString()};
}

userSchema.statics.createResetPasswordToken = async function (email) {

    const foundUser = await this.findOne({email: email});
    if(!foundUser) {
        const error = new Error("No account using this email has been found");
        error.code = 401;
        throw error;
    }

    const {
        randomBytes
      } = await import('crypto');
      
    const resetToken = await randomBytes(32);
    const tokenExpirationDate = await Date.now() + 144000000;  ///date.now creates int

    try {
        foundUser.resetToken = resetToken.toString('hex'); 
        foundUser.tokenExpirationDate = tokenExpirationDate;   
        foundUser.save();
    }
    catch(error) {
        console.log(error); 
    }

    return {isTrue: true};
 
}

userSchema.statics.resetUserPassword = async function (resetToken, newPassword) {
    const dateNow = await Date.now();
    const foundUser = await this.findOne({resetToken: resetToken});
    const newHashedPassword = await userSchema.encryptPassword(newPassword);

    try {
        if (foundUser.tokenExpirationDate >= dateNow)
        {
        foundUser.password = newHashedPassword;
        foundUser.save();
        }
        else {
            console.log("bananas");
            return {isTrue: false};
        }
        
    } 
    catch(error) {
        console.log(error);
    }

    return {isTrue: true};
}


module.exports = mongoose.model("User", userSchema);


//**Reset Password Flow**
//Click reset password button. it takes them to a new view
//Provides to us an email which we use to search DB for user
//Temporary token can be saved to user profile in DB
//we send email to user
//User clicks link from email.
//We retrieve that token and check it's expiration
//Redirect user to change password view if token is valid
//save new password and redirect to login screen
