import { useEffect, useState } from 'react';
import axios from 'axios';
const  getPaginatedResult=(url,pageNumber,limit)=> {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [result, setResult] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setResult([])
      }, [pageNumber])
      useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
          method: 'GET',
          url: `${url}?page=${pageNumber}&limit=${limit}`,
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          setResult(prevResult => {
            return [...new Set([...prevResult, ...res.data])]
          })
          setHasMore(res.data.length > 0)
          setLoading(false)
        }).catch(e => {
          if (axios.isCancel(e)) return
          setError(true)
        })
        return () => cancel()
      }, [query, pageNumber])
    
      return { loading, error, result, hasMore }
    
}

export default getPaginatedResult;