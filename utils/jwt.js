import jwt from 'jsonwebtoken'

const maxAge = '20s'
const createToken =(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:maxAge})
}
export default createToken