import express from 'express'
import routesUser from '../app/routes/user'
import routesPost from '../app/routes/post'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routesUser)
app.use(routesPost)

app.listen(3333)
