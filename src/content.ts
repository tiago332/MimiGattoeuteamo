// =====================================================================
// TODOS OS TEXTOS DO SITE FICAM AQUI.
// Troque o que estiver entre aspas e salve: o site atualiza sozinho.
// =====================================================================

export const conteudo = {
  tituloAba: "Para minha melhor amiga",

  abertura: {
    texto: "tem uma coisinha aqui pra você, Mi",
    botao: "abrir",
    semMusica: "abrir sem música",
    inicialSelo: "M",
  },

  hero: {
    eyebrow: "para a melhor amiga do mundo",
    nome: "Mirelly",
    sobrenome: "Gatto",
    subtitulo:
      "Um cantinho só nosso pra guardar as fotos, as risadas e os motivos de eu te amar tanto.",
    rolar: "role pra baixo",
    // quais fotos aparecem no leque do topo (números de 1 a 6)
    fotosLeque: [1, 3, 5],
  },

  carta: {
    titulo: "uma cartinha pra você",
    paragrafos: [
      "Mi, em primeiro lugar, sou infinitamente grato a Deus por ter colocado você na minha vida como amiga. Sinceramente, não sei o que seria de mim sozinho nesses últimos tempos, nem com quem compartilharia meus dias.",
      "Estar ao seu lado me faz muito feliz, e é um presente que quero cuidar para a vida toda.",
      "Eu te amo demais! Obrigado por sempre me ouvir, me apoiar e estar presente. Fiz este texto de coração renovado para você. Vou te amar para sempre.",
    ],
    destaque: "I will love you forever.",
    assinaturaAntes: "com carinho,",
    assinatura: "SEU SEVEN",
  },

  fotos: {
    titulo: "nossos momentos",
    dica: "arraste pro lado e toque pra ampliar",
    // uma legenda por foto, na ordem foto_1 ... foto_6
    legendas: ["momento 01", "momento 02", "momento 03", "momento 04", "momento 05", "momento 06"],
  },

  motivos: {
    titulo: "motivos pra te amar",
    dica: "toque em cada cartinha pra virar",
    lista: [
      "Ver você se aprofundando mais em Deus a cada dia me enche de orgulho.",
      "Você nunca me faltou: sempre esteve pronta para me ajudar e me acolher com compreensão.",
      "Foi a única mulher que soube me trazer esperança nos meus piores momentos.",
      "E o mais importante de tudo: o seu coração é lindo, humilde e transborda amor e gentileza por onde passa, especialmente com as crianças.",
    ],
  },

  versiculo: {
    texto: "“Em todo tempo ama o amigo, e na angústia se nasce o irmão.”",
    referencia: "Provérbios 17:17",
  },

  rodape: {
    texto: "TE AMO GAROTINHAAAA",
    emojis: "💙🤍",
  },

  musica: {
    arquivo: "musica2.mp3",
    titulo: "nossa música pra sempre",
    subtitulo: "always",
  },
} as const;

export const fotos = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `${import.meta.env.BASE_URL}foto_${n}.jpeg`,
  alt: `foto ${n}`,
  legenda: conteudo.fotos.legendas[n - 1],
}));
