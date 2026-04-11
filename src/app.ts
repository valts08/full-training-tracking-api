import express from 'express'
import '../src/config/index.ts'
import userRouter from '../src/routes/user.ts'
import workoutRouter from '../src/routes/workout.ts'
import exerciseRouter from '../src/routes/exercise.ts'

const app = express()

app.use(express.json())

// add logging middleware

app.use('/user', userRouter)
app.use('/workout', workoutRouter)
app.use('/exercise', exerciseRouter)

// add global error handler

app.listen(process.env.PORT || 3000, () => {
    console.log('connecting to server')
})