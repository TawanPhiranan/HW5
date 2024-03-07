import express from "express";
import bodyParser from "body-parser";
import { router as movie } from "./api/movie";
import { router as person} from "./api/person";
import { router as creators} from "./api/creators";
import { router as stars } from "./api/stars";

export const app = express();
// app.use("/", (req, res) => {
//     res.send("Hello World!!!");
// });



app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/movie", movie);
app.use("/person", person);
app.use("/creators", creators);
app.use("/stars", stars);

