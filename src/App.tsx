
import { useEffect } from "react";
import Pages from "./Components/Pages"

function App() {

  useEffect(() => {
    localStorage.removeItem("selectedRows");
  }, []);


  return (
    <>
      <Pages />
    </>
  )
}

export default App