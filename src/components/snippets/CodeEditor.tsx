import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { isInDevelopment } from "helpers/environment";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";

interface CodeEditorProps {
  handleCodeSnippetChange: (value: string) => void;
  value: string;
  defaultLanguage: string;
  setDefaultLanguage: Dispatch<SetStateAction<string>>;
  // setAvailableLanguages: SetStateAction<string[]>;
}

function CodeEditor({
  handleCodeSnippetChange,
  value,
  defaultLanguage,
  setDefaultLanguage
}: CodeEditorProps) {
  const theme = useColorModeValue("light", "vs-dark");
  const editorRef = useRef(null);

  const isSecureContext = useMemo(() => {
    return location.protocol === "https:";
  }, []);

  const handlePasteButtonClick = async () => {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      handleCodeSnippetChange(clipboardText);
    }
  };

  useEffect(() => {
    handleCodeSnippetChange(value);
  }, [defaultLanguage]);


  const handleEditorDidMount = (editor, monaco) => {
    // editor.getModel().dispose(); // dispose the old model to avoid memory leaks
    // const newModel = monaco.editor.createModel(value, defaultLanguage);
    // editor.setModel(newModel);
    editorRef.current = editor;
    editor.onDidChangeModelLanguage(() => {
      setDefaultLanguage(editor.getModel().getLanguageId());
    });
  };



  const handleLanguageChange = (language) => {
    setDefaultLanguage(language);
  };

  // const languages = monaco.languages.getLanguages();

  return (
    <Box position="relative" h="100%" borderWidth="1px" borderRadius="lg">
      <Editor
        theme={theme}
        height="45vh"
        defaultValue={value}
        value={value}
        onChange={(value) => handleCodeSnippetChange(value)}
        defaultLanguage="javascript"
        language={defaultLanguage}
        options={{
          lineNumbers: "off",
          minimap: {
            enabled: false,
          },
        }}
        onMount={handleEditorDidMount}
      />
      {(isSecureContext || isInDevelopment) && (
        <Button
          position="absolute"
          zIndex={1000}
          top="1rem"
          right="2rem"
          size="xs"
          variant="save"
          onClick={handlePasteButtonClick}
        >
          Paste
        </Button>
      )}
    </Box>
  );
}

export default CodeEditor;
