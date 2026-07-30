import '../src/config/index.ts'
import express from 'express'
import authRouter from '../src/routes/auth.ts'
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