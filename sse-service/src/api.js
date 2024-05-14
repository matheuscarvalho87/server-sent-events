import express from "express";
import { registerClient, removeClient, sendNotification } from "./client-domain.js";

const app = express()

app.get('/sse-notifications-s1', (_req, res, _next) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', // not necessary. just to not configure cors
    'Content-type': 'text/event-stream', // content type to use SSE
    Connection: 'keep-alive',// allowing TCP connection to remain open for multiple HTTP requests/responses
    'Cache-Control': 'no-cache'
  }
  res.set(headers)
  //problema: como que eu vou receber uma informação dinâmica? eventos? como envio isso para o cliente?
  const interval = setInterval(() => {
    const randomNum = Math.floor(Math.random() * 100);
    res.write(`data: ${JSON.stringify({ notification: `EU SOU UMA NOTIFICAÇÃO ${randomNum}` })}\n\n`); // ENVIO DE UMA STRING
  }, 2000);

  res.on("close", () => {
    clearInterval(interval);
    console.log('CLIENTE FECHOU')
    res.end();
  });
})
//CRIAR/DELETAR CLIENTE
app.get('/sse-notifications-s2', (request, response, _next) => {
  const headers = {
    'Content-type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  }
  response.writeHead(200, headers)


  const { userId } = request.query

  registerClient(userId, response)

  response.on("close", () => {
    removeClient(userId)
    response.end();
  });
})
//curl -X POST http://localhost:3000/send-notification
app.post('/send-notification', (req, res) => {
  const mockNotification = {
    userId: '12345',
  }
  sendNotification(mockNotification.userId)
})

app.listen(3000, () => {
  console.log('Ta rodando')
})