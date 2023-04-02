import { chakra, useColorModeValue } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useMemo } from "react";

interface CodeEditorProps {
  handleCodeSnippetChange: (value: string) => void;
  value: string;
}

function CodeEditor({ handleCodeSnippetChange, value }: CodeEditorProps) {
  const StyledEditor = chakra(Editor, {
    baseStyle: {
      fontFamily: "body",
      mt: 5,
      p: 3,
      borderWidth: 1,
      borderRadius: "12px",
      minH: "20vh",
      h: "100%",
    },
  });
  const theme = useColorModeValue("light", "vs-dark");

  const editor = useMemo(() => (
    <StyledEditor
      height="40vh"
      defaultLanguage="javascript"
      defaultValue={value}
      theme={theme}
      options={{
        selectOnLineNumbers: true,
        lineNumbers: false,
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
      }}
      onChange={handleCodeSnippetChange}
    />
  ), [theme]);

  return editor;
}

export default CodeEditor;
