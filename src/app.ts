import express from 'express'
import '../src/config/index.ts'

const app = express()

app.listen(process.env.PORT || 3000, () => {
    console.log('connecting to server')
})