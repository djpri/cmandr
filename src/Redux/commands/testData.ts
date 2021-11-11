import { Command } from "./../../types/types";

export const testState: Command[] = [
  {
    command: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: 1, name: "general" },
    id: 1,
  },
  {
    command: "yarn add framer-motion",
    description: "install framer motion",
    category: { id: 3, name: "npm package" },
    reference: "https://www.framer.com/docs/",
    id: 2,
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 3,
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 4,
  },
  {
    description: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: 3, name: "npm package" },
    id: 5,
  },
  {
    description: "chakra ui autocomplete",
    command: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: 3, name: "npm package" },
    id: 6,
  },
  {
    description: "Add document to firebase",
    command: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 1, name: "general" },
    id: 7,
  },
];

export const testItem: Command = {
  command: "yarn add framer-motion",
  description: "install framer motion",
  category: { id: 3, name: "npm package" },
  reference: "https://www.framer.com/docs/",
  id: 2,
};

export const editedTestItem: Command = {
  command: "yarn remove framer-motion",
  description: "remove framer motion",
  category: { id: 3, name: "npm package" },
  reference: "https://www.framer.com/docs/",
  id: 2,
};

export const testStateAfterEdit: Command[] = [
  {
    command: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: 1, name: "general" },
    id: 1,
  },
  // edited item
  {
    command: "yarn remove framer-motion",
    description: "remove framer motion",
    category: { id: 3, name: "npm package" },
    reference: "https://www.framer.com/docs/",
    id: 2,
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 3,
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 4,
  },
  {
    description: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: 3, name: "npm package" },
    id: 5,
  },
  {
    description: "chakra ui autocomplete",
    command: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: 3, name: "npm package" },
    id: 6,
  },
  {
    description: "Add document to firebase",
    command: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 1, name: "general" },
    id: 7,
  },
];

export const testStateAfterDeletion: Command[] = [
  {
    command: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: 1, name: "general" },
    id: 1,
  },
  // deleted item was here
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 3,
  },
  {
    command: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 4,
  },
  {
    description: "add react icons package",
    command: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: 3, name: "npm package" },
    id: 5,
  },
  {
    description: "chakra ui autocomplete",
    command: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: 3, name: "npm package" },
    id: 6,
  },
  {
    description: "Add document to firebase",
    command: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 1, name: "general" },
    id: 7,
  },
];
