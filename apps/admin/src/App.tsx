import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import Signup from "./components/Signup"
import { Login1 } from "./views/Login";

function App() {
  return (
    <>
      <Signup />
      <Login1 />
    </>
  );
}

export default App;
