import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"
import userRoutes from "./routes/user2.js"
import buildingRoutes from "./routes/building.js"
import floorRoutes from "./routes/floor.js"
import unitRoutes from "./routes/unit.js"

// Set up bodyParser and other middleware
// CONFIGURATION
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


// data imports
// import User from './models/User.js';
import {dataProduct, dataProductStat, dataUser, userData2} from './data/index.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import User2 from './models/User2.js';
// ROUTES
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);
app.use("/users",userRoutes);
app.use("/building",buildingRoutes);
app.use("/floor",floorRoutes);
app.use("/unit",unitRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'user' && password === 'pass') {
    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Invalid credentials
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Betelhem Property Management System',
    version: '1.0.0',
    description: 'Betelhem Property Management System is a software application designed to help property management companies and landlords manage their properties, tenants, and rental payments. It includes features such as tenant screening, lease management, rent collection, maintenance requests, financial reporting, and more. The system allows property managers to easily organize and maintain all of their properties and tenants in one centralized location, providing them with a better overall view of their business. The system is designed to streamline property management operations, saving time and reducing errors that can lead to financial losses or legal issues.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ],
  security: {
    jwt: []
  },
  components: {
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// MONGOOSE SETUP

const PORT =process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server running on port: ${PORT}
    http://localhost:5000/api-docs/
    `));
      // User2.insertMany(userData2);
      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);
}).catch((error)=>{
    console.log(`${error} Didn't connect!`);
})
