import express from "express";
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import { Server } from "socket.io";
import productRouter  from "./routes/file-routes/products.route.js";
import cartRouter  from "./routes/file-routes/carts.route.js";
import viewRouter from "./routes/views.routes.js"
import mongoose from "mongoose";
import { messageModels } from "./model/mongo-models/messaje.js";
import ProductRouter from "./routes/db-routes/products.route.js";
import CartsRouter from "./routes/db-routes/carts.route.js"


const app = express();
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + "/Public"))

app.use("/fs/products", productRouter)
app.use("/fs/carts", cartRouter)
app.use("/", viewRouter)
app.use("/realTimeProducts", viewRouter)
app.use("/api/products", ProductRouter)
app.use("/api/carts", CartsRouter)
app.use("/api/productos", ProductRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor con express Puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

const messages = [];
socketServer.on('connection', socket => {
    // Esto lo ve cualquier user que se conecte
    socketServer.emit('messageLogs', messages);



    // aqui vamos a recibir { user: user, message: catBox.value }
    socket.on("message", data => {
      const newMessage = new messageModels({
        user: data.user,
        message: data.message
      });

      newMessage.save()
            .then(() => {
                messages.push(data); 
        // enviamos un array de objetos ---> [{ user: "Juan", message: "Hola" }, { user: "Elias", message: "Como estas?" }]
        socketServer.emit('messageLogs', messages);
    });
  });

    // hacemos un broadcast del nuevo usuario que se conecta al chat
    socket.on('userConnected', data => {
        console.log(data);
        socket.broadcast.emit('userConnected', data.user)
    })


    // Cuando desees cerrar la conexión con este cliente en particular:
    socket.on('closeChat', data => {
        if (data.close === "close")
            socket.disconnect();
    })

})
app.post("/message", async (req, res) => {
    try {
      const messages = await messagesModels.inserMany();
      res.send({ result: "success", payload:messages });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: -1, description: "Error al guardar los mensajes" });
    }
  });

  const URL_MONGO = 'mongodb+srv://silvamatias07:J5DdC6lnaBueAeW7@cluster0.6vafnod.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'
const connectMOngooDb = async () =>{
  try {
    mongoose.connect(URL_MONGO)
    console.log("conectado con exito a MongoDb con Mongoose");
    const db = mongoose.connection;
    await db.createCollection("messages");
  } catch (error) {
    console.log("no se pudo conectara la DB usando Mongose" + error);
    process.exit();
  }
};

connectMOngooDb();