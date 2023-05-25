import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify()

app.register(require('@fastify/multipart'))

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

// HTTP Method: GET, POST, PUT, PATCH, DELETE
app.register(cors, {
  origin: ['http://localhost:3000']
})


app.register(jwt, {
  secret: '4387gufn348g92374tn3o4fm43898t7u4h87awh373h28fwe8fjk9f384jfm3498fu',
})


app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🎉 HTTP server running on http://localhost:3333')
  })