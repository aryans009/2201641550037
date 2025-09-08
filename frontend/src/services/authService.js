import apiClient from '../api/axiosConfig';

const getAuthToken = async () => {
  try {
    const credentials = {
        email: "2k22.csiot.2211726@gmail.com",
        name: "aryan singh",
        rollNo: "2201641550037",
        accessCode: "sAWTuR",
        clientID: "57d4c721-e868-4bc9-84dc-f8e0feb907b6",
        clientSecret: "TaacvQFnjXYSKeDx"
    }

    const response = await apiClient.post('/auth', credentials);

    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
      alert('Authentication successful!');
    }
    return response.data;
  } catch (error) {
    alert('Authentication failed! Check credentials.');
    console.error('Authentication failed:', error);
  }
};

export { getAuthToken };