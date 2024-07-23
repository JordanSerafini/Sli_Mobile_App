import express from 'express';
import router from "./routes/router";
import dotenv from "dotenv";
import cors from 'cors';
import errorMiddleware from '../middlewares/errorMiddleware';

//config
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5002', 10); 

const corsOptions = {
  origin: "*",  
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(express.static("node_modules"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes settings
app.use("/", router);

app.use(errorMiddleware);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
