import express from "express"
import config from "./config.js";
import handlebars from "express-handlebars";
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/views', viewsRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use('/static', express.static(`${config.DIRNAME}/public`));

const httpServer = app.listen(config.PORT, () => {console.log(`Server running on port: ${config.PORT}`);});

const socketServer = new Server(httpServer);
app.set('socketServer', socketServer)

socketServer.on('connection', socket => {
console.log(`Connecting client, id ${socket.id} from ${socket.handshake.address}`);
});
