import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {ThemeConfig as MermaidThemeConfig} from '@docusaurus/theme-mermaid';

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = vercelHost ? `https://${vercelHost}` : 'http://localhost:3000';

type ThemeConfig = Preset.ThemeConfig & MermaidThemeConfig;

const config: Config = {
  title: 'Codex Harness 深度指南',
  tagline: '從 agent loop 到 production：理解、使用並延伸 OpenAI Codex harness',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl: '/',
  organizationName: 'indigofeather',
  projectName: 'codex-harness',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
    localeConfigs: {
      'zh-Hant': {label: '繁體中文'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/indigofeather/codex-harness/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
      options: {},
    },
    image: 'img/social-card.svg',
    navbar: {
      title: 'Codex Harness',
      logo: {alt: 'Codex Harness', src: 'img/logo.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: '教材'},
        {to: '/docs/reference/source-map', label: '原始碼導讀', position: 'left'},
        {href: 'https://github.com/openai/codex', label: 'openai/codex', position: 'right'},
        {href: 'https://github.com/indigofeather/codex-harness', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '學習',
          items: [
            {label: '從這裡開始', to: '/docs/intro'},
            {label: '架構總覽', to: '/docs/architecture/system-map'},
            {label: '實戰 Labs', to: '/docs/labs/trace-a-turn'},
          ],
        },
        {
          title: '官方資源',
          items: [
            {label: 'Codex Docs', href: 'https://learn.chatgpt.com/docs/codex'},
            {label: 'Codex GitHub', href: 'https://github.com/openai/codex'},
            {label: 'App Server', href: 'https://learn.chatgpt.com/docs/app-server'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Codex Harness 深度指南。非 OpenAI 官方教材。`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'toml', 'rust', 'typescript', 'python'],
    },
  } satisfies ThemeConfig,
};

export default config;
