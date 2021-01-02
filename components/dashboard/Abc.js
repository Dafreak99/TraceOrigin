import React from "react";

const Abc = ({ visible, setVisible }) => {
  return (
    <>
      {visible && (
        <>
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </>
      )}
      <button onClick={() => setVisible(!visible)}>Click</button>
    </>
  );
};

export default Abc;
