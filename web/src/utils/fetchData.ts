import axios from 'axios';

export const fetchData = async (url, setData) => {
  try {
    const { data } = await axios.get(url);
    setData(data);
  } catch (error) {
    setData({ error });
    throw new Error(error);
  }
};
