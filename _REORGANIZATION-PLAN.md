# Shared-Docs Reorganisation Plan

**Erstellt:** 2026-04-11
**Ziel:** Bessere Ordnerstruktur, weniger Top-Level-Unordnung, klarere Kategorisierung

---

## Neue Top-Level-Struktur

```
shared-docs/
├── CODING-RULES.md              ← Bleibt root (wird von AGENTS.md referenziert)
├── README.md                    ← Bleibt root
│
├── ai/                          ← ALLE KI/Agentic-Themen
│   ├── architecture/            ← ai-architecture/
│   ├── integration/             ← ai-integration/
│   ├── agentic-file-systems/    ← agentic-file-systems/
│   ├── openui/                  ← openui-docs/
│   ├── prompts/                 ← prompts/
│   └── providers/               ← codex/ (Provider-Recherche)
│
├── agents/                      ← Agent-Definitionen & Commands
│   ├── roles/                   ← Agent-Rollen-Definitionen (root .md files)
│   ├── commands/                ← agents/commands/
│   ├── browser/                 ← agents/agent-browser/
│   ├── uni-ai-chat/             ← agents/.uniai-chat/
│   ├── shared-docs/             ← agents/shared-docs/
│   └── implementation-plans/    ← agents/implementation-plans/
│
├── rules/                       ← Alle Coding-Regeln & Best Practices
│   ├── frontend/                ← frontend/, refactoring-docs/rules/
│   ├── nextjs/                  ← skills/nextjs-rules/
│   ├── expo/                    ← expo/
│   ├── capacitor/               ← performance/capacitor-performance-rules.md
│   ├── react-native/            ← skills/vercel-react-native-skills/
│   └── critical/                ← wichtig/KRITISCHE-REGELN.md
│
├── react/                       ← React-spezifische Patterns
│   ├── communication/           ← react-component-communication-patterns.md, react-core-communication-patterns.md
│   ├── patterns/                ← react-patterns/, react-useEffect/
│   └── skills/                  ← skills/react-no-use-effect/
│
├── design/                      ← Design-Guides & Mockups
│   ├── guides/                  ← design/liquid-glass-guide.md, auto-animate, responsive-dialog
│   ├── mockups/                 ← mock-designs/, liquid-glass-*.png (root)
│   └── ux/                      ← ux/, design-system docs
│
├── performance/                 ← Performance-Dokumentation
│   ├── capacitor/               ← capacitor-performance-rules.md
│   ├── caching/                 ← caching/
│   ├── network/                 ← network-performance-analysis.md
│   └── gfx/                     ← GFX-SYSTEM-UNIVERSAL-PORTING-GUIDE.md
│
├── testing/                     ← Testing-Guides
│   ├── browser/                 ← browser-testing/
│   ├── accounts/                ← testing/TEST-ACCOUNT-SYSTEM.md
│   └── database/                ← database-testing-guide.md
│
├── upgrades/                    ← Upgrade/Migrations-Pläne
│   ├── nextjs-16/               ← nextjs-16-upgrade/
│   ├── vite/                    ← vite-upgrade/
│   └── tanstack/                ← tanstack/
│
├── tutorials/                   ← Lernmaterial
│   └── github/                  ← github-tutorial/
│
├── skills/                      ← MCP/Agent Skills
│   ├── notedrill-design/        ← skills/notedrill-design-styling/
│   ├── react-no-use-effect/     ← (Symlink von react/skills/)
│   ├── nextjs-rules/            ← (Symlink von rules/nextjs/)
│   └── misc/                    ← git-upstream-merge-skill.md, nextjs-hmr-throttle-skill.md
│
├── refactoring/                 ← Refactoring-Dokumentation
│   ├── rules/                   ← refactoring-docs/rules/
│   ├── patterns/                ← refactoring-docs/patterns/
│   ├── mistakes/                ← refactoring-docs/mistakes/
│   ├── tips/                    ← refactoring-docs/tips/
│   ├── prompts/                 ← refactoring-docs/prompts/
│   ├── global-coding-rules.md   ← refactoring-docs/global-coding-rules.md
│   └── zoom-system/             ← refactoring-docs/zoom-system-architecture.md
│
├── postmortems/                 ← Debugging-Nachbereitungen (vereint post-mortem/ + postmortem/)
│
├── capacitor/                   ← Capacitor-spezifisch
│   └── init-next-js/            ← capacitor-init-next-js/
│
├── technologies/                ← Technologie-Referenzdocs
│
├── scripts/                     ← Build/Cleanup-Skripte
│
├── archive/                     ← Backups, alte Files, Compiled-Artefakte
│   ├── backups/                 ← backups/
│   └── compiled/                ← components/*.js, *.js.map
│
└── reference/                   ← Verschiedenes
    ├── pretext/                 ← pretext/
    ├── lightpanda/              ← lightpanda/
    └── plans/                   ← plans/
```

## Datei-Verschiebungen im Detail

### Gruppe 1: AI/Agentic → `ai/`
| Von | Nach |
|-----|------|
| `ai-architecture/*` | `ai/architecture/*` |
| `ai-integration/*` | `ai/integration/*` |
| `agentic-file-systems/*` | `ai/agentic-file-systems/*` |
| `openui-docs/*` | `ai/openui/*` |
| `prompts/*` | `ai/prompts/*` |
| `codex/*` | `ai/providers/codex/*` |

### Gruppe 2: Agent-Definitionen → `agents/` (strukturieren)
| Von | Nach |
|-----|------|
| `agents/*.md` (root agent files) | `agents/roles/` |
| `agents/.uniai-chat/*` | `agents/uni-ai-chat/` |
| `agents/agent-browser/*` | `agents/browser/` |
| `agents/commands/*` | `agents/commands/*` (bleibt) |
| `agents/shared-docs/*` | `agents/shared-docs/*` (bleibt) |
| `agents/implementation-plans/*` | `agents/implementation-plans/*` (bleibt) |

### Gruppe 3: Rules → `rules/`
| Von | Nach |
|-----|------|
| `frontend/FRONTEND-RULES.md` | `rules/frontend/FRONTEND-RULES.md` |
| `wichtig/KRITISCHE-REGELN.md` | `rules/critical/KRITISCHE-REGELN.md` |
| `skills/nextjs-rules/*` | `rules/nextjs/*` |
| `expo/EXPO-RULES.md` | `rules/expo/EXPO-RULES.md` |
| `performance/capacitor-performance-rules.md` | `rules/capacitor/capacitor-performance-rules.md` |
| `skills/vercel-react-native-skills/*` | `rules/react-native/*` |
| `refactoring-docs/rules/*` | `refactoring/rules/*` (bleibt bei refactoring) |

### Gruppe 4: React → `react/`
| Von | Nach |
|-----|------|
| `react-component-communication-patterns.md` | `react/communication/component-communication-patterns.md` |
| `react-core-communication-patterns.md` | `react/communication/core-communication-patterns.md` |
| `react-patterns/*` | `react/patterns/*` |
| `react-useEffect/*` | `react/patterns/useEffect/*` |
| `skills/react-no-use-effect/*` | `react/skills/*` |

### Gruppe 5: Design → `design/`
| Von | Nach |
|-----|------|
| `design/*` (bestehende files) | `design/guides/*` |
| `mock-designs/*` | `design/mockups/*` |
| `liquid-glass-*.png` (8 root files) | `design/mockups/liquid-glass/` |
| `ux/*` | `design/ux/*` |

### Gruppe 6: Performance → `performance/`
| Von | Nach |
|-----|------|
| `caching/*` | `performance/caching/*` |
| `GFX-SYSTEM-UNIVERSAL-PORTING-GUIDE.md` | `performance/gfx/GFX-SYSTEM-UNIVERSAL-PORTING-GUIDE.md` |
| `network-performance-analysis-guide.md` | `performance/network/network-performance-analysis-guide.md` |
| `tab-component-performance-antipattern.md` | `performance/tab-component-performance-antipattern.md` |

### Gruppe 7: Testing → `testing/`
| Von | Nach |
|-----|------|
| `testing/TEST-ACCOUNT-SYSTEM.md` | `testing/accounts/TEST-ACCOUNT-SYSTEM.md` |
| `browser-testing/*` | `testing/browser/*` |
| `database-testing-guide.md` | `testing/database/database-testing-guide.md` |

### Gruppe 8: Upgrades → `upgrades/`
| Von | Nach |
|-----|------|
| `nextjs-16-upgrade/*` | `upgrades/nextjs-16/*` |
| `vite-upgrade/*` | `upgrades/vite/*` |
| `tanstack/*` | `upgrades/tanstack/*` |

### Gruppe 9: Tutorials → `tutorials/`
| Von | Nach |
|-----|------|
| `github-tutorial/*` | `tutorials/github/*` |

### Gruppe 10: Postmortems → `postmortems/` (vereinen)
| Von | Nach |
|-----|------|
| `post-mortem/*` | `postmortems/*` |
| `postmortem/*` | `postmortems/*` |

### Gruppe 11: Refactoring → `refactoring/`
| Von | Nach |
|-----|------|
| `refactoring-docs/*` → `refactoring/*` (komplett) |

### Gruppe 12: Capacitor → `capacitor/`
| Von | Nach |
|-----|------|
| `capacitor-init-next-js/*` | `capacitor/init-next-js/*` |

### Gruppe 13: Archive → `archive/`
| Von | Nach |
|-----|------|
| `backups/*` | `archive/backups/*` |
| `components/*.js, *.js.map` | `archive/compiled/*` |

### Gruppe 14: Reference → `reference/`
| Von | Nach |
|-----|------|
| `pretext/*` | `reference/pretext/*` |
| `lightpanda/*` | `reference/lightpanda/*` |
| `plans/*` | `reference/plans/*` |

## Wichtige Hinweise

1. **CODING-RULES.md bleibt im Root** - wird von AGENTS.md direkt referenziert
2. **README.md bleibt im Root** - Submodule-Dokumentation
3. **Pfad-Referenzen in CLAUDE.md und AGENTS.md müssen aktualisiert werden**
4. **Skills-Ordner:** Einige Skills werden als Symlinks zu den neuen Orten geführt
