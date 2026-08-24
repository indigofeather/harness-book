import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'learning-map',
    'catalog',
    'reference/llm-resources',
    {
      type: 'category',
      label: '一、Agent Harness｜共同基礎',
      collapsed: true,
      items: [
        'foundations/what-is-harness',
        'foundations/agent-loop',
        'foundations/context-and-caching',
        'foundations/state-models-and-lifecycle',
      ],
    },
    {
      type: 'category',
      label: '二、Codex｜Productized Runtime 完整導讀',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '架構與 Runtime',
          collapsed: true,
          items: [
            'architecture/system-map',
            'architecture/official-visuals',
            'architecture/codex-core',
            'architecture/model-provider-and-streaming',
            'architecture/tool-execution',
            'architecture/state-and-persistence',
            'architecture/app-server-and-protocol',
            'architecture/client-surfaces',
          ],
        },
        {
          type: 'category',
          label: '安全、權限與信任邊界',
          collapsed: true,
          items: [
            'security/sandbox-and-approvals',
            'security/permissions-rules-network',
            'security/trust-boundaries',
          ],
        },
        {
          type: 'category',
          label: '客製化與擴充',
          collapsed: true,
          items: [
            'customization/config',
            'customization/agents-md',
            'customization/skills-and-plugins',
            'customization/mcp',
            'customization/hooks',
            'customization/subagents-and-worktrees',
          ],
        },
        {
          type: 'category',
          label: '使用與整合',
          collapsed: true,
          items: [
            'usage/cli',
            'usage/noninteractive-ci',
            'usage/sdk',
            'usage/app-server',
            'usage/github-actions',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '三、DeepSeek Harness｜Composable Runtime 完整導讀',
      collapsed: true,
      items: [
        'deepseek/overview',
        {
          type: 'category',
          label: '架構與 Runtime',
          collapsed: true,
          items: [
            'deepseek/official-visuals',
            'deepseek/architecture',
            'deepseek/model-and-agent-loop',
            'deepseek/tool-execution',
            'deepseek/context-and-compaction',
            'deepseek/session-and-events',
            'deepseek/usage-and-profiles',
          ],
        },
        {
          type: 'category',
          label: '擴充與 Orchestration',
          collapsed: true,
          items: [
            'deepseek/models-skills-and-extensions',
            'deepseek/subagents-workflows-and-jobs',
            'deepseek/code-mode-and-plugins',
          ],
        },
        {
          type: 'category',
          label: '安全與 Execution World',
          collapsed: true,
          items: [
            'deepseek/security-and-approvals',
            'deepseek/execution-worlds-and-credentials',
          ],
        },
        {
          type: 'category',
          label: '使用、整合與 Production',
          collapsed: true,
          items: [
            'deepseek/headless-and-automation',
            'deepseek/integration-surfaces',
            'deepseek/production-and-testing',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '四、Pi｜Minimal Runtime 完整導讀',
      collapsed: true,
      items: [
        'pi/overview',
        {
          type: 'category',
          label: '架構、Model、Loop 與 State',
          collapsed: true,
          items: [
            'pi/official-visuals',
            'pi/architecture',
            'pi/model-providers',
            'pi/agent-loop-and-tools',
            'pi/context-compaction-and-branching',
            'pi/session-and-extensions',
          ],
        },
        {
          type: 'category',
          label: 'Resources、Extensions 與 UI',
          collapsed: true,
          items: [
            'pi/resources-skills-and-packages',
            'pi/extensions-and-ui',
          ],
        },
        {
          type: 'category',
          label: '安全、使用、整合與 Production',
          collapsed: true,
          items: [
            'pi/project-trust-and-isolation',
            'pi/cli-and-usage',
            'pi/sdk-and-rpc',
            'pi/production-and-governance',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '五、三套 Harness｜實戰 Labs',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Codex Labs',
          collapsed: true,
          items: [
            'labs/trace-a-turn',
            'labs/guardrails',
            'labs/embed-app-server',
          ],
        },
        {
          type: 'category',
          label: 'DeepSeek Harness Labs',
          collapsed: true,
          items: [
            'deepseek/labs/trace-turn-step',
            'deepseek/labs/capability-plugin',
            'deepseek/labs/replay-invariant',
          ],
        },
        {
          type: 'category',
          label: 'Pi Labs',
          collapsed: true,
          items: [
            'pi/labs/session-tree',
            'pi/labs/extension',
            'pi/labs/branch-compaction',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '六、三種 Harness｜比較、選型與採用',
      collapsed: true,
      items: [
        'comparison/overview',
        'comparison/architecture-comparison',
        'comparison/scenario-selection',
        'comparison/adoption-playbook',
      ],
    },
    {
      type: 'category',
      label: '七、Harness｜真實系統與實務',
      collapsed: true,
      items: [
        'applications/workflows',
        'applications/where-should-behavior-live',
        'applications/build-your-own-harness',
        'applications/production-checklist',
      ],
    },
    {
      type: 'category',
      label: '八、參考資料、官方來源與原始碼',
      collapsed: true,
      items: [
        'reference/glossary',
        'reference/source-reading',
        'reference/source-map',
        'reference/deepseek-source-map',
        'reference/pi-source-map',
        'reference/reading-list',
      ],
    },
  ],
};

export default sidebars;
