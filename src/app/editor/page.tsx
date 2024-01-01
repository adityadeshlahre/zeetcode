"use client";
import dynamic from "next/dynamic";
import Container from "~/components/container";

const CodeEditorComponent = dynamic(
  () => import("../_components/code_editor/editor"),
  {
    ssr: false,
  },
);

export default function Editor() {
  return (
    <>
      <Container>
        <CodeEditorComponent />
      </Container>
    </>
  );
}
