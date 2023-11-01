import axios from "axios";

export const fetchUserIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    if (response.data && response.data.ip) {
      return response.data.ip;
    }
    throw new Error('IP not found in response data');
  } catch (error) {
    console.error('Error fetching user IP:', error);
    return null;
  }
};

export const formatNumber = (value) => {
  return Number(value).toLocaleString();
}

export const isMobile = () => {
  return window.innerWidth <= 800; 
}
 