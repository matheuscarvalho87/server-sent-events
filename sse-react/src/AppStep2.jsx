import { useEffect, useState } from 'react';
import './App.css'

function AppStep2() {
  const [notification, setNotification] = useState([])

  useEffect(() => {
    const subscription = new EventSource("http://localhost:3000/sse-notifications-s2?userId=12345");
    
    subscription.onmessage = (event) => {
      console.log('RECEBEU EVENT',event)
      const parsedData = JSON.parse(event.data);
      setNotification(oldNotifications => [...oldNotifications, parsedData])
    };
    
    return () => subscription.close();
  }, []);

  return (
    <>
      <h1>Server Sent Event - By Matheus Carvalho</h1>
      <div className="card">
          Notifications
        <div className='indicator'>
          <div className='noti_count' role="status">{notification.length}</div>
        </div>
      </div>
      {notification.map((item)=>(<><p key={item.notification}>{item.notification}</p></>))}
    </>
  )
}

export default AppStep2
