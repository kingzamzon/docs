// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Lit Protocol Developer Docs",
  tagline: "Blockchain based access control for the web",
  url: "https://developer.litprotocol.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "lit-protocol", // Usually your GitHub org/user name.
  projectName: "lit-js-sdk", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/LIT-Protocol/docs/edit/main/website/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Lit Protocol Developer Docs",
        logo: {
          alt: "Lit Protocol",
          src: "img/logo.svg",
        },
        items: [
          // {
          //   type: "doc",
          //   docId: "intro",
          //   position: "left",
          //   label: "Get Started",
          // },
          // {
          //   type: "doc",
          //   docId: "SDK/intro",
          //   position: "left",
          //   label: "JS SDK",
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: "https://github.com/LIT-Protocol/lit-js-sdk",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Get Started",
                to: "/docs/intro",
              },
              {
                label: "JS SDK",
                to: "/docs/SDK/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              // {
              //   label: "Stack Overflow",
              //   href: "https://stackoverflow.com/questions/tagged/docusaurus",
              // },
              {
                label: "Discord",
                href: "https://litgateway.com/discord",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/litprotocol",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "https://blog.litprotocol.com/",
              },
              {
                label: "GitHub",
                href: "https://github.com/LIT-Protocol/lit-js-sdk",
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  // plugins: [
  //   [ // This plugin does NOT work.  I am using netlify redirects instead.
  //     "@docusaurus/plugin-client-redirects",
  //     {
  //       redirects: [
  //         // /docs/oldDoc -> /docs/newDoc
  //         {
  //           to: "/docs/accessControlConditionExamples",
  //           from: "/docs/SDK/accessControlConditionExamples",
  //         },
  //         // Redirect from multiple old paths to the new path
  //         // {
  //         //   to: '/docs/newDoc2',
  //         //   from: ['/docs/oldDocFrom2019', '/docs/legacyDocFrom2016'],
  //         // },
  //       ],
  //     },
  //   ],
  // ],
};

module.exports = config;
