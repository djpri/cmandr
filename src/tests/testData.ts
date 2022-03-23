export const testData = {
  commands: [
    {
      id: 13,
      description: "Add jest as dev dependency",
      line: "yarn add --dev jest",
      reference: "https://jestjs.io/docs/26.x/getting-started",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 17,
      description: "Install react hook form",
      line: "yarn add react-hook-form",
      reference: "https://www.react-hook-form.com/get-started",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 18,
      description: "View all dotnet templates",
      line: "dotnet new --list",
      reference:
        "https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-list",
      category: {
        id: 4,
        name: "c#",
      },
    },
    {
      id: 19,
      description: "Install redux toolkit",
      line: "yarn add @reduxjs/toolkit",
      reference: "https://redux-toolkit.js.org/introduction/getting-started",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 20,
      description: "Install Tailwind CSS for Next JS",
      line: "npm install -D tailwindcss@latest postcss@latest autoprefixer@latest",
      reference: "https://tailwindcss.com/docs/guides/nextjs",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 12,
      description: "Install react router v6",
      line: "yarn add history@5 react-router-dom@6",
      reference: "https://reactrouter.com/docs/en/v6",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 21,
      description: "Install supabase",
      line: "npm install @supabase/supabase-js",
      reference:
        "https://supabase.io/docs/guides/with-react#initialize-a-react-app",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 22,
      description: "Create react app with typescript",
      line: "yarn create react-app my-app --template typescript",
      reference: "https://create-react-app.dev/docs/adding-typescript/",
      category: {
        id: 12,
        name: "React",
      },
    },
    {
      id: 23,
      description: "Create react app with chakra ui",
      line: "yarn create react-app my-app --template @chakra-ui/typescript",
      reference: "https://chakra-ui.com/guides/integrations/with-cra",
      category: {
        id: 12,
        name: "React",
      },
    },
    {
      id: 25,
      description: "View globally installed packages",
      line: "npm list -g --depth 0",
      reference: "https://devhints.io/npm",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 26,
      description: "View globally installed packages for yarn",
      line: "yarn global list",
      reference:
        "https://stackoverflow.com/questions/43501514/how-to-display-yarn-globally-installed-packages",
      category: {
        id: 2,
        name: "npm package",
      },
    },
    {
      id: 27,
      description: "Show installed extensions for vscode",
      line: "code --list-extensions",
      reference: "https://code.visualstudio.com/docs/editor/line-line",
      category: {
        id: 1,
        name: "general",
      },
    },
    {
      id: 28,
      description: "VSCode install extension",
      line: "code --install-extension <ext>",
      reference: "https://code.visualstudio.com/docs/editor/line-line",
      category: {
        id: 1,
        name: "general",
      },
    },
    {
      id: 29,
      description: "Delete remote branch",
      line: "git push origin --delete :$branchname",
      reference: "https://devhints.io/git-branch",
      category: {
        id: 14,
        name: "git",
      },
    },
    {
      id: 30,
      description: "Delete local remote-tracking branches",
      line: "git remote prune origin",
      reference: "https://devhints.io/git-branch",
      category: {
        id: 14,
        name: "git",
      },
    },
    {
      id: 31,
      description: "Create site with Gatsby",
      line: "npm init gatsby",
      reference: "https://www.gatsbyjs.com/docs/quick-start/",
      category: {
        id: 12,
        name: "React",
      },
    },
    {
      id: 32,
      description: "Create app with AngularJS",
      line: "ng new my-app",
      reference: "https://angular.io/guide/setup-local",
      category: {
        id: 15,
        name: "Angular",
      },
    },
  ],
  commandCategories: [
    {
      id: 1,
      name: "general",
    },
    {
      id: 2,
      name: "npm package",
    },
    {
      id: 3,
      name: "javascript",
    },
    {
      id: 4,
      name: "c#",
    },
    {
      id: 12,
      name: "React",
    },
    {
      id: 13,
      name: "Vue",
    },
    {
      id: 14,
      name: "git",
    },
    {
      id: 15,
      name: "Angular",
    },
  ],
  links: [],
  linkCategories: [
    {
      id: 1,
      name: "general",
    },
    {
      id: 2,
      name: "npm package",
    },
    {
      id: 3,
      name: "javascript",
    },
    {
      id: 4,
      name: "c#",
    },
    {
      id: 12,
      name: "React",
    },
    {
      id: 13,
      name: "Vue",
    },
    {
      id: 14,
      name: "git",
    },
    {
      id: 15,
      name: "Angular",
    },
  ],
};
