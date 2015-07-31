#Controlling nodebots with the web

An example [express](http://expressjs.com/ "express") app that allows you to toggle an LED on your
Spark [Photon](https://store.particle.io/ "Get a Photon!") board via a button on a web page.  

![alt tag](https://github.com/chrisbuttery/nodebot-with-express-and-spark-io/blob/master/photon.png)

We use [express](http://expressjs.com/ "express") to create a server and render our web page. We
then use [socket.io](http://socket.io/ "socket.io") to listen for connections and an event on click
of the button. Once clicked we tell the Photon what to do via the [Spark.io](https://github.com/rwaldron/spark-io "Spark.io plugin for Johnny-Five") plugin for [Johnny-Five]("https://github.com/rwaldron/johnny-five" "Johnny-Five").

This example was written using a Spark Photon, however could be used with other microcontrollers like the arduino. You'll most likely just need to swap out the reference to the LED pin, as well as how the johnny-five board was initialised.

##Requirements

Make sure you've flashed your Photon with the [voodoospark](https://github.com/voodootikigod/voodoospark "voodoospark") firmware.

It is also recommended that you [store your Spark token/device ID in a dot file](https://github.com/rwaldron/spark-io#getting-started) like `.sparkrc` so they can be accessed as properties of process.env.

##Usage

Install the dependencies:

```
% npm install
```

Because I'm a slave to ES6, you'll need to make sure you have
babel installed:

```
% npm install -g babel
```

Run the example:

```
% babel-node index.js
```

Visit [localhost:3000](http://localhost:3000).

Now your robot will be instructed **kill all humans**.
