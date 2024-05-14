
let CLIENTS_REGISTERED = []
export function registerClient(userId, response) {
  const newClient = {
    userId,
    response,
    clientId: crypto.randomUUID()
  }
  CLIENTS_REGISTERED.push(newClient)
  console.log('CLIENTES REGISTRADOS', CLIENTS_REGISTERED)

  return { newClient }
}


export function removeClient(clientId) {
  const updatedList = CLIENTS_REGISTERED.filter(item => item.clientId !== clientId)
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