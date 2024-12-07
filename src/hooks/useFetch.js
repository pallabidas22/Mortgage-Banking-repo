import { useEffect, useState } from "react";
import axios from 'axios';
import { HOST } from "../constants/api";

function useFetch(url, req) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    setData(null);
    setError(null);
    axios.get(`${HOST}${url}`)
      .then(res => {
        setLoading(false);
        setData(res?.data || null);
      })
      .catch(err => {
        setLoading(false);
        console.log({ err })
        setError('Something went wrong.')
      })
  }, [url, req])

  return { data, loading, error }
}

export default useFetch;