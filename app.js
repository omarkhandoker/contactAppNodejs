import express from 'express'
const app = express()
// dbConnection
import DBconnect from './DB/dbConnect.js'
// Import Router
import router from './route/router.js'

app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')

app.use(router)

// DB_Call
DBconnect()

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});


