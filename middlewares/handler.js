export const errHandler = (err) => { 
  console.log(err.message, err.code)
  let errors = {email:'',password:''}

  //dublicate(mongo err)
  if(err.code===11000){
    errors.email="this email alredy register"
  }

  //email error
 if (err.message === 'incorrect email') {
    errors.email = "this email is incorrect"
  }

  //password error
  if (err.message === 'incorrect password') {
    errors.password = "this password is incorrect"
  }

  //register error
  if (err.name === 'ValidationError') {
    Object.values(err.errors).forEach(error => {
    errors[error.path] = error.message; 
  })
}
  return errors;
}