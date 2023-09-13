import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [responseDataList, setResponseDataList] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);

  const getDataWeb = async () => {
    const apiUrl = `https://backend-yakkai.onrender.com/CheckServer`; 
    try {
      const response = await axios.get(apiUrl);
      const newData = {
        data: response.data,
        time: new Date(),
      };

      // ตรวจสอบว่าข้อมูลใหม่มีวันที่หลังจากข้อมูลตัวก่อนหน้าหรือไม่
      if (
        responseDataList.length === 0 ||
        newData.time > lenresponseDataList[responseDataListgth - 1].time
      ) {
        setResponseDataList((prevDataList) => [...prevDataList, newData]);
        console.log('ส่งแล้วครับ');
      } else {
        console.log('ข้อมูลใหม่ไม่มีวันที่หลังจากข้อมูลตัวก่อนหน้า');
      }
    } catch (error) {
      console.log('พบข้อผิดพลาดในการดึงข้อมูลเว็ปไซต์: ' + error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getDataWeb();
    }, 140000); 

    return () => clearInterval(intervalId);
  }, [responseDataList]);

  return (
    <div style={{height:'100vh'}}>
      <h1>Program Check Server Backend</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
          padding: '10px',
          overflowY: 'hide',
          maxHeight: '80vh',
        }}
      >
        {responseDataList.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <p> {item.time.toLocaleString()}</p>
            <p>{JSON.stringify(item.data)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
