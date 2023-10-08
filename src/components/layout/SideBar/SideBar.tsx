import {
  Box,
  Stack,
  StackItem,
  chakra,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { Suspense, lazy, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsSidebarOpen,
  selectSidebarSize,
  setSidebarSize,
} from "redux/slices/layoutSlice";

const SideBarLinks = lazy(() => import("./SideBarLinks/SideBarLinks"));

const scrollbarStyles = {
  "::-webkit-scrollbar": {
    position: "absolute",
    width: "8px",
  },
  "::-webkit-scrollbar-track": {
    opacity: 0,
  },
  "::-webkit-scrollbar-thumb": {
    background: "#555",
    display: "none",
    borderRadius: "4px",
  },
  "@-moz-document url-prefix()": {
    scrollbarWidth: "thin",
    scrollbarColor: "#555",
  },
};

const hoverStyle = {
  "::-webkit-scrollbar-thumb": {
    display: "block",
  },
};

function SideBar() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsSidebarOpen);
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");
  const bgColor = useColorModeValue("#f2f0f9", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.700");


  // const [show, setShow] = useState(false);
  // const [categoryId] = useState(null);
  // const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  // const close = () => setShow(false);

  // const handleContext: MouseEventHandler<HTMLDivElement> = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     // e.target.classList.contains("sidebar-category");
  //     setAnchorPoint({ x: e.clientX, y: e.clientY });
  //     setShow(true);
  //   },
  //   [setShow]
  // );

  if (!isOpen) return null;

  // const ContextMenu = ({ anchorPoint, categoryId }) => (
  //   <Popover isOpen={show} onClose={close}>
  //     <PopoverContent
  //       position={isSmallerThan1280 ? "absolute" : "fixed"}
  //       top={anchorPoint.y}
  //       left={anchorPoint.x}
  //       className="sidebar-popover"
  //     >
  //       <PopoverArrow />
  //       {/* <PopoverCloseButton /> */}
  //       <PopoverHeader>Confirmation!</PopoverHeader>
  //       <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
  //     </PopoverContent>
  //   </Popover>
  // );

  const sidebarRef = React.useRef(null);
  const resizerRef = React.useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dragWidth, setDragWidth] = useState(268);

  const sidebarWidth = useSelector(selectSidebarSize);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    dispatch(setSidebarSize(dragWidth));
    setIsResizing(false);
  }, [dragWidth]);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        mouseMoveEvent.preventDefault();
        mouseMoveEvent.stopPropagation();
        const newDragWidth =
          mouseMoveEvent.clientX -
          sidebarRef.current.getBoundingClientRect().left;
        // Clamp the width within the specified range (200px to 400px)
        const clampedWidth = Math.max(200, Math.min(newDragWidth, 400));

        if (resizerRef.current) {
          resizerRef.current.style.right = `${sidebarWidth - clampedWidth}px`;
        }
        setDragWidth(clampedWidth);
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    if (!isResizing) {
      resizerRef.current.style.right = "-5px";
    }

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // Contents of sidebar must be memoized to prevent re-rendering when adjusting sidebar width.
  // This improves the performance significantly.
  const sideBarContents = useMemo(() => (
    <StackItem>
    <Suspense>
      <SideBarLinks />
    </Suspense>
    {/* <ContextMenu anchorPoint={anchorPoint} categoryId={categoryId} /> */}
  </StackItem>
  ), [isSmallerThan1280])

  return (
    <Box
      position={"fixed"}
      w={sidebarWidth}
      transition="width 0.2s ease-in-out"
      className="LEFT"
      h="100vh"
      ref={sidebarRef}
      zIndex="500"
    >
      <Box
        data-cy="sidebar"
        id="sidebar"
        bgColor={bgColor}
        position={isSmallerThan1280 ? "fixed" : "fixed"}
        w="inherit"
        maxW={"100%"}
        mt="45px"
        left="0"
        h="100vh"
        borderColor={borderColor}
        borderRightWidth="1px"
        boxSizing="content-box"
        userSelect="none"
        zIndex="500"
      >
        {/* SIDE LINKS */}
        {/* <HStack mt={1} h="100%"> */}
        <Stack
          mt="1"
          pb={24}
          overflowY="scroll"
          sx={scrollbarStyles}
          _hover={hoverStyle}
          h={"100%"}
          w="100%"
        >
         {sideBarContents}
        </Stack>
        <chakra.span
          position="absolute"
          cursor={"col-resize"}
          zIndex={600}
          top={0}
          role="presentation"
          ref={resizerRef}
          w="2px"
          h="100%"
          m="0 0px"
          p={0}
          borderLeft="2px solid transparent"
          borderRight="2px solid transparent"
          background="rgba(221, 221, 221, 0.479)"
          onMouseDown={startResizing}
          transition={"all 0.1s"}
        ></chakra.span>
        {/* </HStack> */}
      </Box>
    </Box>
  );
}

export default SideBar;
