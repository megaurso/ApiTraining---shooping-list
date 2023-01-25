import express, {Application} from "express"
import { purchaseList } from "./logic"
const app: Application = express()
app.use(express.json())

app.post("/purchaselist", purchaseList)

app.listen(3000, ()=>{
    console.log("Server is running")
})