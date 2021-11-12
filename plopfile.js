module.exports = function (plop) {
  // plop generator code
  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        // Add multiple files
        type: "addMany",
        // Destination folder of new component
        destination: "src/components/{{name}}",
        // Handlebars templates used to generate content of new file
        templateFiles: "plop-templates/*.hbs",
        // templateFile: "plop-templates/Component.js.hbs",
      },
    ],
  });
};
