import express from 'express';
import router from "./routes/router";
import dotenv from "dotenv";
import cors from 'cors';


//config
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5001', 10); 

app.use(cors());

app.use(express.static("public"));
app.use(express.static("node_modules"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes settings
app.use("/", router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
