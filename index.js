import five from 'johnny-five'
import Particle from 'particle-io'
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
 * Set up our Particle board
 * Assign our Particle token and device ID to the board
 *
 * Optional:
 * Specific the port our device is plugged into:
 * port: process.argv[2]
 *
 * Particle will usually do this automatically, but we can insist
 * % babel-node index.js /dev/cu.usbmodem1421
 */

const board = new five.Board({
  io: new Particle({
    token: process.env.PARTICLE_TOKEN,
    deviceId: process.env.PARTICLE_DEVICE
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
