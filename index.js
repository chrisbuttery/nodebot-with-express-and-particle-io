import five from 'johnny-five'
import Spark from 'spark-io'
import express from 'express'
import socketio from 'socket.io'

/**
 * Set up express server:
 * - tell the server to look in '/public' for templates/assets
 * - give it a route of '/' to reference '/public/index.html'
 * - tell it to list to port 3000
 */

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
})

server.listen(app.get('port'))

/**
 * Set up our Spark board
 * Assign our Spark token and device ID to the board
 * Specific the port our device is plugged into.
 *
 * Spark will usually do this automatically, but we can insist
 */

const board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID_2
  })
})

/**
 * socket.io
 * Set up a listener for 'connection'.
 * Once a connection is made, listen out for a 'toggle' event.
 * on 'toggle' set the incoming `data` to our desired pin ('D7')
 */

const io = socketio.listen(server)
const pin = 'D7'

io.on('connection', function (socket) {
  // on 'toggle' write our data to the pin
  socket.on('toggle', function (data) {
    board.digitalWrite(pin, data)
  })
})
