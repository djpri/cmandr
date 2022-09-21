import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const iconColor = useColorModeValue("black", "white");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      colorScheme="blackAlpha"
      fontSize="md"
      variant="ghost"
      color="current"
      boxShadow="outline"
      onClick={toggleColorMode}
      icon={<SwitchIcon color={iconColor} />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
