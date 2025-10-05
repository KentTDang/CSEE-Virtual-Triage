import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import Signup from "./components/Signup"


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Signup />
    </>
  );
}

export default App;
