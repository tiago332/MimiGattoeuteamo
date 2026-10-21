# Mirelly Gatto — álbum de recordações

Site em **Vite + React + TypeScript + Tailwind CSS v4**, com estrutura **shadcn** (`components.json`, `@/components/ui`, `@/lib/utils`).
Fundo animado com o componente `celestial-resonance` (partículas).

> ⚠️ **Não publicado.** Este repositório não tem remote nem deploy configurado de propósito.

## Rodar

```bash
npm install
npm run dev
```

Abra http://localhost:5173. O `npm run dev` já libera o acesso pela rede: no celular (mesmo Wi-Fi) use o endereço "Network" que aparece no terminal.

Outros comandos:

```bash
npm run build     # verifica os tipos e gera a versão final em dist/
npm run preview   # serve a versão final de dist/
```

## Trocar as frases

**Todos os textos ficam em `src/content.ts`.** Troque o que estiver entre aspas e salve.
Lá também dá pra escolher quais fotos aparecem no leque do topo (`fotosLeque`) e as legendas das fotos.

## Estrutura

```
public/                      fotos (foto_1..6.jpeg) e música (musica2.mp3)
src/content.ts               TODOS os textos
src/App.tsx                  monta a página, fundo de partículas e música
src/components/              Opening, Hero, Letter, Gallery (+ foto ampliada), Reasons, MusicPlayer, Reveal
src/components/ui/           componentes estilo shadcn (celestial-resonance + demo)
src/lib/utils.ts             cn() do shadcn
src/index.css                Tailwind, cores e animações
components.json              config do shadcn CLI
```

### Por que `src/components/ui`?

É a pasta padrão do shadcn. O CLI (`npx shadcn@latest add button`, por exemplo) instala os componentes
direto nela e os imports seguem o padrão `@/components/ui/...`. Mantendo esse caminho, qualquer componente
de shadcn ou de bibliotecas compatíveis (21st.dev, Magic UI etc.) entra copiando e colando, sem ajustar imports.

### Ajustes feitos no `celestial-resonance`

- `canvas!` dentro de `init()`: o original não passava no TypeScript em modo estrito.
- `handleResize` ignora mudanças pequenas só na altura: no celular a barra de endereço some/aparece ao rolar
  e o original reiniciava todas as partículas, fazendo o fundo piscar.
- No `App.tsx` o número de partículas cai no celular (450) e para quem usa "reduzir movimento" (200).

## Versionamento

- `main` — versão original (tag `v1-original`)
- `redesign` — álbum em HTML/CSS/JS puro (fundo creme)
- `react` — esta versão (React + partículas)

Quando a conta nova do GitHub estiver pronta:

```bash
git remote add origin https://github.com/USUARIO-NOVO/NOME-DO-REPO.git
git push -u origin react
```

Crie o repositório como **privado** se não quiser que ninguém veja antes da hora.
