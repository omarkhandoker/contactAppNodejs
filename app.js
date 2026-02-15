import express from 'express'
const app = express()
// dbConnection
import DBconnect from './DB/dbConnect.js'
// Import Router
import router from './route/router.js'
// Session 
import session from 'express-session'
//Csrf Token & Cookies
import cookie from "cookie-parser"



app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized : false
}))



// Global Router 
app.use((req, res, next) => {
  if (!req.session.view) {
    req.session.view = {}
  }

  const route = req.path
  req.session.view[route] = (req.session.view[route] || 0) + 1;
  
  next()
})

app.use(express.urlencoded({extended : false}))
app.use( express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookie())

app.use(router)

// DB_Call
DBconnect()

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});


