import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'

const register = async (req , res ,next) => {
try {
  
    const {username , email , password} = req.body;
  
    const userExists = await User.findOne({username})
    if (userExists) {
      res.json({ msg: "Username Already used " , status : false})
    }
  
    const emailExists = await User.findOne({email})
    if (emailExists) {
      res.json({ msg: "email Already used " , status : false})
    }
  
    const hashedPassword = await bcrypt.hash(password , 10)
    const user = await User.create({
      username , email , password : hashedPassword
    });
    delete user.password;
    return res.json( {status: true , user})
} catch (error) {
  next(error)
}

}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    // Remove password before sending the user object in response
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res.json({ status: true, user: userWithoutPassword , msg: "User LoggedIn successfully"});
  } catch (error) {
    next(error);
  }
};


export {
  register ,
  login
}