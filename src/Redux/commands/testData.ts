import { Command } from "./../../types/types";

export const testState: Command[] = [
  {
    command: "php artisan serve",
    howTo: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: "general",
    id: "9Am1cAF2KNSkFfEOkH5r",
  },
  {
    command: "yarn add framer-motion",
    howTo: "install framer motion",
    category: "npm package",
    reference: "https://www.framer.com/docs/",
    id: "BqeJ0PXxnNahJryxW8MK",
  },
  {
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    howTo: "Add document to firebase",
    category: "npm package",
    command: "addDoc(collection(db, path)",
    id: "GOxPxUpu5JQ3VkMO4f3u",
  },
  {
    command: "addDoc(collection(db, path)",
    howTo: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: "npm package",
    id: "HOYmcDKGU0JYPqmOn4yU",
  },
  {
    howTo: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: "npm package",
    id: "Ms4jyIpqrSDTsRtO3j37",
  },
  {
    category: "npm package",
    command: "yarn add chakra-ui-autocomplete",
    howTo: "chakra ui autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    id: "wr4aAi1VaAjsi1pB75Uh",
  },
  {
    command: "addDoc(collection(db, path)",
    howTo: "Add document to firebase",
    category: "general",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    id: "yrDbDEKsRPROlB0jpJp4",
  },
];

export const editedTestItem: Command = {
  command: "yarn remove framer-motion",
  howTo: "remove framer motion",
  category: "npm package",
  reference: "https://www.framer.com/docs/",
  id: "BqeJ0PXxnNahJryxW8MK",
};

export const testStateAfterEdit: Command[] = [
  {
    command: "php artisan serve",
    howTo: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: "general",
    id: "9Am1cAF2KNSkFfEOkH5r",
  },
  // edited item
  {
    command: "yarn remove framer-motion",
    howTo: "remove framer motion",
    category: "npm package",
    reference: "https://www.framer.com/docs/",
    id: "BqeJ0PXxnNahJryxW8MK",
  },
  {
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    howTo: "Add document to firebase",
    category: "npm package",
    command: "addDoc(collection(db, path)",
    id: "GOxPxUpu5JQ3VkMO4f3u",
  },
  {
    command: "addDoc(collection(db, path)",
    howTo: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: "npm package",
    id: "HOYmcDKGU0JYPqmOn4yU",
  },
  {
    howTo: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: "npm package",
    id: "Ms4jyIpqrSDTsRtO3j37",
  },
  {
    category: "npm package",
    command: "yarn add chakra-ui-autocomplete",
    howTo: "chakra ui autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    id: "wr4aAi1VaAjsi1pB75Uh",
  },
  {
    command: "addDoc(collection(db, path)",
    howTo: "Add document to firebase",
    category: "general",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    id: "yrDbDEKsRPROlB0jpJp4",
  },
];

export const testStateAfterDeletion: Command[] = [
  {
    command: "php artisan serve",
    howTo: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: "general",
    id: "9Am1cAF2KNSkFfEOkH5r",
  },
  // deleted item was here
  {
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    howTo: "Add document to firebase",
    category: "npm package",
    command: "addDoc(collection(db, path)",
    id: "GOxPxUpu5JQ3VkMO4f3u",
  },
  {
    command: "addDoc(collection(db, path)",
    howTo: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: "npm package",
    id: "HOYmcDKGU0JYPqmOn4yU",
  },
  {
    howTo: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: "npm package",
    id: "Ms4jyIpqrSDTsRtO3j37",
  },
  {
    category: "npm package",
    command: "yarn add chakra-ui-autocomplete",
    howTo: "chakra ui autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    id: "wr4aAi1VaAjsi1pB75Uh",
  },
  {
    command: "addDoc(collection(db, path)",
    howTo: "Add document to firebase",
    category: "general",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    id: "yrDbDEKsRPROlB0jpJp4",
  },
];
