import axios from 'axios';

const logApiClient = axios.create({
  baseURL: 'http://localhost:3000/api', 
});
const sendLog = async (logData) => {
  try {
    const token = localStorage.getItem('access_token'); 
    
    await logApiClient.post('/logs', logData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('Log sent:', logData.message);
  } catch (error) {
    console.error('Failed to send log:', error);
  }
};
export { sendLog };