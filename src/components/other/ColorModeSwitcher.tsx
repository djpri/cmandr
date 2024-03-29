import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FC } from "react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      colorScheme="blackAlpha"
      fontSize="md"
      variant="ghost"
      color="current"
      boxShadow="outline"
      onClick={toggleColorMode}
      icon={<SwitchIcon color="white" />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
