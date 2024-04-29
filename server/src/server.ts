import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { connectToDatabase } from "./db/database"
import { clientRouter } from "./routes/client.routes";


// Carga variables de entorno desde el archivo .env, donde está configurado ATLAS_URI
dotenv.config();


// const { ATLAS_URI } = process.env 
const ATLAS_URI = 'mongodb+srv://adriancoronel:miryam2003@cluster0.d5ue7rl.mongodb.net/mean-stack?retryWrites=true&w=majority' 
const port = 5200;

if (!ATLAS_URI) {
  console.error("No ATLAS_URI environment variable has been defined in config.env");
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {

    const app = express();
    app.use(cors());

    // Router
    app.use("/clients", clientRouter)

    // start the Express server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}...`);
    });

  })
  .catch((err) => console.error(err));