import express from 'express'
const app = express()
import userRoute from './routes/userRoute.js'
import connectDB from './config/dbconnect.js'
connectDB()
import cookieParser from 'cookie-parser'
import requireAuth from './middlewares/authMiddleware.js'


//middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');


//routes
app.get('/', (req, res) => res.render('home'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.use(userRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`);
})