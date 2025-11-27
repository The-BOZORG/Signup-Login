import { errHandler } from '../middlewares/handler.js';
import User from '../modles/userModel.js'
import createToken from '../utils/jwt.js';


export const register_get = (req, res) => {
  res.render('register');
};

export const login_get = (req, res) => {
  res.render('login');
};

export const register = async(req,res)=>{
  const {email,password}=req.body
  try{
    const user = await User.create({email,password})
    const token = createToken(user._id)
    res.cookie('jwt',token,{httpOnly:true,maxAge:20 * 1000})
    res.status(200).json({msg:'register success',token: token,user:user._id})
  }catch(err){
    const errors = errHandler(err)
    res.status(400).json({ errors }) 
  }
}


export const login = async(req,res)=>{
  const {email,password}=req.body
  try{
    const user = await User.login(email,password)
    const token = createToken(user._id)
    res.cookie('jwt',token,{httpOnly:true,maxAge:20*1000})
    res.status(200).json({msg:'login success',token: token,user:user._id})
  }catch(err){
    const errors = errHandler(err)
    res.status(400).json({ errors }) 
  }
}

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};


