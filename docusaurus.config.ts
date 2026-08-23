import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {ThemeConfig as MermaidThemeConfig} from '@docusaurus/theme-mermaid';

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = vercelHost ? `https://${vercelHost}` : 'http://localhost:3000';

type ThemeConfig = Preset.ThemeConfig & MermaidThemeConfig;

const config: Config = {
  title: 'Agent Harness 深度指南',
  tagline: '以 Codex 與 DeepSeek Harness 理解 Agent Runtime、架構取捨與 production integration',
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
      title: 'Agent Harness',
      logo: {alt: 'Agent Harness', src: 'img/logo.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: '教材'},
        {to: '/docs/deepseek/overview', label: 'DeepSeek Harness', position: 'left'},
        {to: '/docs/comparison/codex-vs-deepseek', label: 'Codex vs DeepSeek', position: 'left'},
        {to: '/docs/reference/source-reading', label: '原始碼導讀', position: 'left'},
        {href: 'https://github.com/openai/codex', label: 'openai/codex', position: 'right'},
        {href: 'https://github.com/deepseek-ai/deepseek-harness', label: 'deepseek-harness', position: 'right'},
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
            {label: 'Codex 架構總覽', to: '/docs/architecture/system-map'},
            {label: 'DeepSeek Harness', to: '/docs/deepseek/overview'},
            {label: '兩者比較', to: '/docs/comparison/codex-vs-deepseek'},
            {label: '雙 Harness 原始碼導讀', to: '/docs/reference/source-reading'},
          ],
        },
        {
          title: '官方資源',
          items: [
            {label: 'Codex Docs', href: 'https://learn.chatgpt.com/docs/codex'},
            {label: 'Codex GitHub', href: 'https://github.com/openai/codex'},
            {label: 'DeepSeek Harness', href: 'https://deepseek.com/harness/en/'},
            {label: 'DeepSeek Harness GitHub', href: 'https://github.com/deepseek-ai/deepseek-harness'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Agent Harness 深度指南。非 OpenAI 或 DeepSeek 官方教材。`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'toml', 'rust', 'typescript', 'python'],
    },
  } satisfies ThemeConfig,
};

export default config;
