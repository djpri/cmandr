import { Box, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { isInDevelopment } from "helpers/environment";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CodeEditorProps {
  handleCodeSnippetChange: (value: string) => void;
  value: string;
  height?: string;
  defaultLanguage?: string;
  setDefaultLanguage: Dispatch<SetStateAction<string>>;
  readonly?: boolean;
  onSave?: () => void;
  // setAvailableLanguages: SetStateAction<string[]>;
}

function CodeEditor({
  handleCodeSnippetChange,
  value,
  defaultLanguage,
  height,
  setDefaultLanguage,
  readonly = false,
  onSave,
}: CodeEditorProps) {
  const theme = useColorModeValue("light", "vs-dark");
  const editorRef = useRef(null);
  const isSecureContext = useMemo(() => {
    return location.protocol === "https:";
  }, []);

  const [isCopied, setIsCopied] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handlePasteButtonClick = async () => {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
      handleCodeSnippetChange(clipboardText);
    }
  };

  useEffect(() => {
    setIsReadOnly(readonly);
  }, [readonly, value]);

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
      allowNonTsExtensions: true,
    });
  };

  // const handleLanguageChange = (language) => {
  //   setDefaultLanguage(language);
  // };

  // const languages = monaco.languages.getLanguages();

  return (
    <Box
      position="relative"
      h="100%"
      minH="50vh"
      w="100%"
      maxW="100%"
      maxH="90vh"
      // borderWidth="1px"
      borderRadius="lg"
      borderTopWidth={onSave && !isReadOnly && "1rem"}
      borderColor="yellow.500"
    >
      <VStack
        zIndex={1000}
        spacing={2}
        position="absolute"
        top="1rem"
        right="2rem"
      >
        <CopyToClipboard text={value} onCopy={() => handleCopy()}>
          <Button
            size="xs"
            variant="settings"
            w="4rem"
            display={["none", null, null, "block"]}
          >
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </CopyToClipboard>
        {(isSecureContext || isInDevelopment) && !readonly && (
          <Button size="xs" variant="save" onClick={handlePasteButtonClick}>
            Paste
          </Button>
        )}
        {onSave && isReadOnly && (
          <Button size="xs" variant="save" onClick={() => setIsReadOnly(false)}>
            Edit
          </Button>
        )}
        {onSave && !isReadOnly && (
          <Button size="xs" variant="save" onClick={() => setIsReadOnly(true)}>
            Save
          </Button>
        )}
      </VStack>
      <Editor
        aria-labelledby="code"
        theme={theme}
        height={height ?? "45vh"}
        defaultValue={value}
        value={value}
        onChange={(value) => handleCodeSnippetChange(value)}
        defaultLanguage={defaultLanguage ?? "javascript"}
        language={defaultLanguage ?? "javascript"}
        options={{
          lineNumbers: "off",
          minimap: {
            enabled: false,
          },
          readOnly: isReadOnly,
        }}
        onMount={handleEditorDidMount}
      />
    </Box>
  );
}

export default CodeEditor;
