import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {ThemeConfig as MermaidThemeConfig} from '@docusaurus/theme-mermaid';
import sidebars from './sidebars';

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = vercelHost ? `https://${vercelHost}` : 'http://localhost:3000';

type ThemeConfig = Preset.ThemeConfig & MermaidThemeConfig;
type SidebarEntry =
  | string
  | {
      type?: string;
      label?: string;
      items?: SidebarEntry[];
    };

const tutorialSidebar =
  (sidebars as {tutorialSidebar?: SidebarEntry[]}).tutorialSidebar ?? [];

function collectSidebarDocIds(items: SidebarEntry[]): string[] {
  return items.flatMap((item) => {
    if (typeof item === 'string') {
      return [item];
    }

    return item.items ? collectSidebarDocIds(item.items) : [];
  });
}

function readDocTitle(id: string): string {
  for (const extension of ['.md', '.mdx']) {
    const filename = path.resolve(process.cwd(), 'docs', `${id}${extension}`);
    if (!existsSync(filename)) {
      continue;
    }

    const source = readFileSync(filename, 'utf8');
    const frontMatter = source.match(/^---\s*\n([\s\S]*?)\n---/);
    const title = frontMatter?.[1].match(/^title:\s*(.+)$/m)?.[1]?.trim();

    if (title) {
      return title.replace(/^['"]|['"]$/g, '');
    }

    const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim();
    if (heading) {
      return heading.replace(/`/g, '');
    }
  }

  return id.split('/').at(-1) ?? id;
}

function renderSidebarForLlms(items: SidebarEntry[], depth = 0): string[] {
  return items.flatMap((item) => {
    const indent = '  '.repeat(depth);

    if (typeof item === 'string') {
      return [`${indent}- [${readDocTitle(item)}](/docs/${item}.md)`];
    }

    const categoryLine = `${indent}- ${item.label ?? 'Untitled section'}`;
    const children = item.items
      ? renderSidebarForLlms(item.items, depth + 1)
      : [];

    return [categoryLine, ...children];
  });
}

const sidebarDocIds = collectSidebarDocIds(tutorialSidebar);
const llmsSidebar = renderSidebarForLlms(tutorialSidebar).join('\n');
const llmsRootContent = `繁體中文 Agent Harness 教材，以 OpenAI Codex、DeepSeek Harness 與 Pi 三套開源實作，系統化介紹 Agent Loop、Context、Tools、State、Security、Extensions、Integration、官方視覺素材與原始碼閱讀。\n\nSidebar navigation（網站的 canonical reading order）：\n${llmsSidebar}`;
const llmsFullRootContent = `這是 Agent Harness 深度指南的完整 Markdown 合併版。內容依網站 Sidebar 的 canonical reading order 排列，涵蓋 Codex、DeepSeek Harness、Pi、三方比較、實務應用與原始碼導讀，適合直接提供給 LLM 作為完整教材 context。\n\nSidebar navigation：\n${llmsSidebar}`;

const config: Config = {
  title: 'Agent Harness 深度指南',
  tagline: '以 Codex、DeepSeek Harness 與 Pi 理解 Agent Runtime、架構取捨與 production integration',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl: '/',
  organizationName: 'indigofeather',
  projectName: 'harness-book',
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

  plugins: [
    [
      'docusaurus-plugin-llms',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        preserveDirectoryStructure: true,
        addMdExtension: true,
        docsDir: 'docs',
        title: 'Agent Harness 深度指南',
        description:
          '以 OpenAI Codex、DeepSeek Harness 與 Pi 三套開源實作理解 Agent Harness architecture、使用方式、擴充、安全、整合、官方素材與原始碼。',
        includeOrder: sidebarDocIds.map((id) => `${id}.md`),
        includeUnmatchedLast: false,
        excludeImports: true,
        removeDuplicateHeadings: true,
        rootContent: llmsRootContent,
        fullRootContent: llmsFullRootContent,
      },
    ],
    [
      'docusaurus-plugin-copy-page-button',
      {
        enabledActions: [
          'copy',
          'view',
          'chatgpt',
          'claude',
          'perplexity',
          'gemini',
        ],
        markdownUrl: true,
        placement: 'article',
        labels: {
          button: {label: '提供給 AI'},
          copy: {
            title: '複製 Markdown',
            description: '將本頁原始內容以 Markdown 複製到剪貼簿',
          },
          view: {
            title: '查看 Markdown',
            description: '在新分頁開啟本頁的純 Markdown 版本',
          },
          chatgpt: {
            title: '在 ChatGPT 開啟',
            description: '將本頁 Markdown 作為 ChatGPT 的參考內容',
          },
          claude: {
            title: '在 Claude 開啟',
            description: '將本頁 Markdown 作為 Claude 的參考內容',
          },
          perplexity: {
            title: '在 Perplexity 開啟',
            description: '將本頁 Markdown 作為 Perplexity 的參考內容',
          },
          gemini: {
            title: '在 Gemini 開啟',
            description: '將本頁 Markdown 作為 Gemini 的參考內容',
          },
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/indigofeather/harness-book/tree/main/',
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
        {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: '教材目錄'},
        {
          type: 'dropdown',
          label: '三套 Harness',
          position: 'left',
          items: [
            {label: 'Codex｜架構總覽', to: '/docs/architecture/system-map'},
            {label: 'Codex｜官方介面', to: '/docs/architecture/official-visuals'},
            {label: 'DeepSeek Harness｜導讀', to: '/docs/deepseek/overview'},
            {label: 'DeepSeek Harness｜官方畫面', to: '/docs/deepseek/official-visuals'},
            {label: 'Pi｜導讀', to: '/docs/pi/overview'},
            {label: 'Pi｜官方畫面', to: '/docs/pi/official-visuals'},
          ],
        },
        {
          type: 'dropdown',
          label: '比較與選型',
          position: 'left',
          items: [
            {label: '第九章導讀｜比較框架', to: '/docs/comparison/overview'},
            {label: '架構維度逐項比較', to: '/docs/comparison/architecture-comparison'},
            {label: '情境式選型', to: '/docs/comparison/scenario-selection'},
            {label: 'PoC、採用與混用策略', to: '/docs/comparison/adoption-playbook'},
          ],
        },
        {to: '/docs/reference/source-reading', label: '原始碼導讀', position: 'left'},
        {
          type: 'dropdown',
          label: 'AI / LLM',
          position: 'right',
          items: [
            {
              label: 'AI / LLM 資源說明',
              to: '/docs/reference/llm-resources',
            },
            {
              label: 'llms.txt｜教材索引',
              href: `${siteUrl}/llms.txt`,
            },
            {
              label: 'llms-full.txt｜完整教材',
              href: `${siteUrl}/llms-full.txt`,
            },
          ],
        },
        {href: 'https://github.com/indigofeather/harness-book', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '學習',
          items: [
            {label: '從這裡開始', to: '/docs/intro'},
            {label: '學習地圖', to: '/docs/learning-map'},
            {label: '完整教材目錄', to: '/docs/catalog'},
            {label: '第九章｜比較框架', to: '/docs/comparison/overview'},
            {label: '情境式選型', to: '/docs/comparison/scenario-selection'},
            {label: 'Harness 實務應用', to: '/docs/applications/workflows'},
          ],
        },
        {
          title: '三套 Harness',
          items: [
            {label: 'Codex｜架構總覽', to: '/docs/architecture/system-map'},
            {label: 'Codex｜官方介面', to: '/docs/architecture/official-visuals'},
            {label: 'DeepSeek Harness｜導讀', to: '/docs/deepseek/overview'},
            {label: 'DeepSeek Harness｜官方畫面', to: '/docs/deepseek/official-visuals'},
            {label: 'Pi｜導讀', to: '/docs/pi/overview'},
            {label: 'Pi｜官方畫面', to: '/docs/pi/official-visuals'},
          ],
        },
        {
          title: '原始碼 / AI',
          items: [
            {label: '三套 Harness 原始碼導讀', to: '/docs/reference/source-reading'},
            {label: 'Codex Source Map', to: '/docs/reference/source-map'},
            {label: 'DeepSeek Source Map', to: '/docs/reference/deepseek-source-map'},
            {label: 'Pi Source Map', to: '/docs/reference/pi-source-map'},
            {label: 'AI / LLM 資源', to: '/docs/reference/llm-resources'},
            {label: 'llms.txt', href: `${siteUrl}/llms.txt`},
            {label: 'llms-full.txt', href: `${siteUrl}/llms-full.txt`},
          ],
        },
        {
          title: '官方資源',
          items: [
            {label: 'Codex Docs', href: 'https://developers.openai.com/codex'},
            {label: 'Codex GitHub', href: 'https://github.com/openai/codex'},
            {label: 'DeepSeek Harness', href: 'https://deepseek.com/harness/en/'},
            {label: 'DeepSeek Harness GitHub', href: 'https://github.com/deepseek-ai/deepseek-harness'},
            {label: 'Pi Docs', href: 'https://pi.dev/docs/latest'},
            {label: 'Pi GitHub', href: 'https://github.com/earendil-works/pi'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Agent Harness 深度指南。非 OpenAI、DeepSeek 或 Pi 官方教材。製作者：<a href="mailto:indigofeather@gmail.com">Lance He</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'toml', 'rust', 'typescript', 'python'],
    },
  } satisfies ThemeConfig,
};

export default config;
