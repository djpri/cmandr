import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { isInDevelopment } from "helpers/environment";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";

interface CodeEditorProps {
  handleCodeSnippetChange: (value: string) => void;
  value: string;
  height?: string;
  defaultLanguage?: string;
  setDefaultLanguage: Dispatch<SetStateAction<string>>;
  readonly?: boolean;
  // setAvailableLanguages: SetStateAction<string[]>;
}

function CodeEditor({
  handleCodeSnippetChange,
  value,
  defaultLanguage,
  height,
  setDefaultLanguage,
  readonly = false
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
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      noSyntaxValidation: true,
    });
  };

  // const handleLanguageChange = (language) => {
  //   setDefaultLanguage(language);
  // };

  // const languages = monaco.languages.getLanguages();

  return (
    <Box position="relative" h="100%" maxH="150vh" maxW="100%" borderWidth="1px" borderRadius="lg">
      <Editor
        theme={theme}
        height={height ?? "45vh"}
        defaultValue={value}
        value={value}
        onChange={(value) => handleCodeSnippetChange(value)}
        defaultLanguage={defaultLanguage ?? "javascript"}
        language={defaultLanguage}
        options={{
          lineNumbers: "off",
          minimap: {
            enabled: false,
          },
          readOnly: readonly,
        }}
        onMount={handleEditorDidMount}
      />
      {(isSecureContext || isInDevelopment) && !readonly && (
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
      {readonly && (
        <Button
          position="absolute"
          zIndex={1000}
          top="1rem"
          right="2rem"
          size="xs"
          variant="save"
        >
          Edit
        </Button>
      )}
    </Box>
  );
}

export default CodeEditor;
