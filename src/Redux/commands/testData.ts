import { Command } from "./../../types/types";

export const testState: Command[] = [
  {
    command: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: "1", name: "general" },
    id: "9Am1cAF2KNSkFfEOkH5r",
  },
  {
    command: "yarn add framer-motion",
    description: "install framer motion",
    category: { id: "3", name: "npm package" },
    reference: "https://www.framer.com/docs/",
    id: "BqeJ0PXxnNahJryxW8MK",
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "3", name: "npm package" },
    id: "GOxPxUpu5JQ3VkMO4f3u",
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "3", name: "npm package" },
    id: "HOYmcDKGU0JYPqmOn4yU",
  },
  {
    description: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: "3", name: "npm package" },
    id: "Ms4jyIpqrSDTsRtO3j37",
  },
  {
    description: "chakra ui autocomplete",
    command: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: "3", name: "npm package" },
    id: "wr4aAi1VaAjsi1pB75Uh",
  },
  {
    description: "Add document to firebase",
    command: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "1", name: "general" },
    id: "yrDbDEKsRPROlB0jpJp4",
  },
];

export const testItem: Command = {
  command: "yarn add framer-motion",
  description: "install framer motion",
  category: { id: "3", name: "npm package" },
  reference: "https://www.framer.com/docs/",
  id: "BqeJ0PXxnNahJryxW8MK",
};

export const editedTestItem: Command = {
  command: "yarn remove framer-motion",
  description: "remove framer motion",
  category: { id: "3", name: "npm package" },
  reference: "https://www.framer.com/docs/",
  id: "BqeJ0PXxnNahJryxW8MK",
};

export const testStateAfterEdit: Command[] = [
  {
    command: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: "1", name: "general" },
    id: "9Am1cAF2KNSkFfEOkH5r",
  },
  // edited test item
  {
    command: "yarn remove framer-motion",
    description: "remove framer motion",
    category: { id: "3", name: "npm package" },
    reference: "https://www.framer.com/docs/",
    id: "BqeJ0PXxnNahJryxW8MK",
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "3", name: "npm package" },
    id: "GOxPxUpu5JQ3VkMO4f3u",
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "3", name: "npm package" },
    id: "HOYmcDKGU0JYPqmOn4yU",
  },
  {
    description: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: "3", name: "npm package" },
    id: "Ms4jyIpqrSDTsRtO3j37",
  },
  {
    description: "chakra ui autocomplete",
    command: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: "3", name: "npm package" },
    id: "wr4aAi1VaAjsi1pB75Uh",
  },
  {
    description: "Add document to firebase",
    command: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "1", name: "general" },
    id: "yrDbDEKsRPROlB0jpJp4",
  },
];

export const testStateAfterDeletion: Command[] = [
  {
    command: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: "1", name: "general" },
    id: "9Am1cAF2KNSkFfEOkH5r",
  },
  // removed item was here
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "3", name: "npm package" },
    id: "GOxPxUpu5JQ3VkMO4f3u",
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "3", name: "npm package" },
    id: "HOYmcDKGU0JYPqmOn4yU",
  },
  {
    description: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: "3", name: "npm package" },
    id: "Ms4jyIpqrSDTsRtO3j37",
  },
  {
    description: "chakra ui autocomplete",
    command: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: "3", name: "npm package" },
    id: "wr4aAi1VaAjsi1pB75Uh",
  },
  {
    description: "Add document to firebase",
    command: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: "1", name: "general" },
    id: "yrDbDEKsRPROlB0jpJp4",
  },
];
