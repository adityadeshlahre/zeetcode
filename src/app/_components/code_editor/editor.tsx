import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditorComponent() {
  const [code, setCode] = useState("// some comment");

  function handleEditorChange(value: any, event: any) {
    console.log("here is the current model value:", value);
    setCode(value);
  }

  function handleSubmit() {
    console.log("Code submitted:", code);
  }

  return (
    <>
      <Editor
        height="50vh"
        width="90vw"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={code}
        onChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <p>Current Code:</p>
        <pre>{code}</pre>
      </div>
    </>
  );
}
