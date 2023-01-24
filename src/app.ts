import express, {Application, Request, request, Response, response} from "express"

const app: Application = express()
app.use(express.json())

app.post("/", (request: Request, response: Response)=>{
    return response.send("deu certo")
})

app.listen(3000, ()=>{
    console.log("Server is running")
})