import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditorComponent() {
  const [code, setCode] = useState("// Start writing code here !");

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
        width="80vw"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={code}
        onChange={handleEditorChange}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "off",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapColumn: 80,
          wrappingIndent: "none",
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <p>Current Code:</p>
        <pre>{code}</pre>
      </div>
    </>
  );
}
