# Mirelly Gatto — álbum de recordações

Site estático (HTML + CSS + JS, sem build). Visual novo em estilo álbum, pensado primeiro para celular.

> ⚠️ **Não publicado.** Este repositório não tem remote nem deploy configurado de propósito.

## Estrutura

```
index.html        conteúdo e textos (procure por <!-- FRASE -->)
css/style.css     visual (cores no topo, em :root)
js/main.js        abertura, música, carrossel, cartas que viram, foto ampliada
foto_1..6.jpeg    fotos
musica2.mp3       música
```

## Trocar as frases

Abra `index.html` e procure por `FRASE`. Cada texto marcado é provisório.
As legendas das fotos ficam em dois lugares em cada polaroid: `data-legenda="..."` e no `<figcaption>`.

## Ver no computador / celular

```bash
python -m http.server 5500
```

Abra http://localhost:5500. Para testar no celular na mesma rede Wi-Fi, rode com
`python -m http.server 5500 --bind 0.0.0.0` e acesse `http://IP-DO-PC:5500`.

## Versionamento

- `main` — versão original (tag `v1-original`)
- `redesign` — versão nova

Quando a conta nova do GitHub estiver pronta:

```bash
git remote add origin https://github.com/USUARIO-NOVO/NOME-DO-REPO.git
git push -u origin redesign
```

Crie o repositório como **privado** se não quiser que ninguém veja antes da hora.
