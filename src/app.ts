import express from 'express'
import '../src/config/index.ts'
import userRouter from '../src/routes/user.ts'
import workoutRouter from '../src/routes/workout.ts'
import exerciseRouter from '../src/routes/exercise.ts'
import globalErrorHandler from '../src/middleware/globalErrorHandler.ts'
import unknownRouteHandler from './middleware/unknownRouteHandler.ts'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(express.json())

app.use(helmet())
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use('/user', userRouter)
app.use('/workout', workoutRouter)
app.use('/exercise', exerciseRouter)

app.use(globalErrorHandler)
app.use(unknownRouteHandler)

app.listen(process.env.PORT || 3000, () => {
    console.log('connecting to server')
})