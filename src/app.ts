import '../src/config/index.js'
import express from 'express'
import authRouter from '../src/routes/auth.js'
import userRouter from '../src/routes/user.js'
import workoutRouter from '../src/routes/workout.js'
import exerciseRouter from '../src/routes/exercise.js'
import globalErrorHandler from '../src/middleware/globalErrorHandler.js'
import unknownRouteHandler from './middleware/unknownRouteHandler.js'
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

// make sure all zod validation happens at the controller layer, not the service layer
// move it up a layer wherever necessary
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/workout', workoutRouter)
app.use('/exercise', exerciseRouter)

app.use(unknownRouteHandler)
app.use(globalErrorHandler)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})