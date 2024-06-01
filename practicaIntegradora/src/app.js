import express from "express"
import mongoose from "mongoose";
import handlebars from "express-handlebars";

import config from "./config.js";
import initSocket from "./sockets.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

const expressInstance = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);

    const socket = initSocket(expressInstance);
    app.set('socketServer', socket);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRoutes)
    app.use('/static', express.static(`${config.DIRNAME}/public`))
    app.use('/api/products',productRoutes);
    app.use('/api/carts', cartRoutes);
    app.use('/api/user', usersRoutes);
    
    console.log(config.DIRNAME);

    console.log(`Server running on port: ${config.PORT}`);
})






