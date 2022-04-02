// useContextMenu.js
import { useEffect, useCallback, useState } from "react";

const useContextMenu = (id: string) => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setShow, setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.getElementById(id).addEventListener("click", handleClick);
    document
      .getElementById(id)
      .addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.getElementById(id).removeEventListener("click", handleClick);
      document
        .getElementById(id)
        .removeEventListener("contextmenu", handleContextMenu);
    };
  });
  return { anchorPoint, show };
};

export default useContextMenu;
