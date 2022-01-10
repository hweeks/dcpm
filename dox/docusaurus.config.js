// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docker Compose Package Manager',
  tagline: 'share your complex setup, simply.',
  url: 'https://docs.dcpm.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hweeks', // Usually your GitHub org/user name.
  projectName: 'dcpm', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/hweeks/dcpm/tree/main/dox/src',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/hweeks/dcpm/tree/main/dox/src',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'DCPM Docs',
        logo: {
          alt: 'dcpm',
          src: 'img/logo.svg', // update asset
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Introduction',
          },
          {to: '/docs/use', label: 'Use', position: 'left'},
          {
            href: 'https://github.com/hweeks/dcpm',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/index',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/hweeks/dcpm',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DCPM, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
