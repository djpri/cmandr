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
  links: [
    {
      id: 9,
      url: "https://chakra-ui.com/docs/getting-started",
      title: "Chakra UI",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 10,
      url: "https://tailwindcss.com/docs/installation",
      title: "Tailwind CSS",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 11,
      url: "https://reactrouter.com/docs/en/v6/getting-started/overview",
      title: "React Router",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 13,
      url: "https://beta.reactjs.org/",
      title: "React Docs Beta",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 14,
      url: "https://angular.io/docs",
      title: "Angular",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 15,
      url: "https://redux-toolkit.js.org/introduction/getting-started",
      title: "Redux Toolkit",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 17,
      url: "https://react-icons.github.io/react-icons/",
      title: "React Icons",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 18,
      url: "https://sass-lang.com/guide",
      title: "Sass",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 32,
      url: "https://storybook.js.org/",
      title: "Storybook",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 34,
      url: "https://docs.cypress.io/guides/getting-started/writing-your-first-test",
      title: "Cypress",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 35,
      url: "https://github.com/michalsnik/aos",
      title: "AOS",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 37,
      url: "https://vueformulate.com/guide/installation/#npm",
      title: "Vue formulate",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 43,
      url: "https://formik.org/",
      title: "Formik",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 51,
      url: "https://jestjs.io/docs/api",
      title: "Jest",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 53,
      url: "https://prettier.io/docs/en/install.html",
      title: "Prettier",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 54,
      url: "https://eslint.org/docs/user-guide/getting-started",
      title: "ESLint",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 55,
      url: "https://nextjs.org/docs",
      title: "Next JS",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 58,
      url: "https://docusaurus.io/docs",
      title: "Docusaurus",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 59,
      url: "https://socket.io/docs/v4/",
      title: "Socket.IO",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 61,
      url: "https://axios-http.com/docs/intro",
      title: "Axios",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 62,
      url: "https://react-hook-form.com/get-started",
      title: "React Hook Form",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 79,
      url: "https://playwright.dev/docs/intro",
      title: "Playwright",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 83,
      url: "https://plopjs.com/documentation/#getting-started",
      title: "Plop",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 84,
      url: "https://swiperjs.com/react",
      title: "Swiper JS",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-08T21:14:30",
    },
    {
      id: 87,
      url: "https://www.npmjs.com/package/@azure/msal-react",
      title: "Azure Msal React",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-18T23:38:37",
    },
    {
      id: 88,
      url: "https://www.npmjs.com/package/@azure/msal-browser",
      title: "Azure Msal Browser",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-18T23:39:55",
    },
    {
      id: 89,
      url: "https://react-window.vercel.app/#/examples/list/fixed-size",
      title: "React Window",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-18T23:42:54",
    },
    {
      id: 91,
      url: "https://react-query.tanstack.com/guides/important-defaults",
      title: "React Query",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-23T14:50:00",
    },
    {
      id: 94,
      url: "https://remix.run/docs/en/v1#remix-docs",
      title: "Remix",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-27T13:01:48",
    },
    {
      id: 95,
      url: "https://react-dnd.github.io/react-dnd/docs/overview",
      title: "React DnD",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-03-27T14:13:20",
    },
    {
      id: 99,
      url: "https://react-table.tanstack.com/",
      title: "React Table",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-04-05T17:28:46",
    },
    {
      id: 105,
      url: "https://testing-library.com/docs/react-testing-library/example-intro",
      title: "React Testing Library",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-04-05T17:37:26",
    },
    {
      id: 107,
      url: "https://handlebarsjs.com/",
      title: "Handlebars",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-04-05T17:47:20",
    },
    {
      id: 108,
      url: "https://kit.svelte.dev/docs/introduction",
      title: "SvelteKit",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-04-06T21:24:52",
    },
    {
      id: 109,
      url: "https://webpack.js.org/concepts/",
      title: "Webpack",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-04-06T21:25:35",
    },
    {
      id: 110,
      url: "https://parceljs.org/docs/",
      title: "Parcel",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-04-06T21:26:24",
    },
    {
      id: 115,
      url: "https://jsdoc.app/",
      title: "JSDoc",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-04-06T21:40:27",
    },
    {
      id: 123,
      url: "https://vuejs.org/guide/introduction.html",
      title: "Vue",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-10-28T16:17:04",
    },
    {
      id: 124,
      url: "https://pinia.vuejs.org/introduction.html",
      title: "Pinia",
      previewImageUrl: null,
      faviconImageUrl: null,
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-10-28T16:24:37",
    },
    {
      id: 126,
      url: "https://zod.dev/",
      title: "Zod | Documentation",
      previewImageUrl:
        "https://opengraph.githubassets.com/1cac1150838995e1f7d1643c00eee51a5d884f2054f995c9d3225b07b0eddb39/colinhacks/zod",
      faviconImageUrl: "https://zod.dev/static/favicon-32x32.png",
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-11-01T18:50:26",
    },
    {
      id: 129,
      url: "https://greensock.com/docs/",
      title: "GSAP Docs",
      previewImageUrl:
        "https://greensock.com/uploads/monthly_2020_05/greensock-thumb.png.640b7d423125b0ad11e9f2af1cbf94c9.png",
      faviconImageUrl:
        "https://greensock.com/uploads/monthly_2018_06/favicon.ico.4811a987b377f271db584b422f58e5a7.ico",
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-11-12T00:56:10",
    },
    {
      id: 136,
      url: "https://blaze-slider.dev/docs/intro",
      title: "Blaze Slider",
      previewImageUrl: null,
      faviconImageUrl: "https://blaze-slider.dev/img/favicon.ico",
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-11-12T01:04:46",
    },
    {
      id: 143,
      url: "https://joi.dev",
      title: "joi.dev",
      previewImageUrl: null,
      faviconImageUrl: "https://joi.dev/favicon2.png?v=1.0",
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-11-24T18:01:06",
    },
    {
      id: 144,
      url: "https://inversify.io/",
      title: "InversifyJS",
      previewImageUrl: "http://inversify.io/img/logo_inverse.png",
      faviconImageUrl: "./img/favicon/android-icon-192x192.png",
      starred: false,
      category: {
        id: 2,
        name: "JS Docs",
        displayIndex: 0,
        isGroup: false,
        parentId: 70,
        items: 44,
      },
      dateCreated: "2022-11-24T18:01:52",
    },
  ],
  linkCategories: [
    {
      id: 69,
      name: "C#",
      displayIndex: 0,
      isGroup: true,
      parentId: 0,
      items: 2,
    },
    {
      id: 71,
      name: "Coding Exercises",
      displayIndex: 0,
      isGroup: true,
      parentId: 0,
      items: 1,
    },
    {
      id: 70,
      name: "Frontend",
      displayIndex: 0,
      isGroup: true,
      parentId: 0,
      items: 3,
    },
    {
      id: 13,
      name: "API Docs",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 2,
    },
    {
      id: 11,
      name: "Blog Posts",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 2,
    },
    {
      id: 16,
      name: "C# Docs",
      displayIndex: 0,
      isGroup: false,
      parentId: 69,
      items: 5,
    },
    {
      id: 64,
      name: "C# Tutorials",
      displayIndex: 0,
      isGroup: false,
      parentId: 69,
      items: 2,
    },
    {
      id: 10,
      name: "Cloud services",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 14,
    },
    {
      id: 12,
      name: "Coding problems",
      displayIndex: 0,
      isGroup: false,
      parentId: 71,
      items: 5,
    },
    {
      id: 8,
      name: "Companies",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 2,
    },
    {
      id: 5,
      name: "CSS",
      displayIndex: 0,
      isGroup: false,
      parentId: 70,
      items: 14,
    },
    {
      id: 76,
      name: "Dev News",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 1,
    },
    {
      id: 72,
      name: "DevOps",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 1,
    },
    {
      id: 74,
      name: "Example Repos",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 1,
    },
    {
      id: 7,
      name: "HTML",
      displayIndex: 0,
      isGroup: false,
      parentId: 70,
      items: 3,
    },
    {
      id: 2,
      name: "JS Docs",
      displayIndex: 0,
      isGroup: false,
      parentId: 70,
      items: 44,
    },
    {
      id: 6,
      name: "Learning Resources",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 13,
    },
    {
      id: 77,
      name: "MDN Docs",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 0,
    },
    {
      id: 4,
      name: "Other",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 0,
    },
    {
      id: 1,
      name: "Portfolios",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 24,
    },
    {
      id: 14,
      name: "Project Management",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 1,
    },
    {
      id: 9,
      name: "Projects",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 5,
    },
    {
      id: 15,
      name: "Solutions to problems",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 1,
    },
    {
      id: 75,
      name: "Typing Sites",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 3,
    },
  ],
  snippets: [
    {
      id: 3,
      title: null,
      description: "Print rows from CSV",
      code: "import csv\r\n\r\n# Open the CSV file in read mode\r\nwith open('raindrop.csv', 'r') as csvfile:\r\n    # Create a CSV reader object\r\n    csvreader = csv.reader(csvfile)\r\n\r\n    # Iterate through each row in the CSV file\r\n    for row in csvreader:\r\n        # Print out the row\r\n        print(row)\r\n",
      language: "python",
      starred: false,
      dateCreated: "2023-04-04T22:32:20",
      category: {
        id: 88,
        name: "General",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 4,
      title: null,
      description: "Random docker image dotnet",
      code: 'FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build\r\nWORKDIR /app\r\n\r\n# Copy csproj and restore as distinct layers\r\nCOPY *.csproj .\r\nRUN dotnet restore\r\n\r\n# Copy everything else and build\r\nCOPY . .\r\nRUN dotnet publish -c Release -o out\r\n\r\n# Build runtime image\r\nFROM mcr.microsoft.com/dotnet/aspnet:6.0\r\nWORKDIR /app\r\nCOPY --from=build /app/out .\r\n\r\n# Install Google Chrome and necessary fonts for Puppeteer\r\nRUN apt-get update \\\r\n    && apt-get install -y wget gnupg \\\r\n    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \\\r\n    && sh -c \'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list\' \\\r\n    && apt-get update \\\r\n    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \\\r\n      --no-install-recommends \\\r\n    && rm -rf /var/lib/apt/lists/*\r\n\r\n# Set the entry point for the container\r\nENTRYPOINT ["dotnet", "YourWebApp.dll"]\r\n',
      language: "dockerfile",
      starred: false,
      dateCreated: "2023-04-04T22:35:22",
      category: {
        id: 88,
        name: "General",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 5,
      title: null,
      description: "Edited Class Name",
      code: 'public class PlantCategoryRepository : BaseCategoryRepository<PlantCategory>\r\n{\r\n    public PlantCategoryRepository(DbContext dbContext) : base(dbContext, "Plant")\r\n    {\r\n        // edited comment in the class\r\n    }\r\n}\r\n',
      language: "csharp",
      starred: false,
      dateCreated: "2023-04-04T22:47:47",
      category: {
        id: 92,
        name: "C#",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 7,
      title: null,
      description: "Paper box shadow",
      code: ".item {\r\n    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;\r\n}",
      language: "css",
      starred: false,
      dateCreated: "2023-04-06T17:08:17",
      category: {
        id: 91,
        name: "CSS",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 1,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 8,
      title: null,
      description: "Create resizable sidebar in Chakra UI",
      code: "import { Box } from '@chakra-ui/react';\r\nimport { useRef, useState } from 'react';\r\n\r\nfunction App() {\r\n  const [width, setWidth] = useState(200);\r\n  const startX = useRef(0);\r\n  const startWidth = useRef(0);\r\n  const isResizing = useRef(false);\r\n\r\n  const handleMouseDown = (e) => {\r\n    isResizing.current = true;\r\n    startX.current = e.clientX;\r\n    startWidth.current = width;\r\n  };\r\n\r\n  const handleMouseMove = (e) => {\r\n    if (isResizing.current) {\r\n      const newWidth = startWidth.current + e.clientX - startX.current;\r\n      setWidth(newWidth);\r\n    }\r\n  };\r\n\r\n  const handleMouseUp = () => {\r\n    isResizing.current = false;\r\n  };\r\n\r\n  const resizerStyles = {\r\n    position: 'absolute',\r\n    top: 0,\r\n    right: '-5px',\r\n    height: '100%',\r\n    width: '10px',\r\n    cursor: 'ew-resize',\r\n    backgroundColor: '#f1f1f1',\r\n    zIndex: '1',\r\n  };\r\n\r\n  const sidebarStyles = {\r\n    position: 'relative',\r\n    width: `${width}px`,\r\n  };\r\n\r\n  return (\r\n    <Box display=\"flex\">\r\n      <Box style={sidebarStyles} overflow=\"hidden\">\r\n        {/* content for the sidebar */}\r\n        <Box\r\n          style={resizerStyles}\r\n          onMouseDown={handleMouseDown}\r\n          onMouseMove={handleMouseMove}\r\n          onMouseUp={handleMouseUp}\r\n        />\r\n      </Box>\r\n      <Box flex=\"1\">\r\n        {/* content for the main section */}\r\n      </Box>\r\n    </Box>\r\n  );\r\n}\r\n\r\nexport default App;\r\n",
      language: "typescript",
      starred: false,
      dateCreated: "2023-04-06T18:41:55",
      category: {
        id: 90,
        name: "Chakra UI",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 1,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 9,
      title: null,
      description: "Create Dictionary in c#",
      code: '// Create a new dictionary with string keys and int values\r\nDictionary<string, int> myDictionary = new Dictionary<string, int>();\r\n\r\n// Add some key-value pairs to the dictionary\r\nmyDictionary.Add("apple", 1);\r\nmyDictionary.Add("banana", 2);\r\nmyDictionary.Add("orange", 3);\r\n\r\n// Retrieve a value from the dictionary using its key\r\nint value = myDictionary["apple"]; // value is now 1\r\n\r\n// Check if a key exists in the dictionary\r\nbool keyExists = myDictionary.ContainsKey("banana"); // keyExists is now true\r\n\r\n// Remove a key-value pair from the dictionary\r\nmyDictionary.Remove("orange");',
      language: "csharp",
      starred: false,
      dateCreated: "2023-04-17T12:48:32",
      category: {
        id: 92,
        name: "C#",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 10,
      title: null,
      description: "Axios with React Query",
      code: 'import { AxiosResponse } from "axios";\r\n\r\n/**\r\n * Transforms axios api call into a function to be used with useQuery\r\n */\r\nexport const asReactQueryFunction = (\r\n  apiCall: (params) => Promise<AxiosResponse>\r\n) => {\r\n  return async (params) => {\r\n    try {\r\n      const { data } = await apiCall(params);\r\n      return data;\r\n    } catch (error) {\r\n      throw new Error("Could not fetch data");\r\n    }\r\n  };\r\n};\r\n',
      language: "typescript",
      starred: false,
      dateCreated: "2023-04-17T17:08:49",
      category: {
        id: 94,
        name: "Typescript",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 11,
      title: null,
      description: "Prettier",
      code: '{\r\n  "trailingComma": "es5",\r\n  "tabWidth": 2,\r\n  "semi": true,\r\n  "singleQuote": false,\r\n  "bracketSpacing": true,\r\n  "bracketSameLine": false,\r\n  "endOfLine": "crlf"\r\n}\r\n',
      language: "json",
      starred: false,
      dateCreated: "2023-04-21T14:34:33",
      category: {
        id: 93,
        name: "Configs",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 12,
      title: null,
      description: "tsconfig",
      code: '{\r\n  "compilerOptions": {\r\n    "target": "ESNext",\r\n    "lib": ["dom", "dom.iterable", "esnext"],\r\n    "types": [\r\n      "vite/client",\r\n      "vite-plugin-svgr/client",\r\n      "@testing-library/jest-dom",\r\n      "vitest/globals"\r\n    ],\r\n    "baseUrl": "src",\r\n    "allowJs": true,\r\n    "skipLibCheck": true,\r\n    "esModuleInterop": true,\r\n    "allowSyntheticDefaultImports": true,\r\n    "strict": true,\r\n    "forceConsistentCasingInFileNames": true,\r\n    "noFallthroughCasesInSwitch": true,\r\n    "module": "esnext",\r\n    "moduleResolution": "node",\r\n    "resolveJsonModule": true,\r\n    "isolatedModules": true,\r\n    "noEmit": true,\r\n    "jsx": "react-jsx",\r\n    "noImplicitAny": false,\r\n    "strictNullChecks": false,\r\n    "noUnusedLocals": false,\r\n    "noUnusedParameters": false\r\n  },\r\n  "watchOptions": {\r\n    "excludeDirectories": ["**/node_modules", "build"]\r\n  },\r\n  "include": ["src"]\r\n}\r\n',
      language: "json",
      starred: false,
      dateCreated: "2023-04-21T14:37:06",
      category: {
        id: 93,
        name: "Configs",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
    {
      id: 13,
      title: null,
      description: "React Query Optimistic Update",
      code: "const queryClient = useQueryClient()\r\n\r\nuseMutation({\r\n  mutationFn: updateTodo,\r\n  // When mutate is called:\r\n  onMutate: async (newTodo) => {\r\n    // Cancel any outgoing refetches\r\n    // (so they don't overwrite our optimistic update)\r\n    await queryClient.cancelQueries({ queryKey: ['todos'] })\r\n\r\n    // Snapshot the previous value\r\n    const previousTodos = queryClient.getQueryData(['todos'])\r\n\r\n    // Optimistically update to the new value\r\n    queryClient.setQueryData(['todos'], (old) => [...old, newTodo])\r\n\r\n    // Return a context object with the snapshotted value\r\n    return { previousTodos }\r\n  },\r\n  // If the mutation fails,\r\n  // use the context returned from onMutate to roll back\r\n  onError: (err, newTodo, context) => {\r\n    queryClient.setQueryData(['todos'], context.previousTodos)\r\n  },\r\n  // Always refetch after error or success:\r\n  onSettled: () => {\r\n    queryClient.invalidateQueries({ queryKey: ['todos'] })\r\n  },\r\n})",
      language: "typescript",
      starred: false,
      dateCreated: "2023-04-21T17:27:08",
      category: {
        id: 94,
        name: "Typescript",
        displayIndex: 0,
        isGroup: false,
        parentId: 0,
        items: 2,
      },
      dateUpdated: "0001-01-01T00:00:00",
    },
  ],
  snippetCategories: [
    {
      id: 89,
      name: "Group",
      displayIndex: 0,
      isGroup: true,
      parentId: 0,
      items: 0,
    },
    {
      id: 92,
      name: "C#",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 2,
    },
    {
      id: 90,
      name: "Chakra UI",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 1,
    },
    {
      id: 93,
      name: "Configs",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 2,
    },
    {
      id: 91,
      name: "CSS",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 1,
    },
    {
      id: 88,
      name: "General",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 2,
    },
    {
      id: 94,
      name: "Typescript",
      displayIndex: 0,
      isGroup: false,
      parentId: 0,
      items: 2,
    },
  ],
};
