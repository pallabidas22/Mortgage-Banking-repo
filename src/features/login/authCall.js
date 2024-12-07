import axios from 'axios';

export async function authPost(customerId, password) {
    try {
        const response = await axios.post('http://localhost:5001/customers', {
          customerId,
          password,
        });
        return response.data;
      } catch (error) {
        console.error('Login error:', error);
      }
}

export async function validCustomerId() {
    try {
        const response = await axios.get('http://localhost:5001/customersIdData');
        return response.data;
      } catch (error) {
        console.error('Login error:', error);
      }
}