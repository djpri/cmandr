/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import {
  useCombobox,
  useMultipleSelection,
  UseMultipleSelectionProps
} from 'downshift'
import Highlighter from 'react-highlight-words'
import { FormLabel, FormLabelProps } from '@chakra-ui/form-control'
import {
  Text,
  Stack,
  Box,
  BoxProps,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/layout'
import { Button, ButtonProps } from '@chakra-ui/button'
import { Input, InputProps } from '@chakra-ui/input'
import { IconProps, CheckCircleIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { Tag, TagCloseButton, TagLabel, TagProps } from '@chakra-ui/tag'
import { ComponentWithAs, useColorModeValue } from '@chakra-ui/react'
import { matchSorter } from "match-sorter"
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect"
import { ReactNode, ComponentType, ReactElement, useState, useRef, useEffect, SetStateAction } from "react"

interface Item {
  label: string
  value: string
}

interface CUIAutoCompleteProps<T extends Item>
  extends UseMultipleSelectionProps<T> {
  items: T[]
  placeholder: string
  label: string
  highlightItemBg?: string
  onCreateItem?: (item: T) => void
  optionFilterFunc?: (items: T[], inputValue: string) => T[]
  itemRenderer?: (item: T) => string | JSX.Element
  labelStyleProps?: FormLabelProps
  inputStyleProps?: InputProps
  toggleButtonStyleProps?: ButtonProps
  tagStyleProps?: TagProps
  listStyleProps?: BoxProps
  listItemStyleProps?: BoxProps
  emptyState?: (inputValue: string) => ReactNode
  selectedIconProps?: Omit<IconProps, 'name'> & {
    icon: IconProps['name'] | ComponentType
  }
  icon?: ComponentWithAs<'svg', IconProps>
  hideToggleButton?: boolean
  createItemRenderer?: (value: string) => string | JSX.Element
  disableCreateItem?: boolean
  renderCustomInput?: (inputProps: unknown, toggleButtonProps: unknown) => JSX.Element
  handleChooseItem?: (item) => void
  value?: string
}

function defaultOptionFilterFunc<T>(items: T[], inputValue: string) {
  return matchSorter(items, inputValue, { keys: ['value', 'label'] })
}

function defaultCreateItemRenderer(value: string) {
  return (
    <Text>
      <Box as='span'>Create</Box>{' '}
      <Box as='span' fontWeight='bold'>
        {`"${value}"`}
      </Box>
    </Text>
  )
}

const CUIAutoComplete = <T extends Item>(
  props: CUIAutoCompleteProps<T>
): ReactElement<CUIAutoCompleteProps<T>> => {
  const {
    items,
    optionFilterFunc = defaultOptionFilterFunc,
    itemRenderer,
    highlightItemBg = 'gray.500',
    placeholder,
    label,
    value,
    listStyleProps,
    labelStyleProps,
    inputStyleProps,
    toggleButtonStyleProps,
    tagStyleProps,
    selectedIconProps,
    listItemStyleProps,
    onCreateItem,
    icon,
    hideToggleButton = false,
    disableCreateItem = true,
    createItemRenderer = defaultCreateItemRenderer,
    renderCustomInput,
    handleChooseItem,
    ...downshiftProps
  } = props

  const defaultHighlightItemBg = useColorModeValue("gray.100", "gray.800");

  /* Refs */
  const disclosureRef = useRef(null)

  /* States */
  const [isCreating, setIsCreating] = useState(false)
  const [inputValue, setInputValue] = useState(value ?? "")
  const [inputItems, setInputItems] = useState<T[]>(items)

  /* Downshift Props */
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems
  } = useMultipleSelection(downshiftProps)
  const selectedItemValues = selectedItems.map((item) => item.value)

  const handleSelect = (selectedItem) => {
    if (selectedItem) {
      if (selectedItemValues.includes(selectedItem.value)) {
        removeSelectedItem(selectedItem)
      } else {
        if (onCreateItem && isCreating) {
          onCreateItem(selectedItem)
          setIsCreating(false)
          setInputItems(items)
          setInputValue('')
        } else {
          // addSelectedItem(selectedItem)
          handleChooseItem(selectedItem.value);
          setInputValue(selectedItem.label);
        }
      }

      selectItem(null)
    }
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
    setHighlightedIndex
  } = useCombobox({
    inputValue,
    selectedItem: undefined,
    items: inputItems,
    onInputValueChange: ({ inputValue, selectedItem }) => {
      const filteredItems = optionFilterFunc(items, inputValue || '')

      if (isCreating && filteredItems.length > 0) {
        setIsCreating(false)
      }

      if (!selectedItem) {
        setInputItems(filteredItems)
      }
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            isOpen: false
          }
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue,
            isOpen: false
          }
        case useCombobox.stateChangeTypes.FunctionSelectItem:
          return {
            ...changes,
            inputValue
          }
        default:
          return changes
      }
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || "")
          handleChooseItem(inputValue || "");
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            handleSelect(selectedItem)
          }
          break
        default:
          break
      }
    }
  })

  useEffect(() => {
    if (inputItems.length === 0 && !disableCreateItem) {
      setIsCreating(true)
      setInputItems([{ label: `${inputValue}`, value: inputValue }] as SetStateAction<T[]>)
      setHighlightedIndex(0)
    }
  }, [
    inputItems,
    setIsCreating,
    setHighlightedIndex,
    inputValue,
    disableCreateItem
  ])

  useDeepCompareEffect(() => {
    setInputItems(items)
  }, [items])

  const CustomHighlighter = (item) => (<Highlighter
    autoEscape
    searchWords={[inputValue || '']}
    textToHighlight={defaultItemRenderer(item)}
  />);

  /* Default Items Renderer */
  function defaultItemRenderer<T extends Item>(selected: T) {
    return selected.label
  }

  return (
    <Stack>
      {/* <FormLabel {...{ ...getLabelProps({}), ...labelStyleProps }}>
        {label}
      </FormLabel> */}

      {/* ---------Stack with Selected Menu Tags above the Input Box--------- */}
      {selectedItems && (
        <Stack spacing={2} isInline flexWrap='wrap'>
          {selectedItems.map((selectedItem, index) => (
            <Tag
              mb={1}
              {...tagStyleProps}
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem, index })}
            >
              <TagLabel>{selectedItem.label}</TagLabel>
              <TagCloseButton
                onClick={(e) => {
                  e.stopPropagation()
                  removeSelectedItem(selectedItem)
                }}
                aria-label='Remove menu selection badge'
              />
            </Tag>
          ))}
        </Stack>
      )}
      {/* ---------Stack with Selected Menu Tags above the Input Box--------- */}

      {/* -----------Section that renders the input element ----------------- */}
      <Stack isInline {...getMenuProps()}>
        {renderCustomInput ? (
          renderCustomInput(
            {
              ...inputStyleProps,
              ...getInputProps(
                getDropdownProps({
                  placeholder,
                  onClick: isOpen ? () => {} : openMenu,
                  onFocus: isOpen ? () => {} : openMenu,
                  ref: disclosureRef
                })
              )
            },
            {
              ...toggleButtonStyleProps,
              ...getToggleButtonProps(),
              ariaLabel: 'toggle menu',
              hideToggleButton
            }
          )
        ) : (
          <>
            <Input
              {...inputStyleProps}
              {...getInputProps(
                getDropdownProps({
                  placeholder,
                  onClick: isOpen ? () => {} : openMenu,
                  onFocus: isOpen ? () => {} : openMenu,
                  ref: disclosureRef
                })
              )}
            />
            {!hideToggleButton && (
              <Button
                {...toggleButtonStyleProps}
                {...getToggleButtonProps()}
                aria-label='toggle menu'
              >
                <ArrowDownIcon />
              </Button>
            )}
          </>
        )}
      </Stack>
      {/* -----------Section that renders the input element ----------------- */}

      {/* -----------Section that renders the Menu Lists Component ----------------- */}
      <Box pb={4} mb={4}>
        <List
          borderRadius='4px'
          border={isOpen && '2px solid rgba(128, 128, 128, 0.1)'}
          boxShadow='6px 5px 8px rgba(167, 167, 167, 0.02)'
          {...listStyleProps}
          {...getMenuProps()}
          maxH="20vh"
          overflowY="auto"
          position="fixed"
          bgColor="inherit"
          zIndex={900}
          opacity={1}
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <ListItem
                px={2}
                py={1}
                borderBottom='1px solid rgba(0,0,0,0.01)'
                {...listItemStyleProps}
                bgColor={highlightedIndex === index ? highlightItemBg : defaultHighlightItemBg }
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                {isCreating ? (
                  createItemRenderer(item.label)
                ) : (
                  <Box display='inline-flex' alignItems='center'>
                    {selectedItemValues.includes(item.value) && (
                      <ListIcon
                        as={icon || CheckCircleIcon}
                        color='green.500'
                        role='img'
                        display='inline'
                        aria-label='Selected'
                        {...selectedIconProps}
                      />
                    )}

                    {/* {itemRenderer ? (
                      itemRenderer(item)
                      ) : CustomHighlighter(item)} */}
                      {defaultItemRenderer(item)}

                  </Box>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
      {/* ----------- End Section that renders the Menu Lists Component ----------------- */}
    </Stack>
  )
}

export default CUIAutoComplete;