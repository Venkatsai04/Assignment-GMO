import { useState, useEffect } from 'react'
import Pages from "./Components/Pages"

function App() {

  const [Data, setData] = useState(null)
  const [Page, setPage] = useState(1)

  const fetchData = async () => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${Page}`)
    const data = await response.json()

    if(data) {
      setData(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [Page]) 
  

  return (
    <>
      {Data ? <Pages data={Data.data}/> : <>Loading...</>}
    </>
  )
}

export default App