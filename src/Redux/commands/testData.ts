import { Command } from "../../models/command";

export const testState: Command[] = [
  {
    line: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: 1, name: "general" },
    id: 1,
  },
  {
    line: "yarn add framer-motion",
    description: "install framer motion",
    category: { id: 3, name: "npm package" },
    reference: "https://www.framer.com/docs/",
    id: 2,
  },
  {
    line: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 3,
  },
  {
    line: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 4,
  },
  {
    description: "add react icons package",
    line: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: 3, name: "npm package" },
    id: 5,
  },
  {
    description: "chakra ui autocomplete",
    line: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: 3, name: "npm package" },
    id: 6,
  },
  {
    description: "Add document to firebase",
    line: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 1, name: "general" },
    id: 7,
  },
];

export const testItem: Command = {
  line: "yarn add framer-motion",
  description: "install framer motion",
  category: { id: 3, name: "npm package" },
  reference: "https://www.framer.com/docs/",
  id: 2,
};

export const editedTestItem: Command = {
  line: "yarn remove framer-motion",
  description: "remove framer motion",
  category: { id: 3, name: "npm package" },
  reference: "https://www.framer.com/docs/",
  id: 2,
};

export const testStateAfterEdit: Command[] = [
  {
    line: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: 1, name: "general" },
    id: 1,
  },
  // edited item
  {
    line: "yarn remove framer-motion",
    description: "remove framer motion",
    category: { id: 3, name: "npm package" },
    reference: "https://www.framer.com/docs/",
    id: 2,
  },
  {
    line: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 3,
  },
  {
    line: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 4,
  },
  {
    description: "add react icons package",
    line: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: 3, name: "npm package" },
    id: 5,
  },
  {
    description: "chakra ui autocomplete",
    line: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: 3, name: "npm package" },
    id: 6,
  },
  {
    description: "Add document to firebase",
    line: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 1, name: "general" },
    id: 7,
  },
];

export const testStateAfterDeletion: Command[] = [
  {
    line: "php artisan serve",
    description: "serve laravel app",
    reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
    category: { id: 1, name: "general" },
    id: 1,
  },
  // deleted item was here
  {
    line: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 3,
  },
  {
    line: "addDoc(collection(db, path)",
    description: "Add document to firebase",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 3, name: "npm package" },
    id: 4,
  },
  {
    description: "add react icons package",
    line: "yarn add react-icons",
    reference: "https://react-icons.github.io/react-icons/",
    category: { id: 3, name: "npm package" },
    id: 5,
  },
  {
    description: "chakra ui autocomplete",
    line: "yarn add chakra-ui-autocomplete",
    reference: "https://github.com/koolamusic/chakra-ui-autocomplete",
    category: { id: 3, name: "npm package" },
    id: 6,
  },
  {
    description: "Add document to firebase",
    line: "addDoc(collection(db, path)",
    reference:
      "https://firebase.google.com/docs/firestore/manage-data/add-data",
    category: { id: 1, name: "general" },
    id: 7,
  },
];
