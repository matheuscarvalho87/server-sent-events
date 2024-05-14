
let CLIENTS_REGISTERED = []
export function registerClient(userId, response) {
  CLIENTS_REGISTERED.push({
    userId, response
  })
  console.log('CLIENTES REGISTRADOS', CLIENTS_REGISTERED)
}


export function removeClient(userId) {
  const updatedList = CLIENTS_REGISTERED.filter(item => item.userId !== userId)
  CLIENTS_REGISTERED = updatedList
  console.log('CLIENTES ATUALIZADOS', CLIENTS_REGISTERED)
}

function filterClient(userId) {
  const clients = CLIENTS_REGISTERED.filter((item) => item.userId === userId)
  if (!clients) {
    return null
  }
  return clients
}
export function sendNotification(userId) {
  const clients = filterClient(userId)
  if (!clients) {
    return null
  }
  clients.forEach((client => {
    client.response.write(`data: ${JSON.stringify({ notification: `Notificação para o cliente ${userId}` })}\n\n`);
  }))
}