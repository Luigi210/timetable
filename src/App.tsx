import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Modal } from "./components/Modal";

function App() {
  const [opened, setIsOpened] = useState(false);
  return (
    <>
      <div>
        <button onClick={() => setIsOpened(true)}>
          Открыть модальное окно
        </button>
      </div>
      {opened && <Modal setIsOpen={setIsOpened} />}
    </>
  );
}

export default App;
