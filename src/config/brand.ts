/**
 * Única fonte de verdade para identidade, contato, legal e flags do site.
 * Nenhum valor deste arquivo deve ser duplicado em componentes.
 */
export const brand = {
  product: {
    name: "[PREENCHER]",
    domain: "[PREENCHER]",
    slogan: "[PREENCHER]",
  },

  contact: {
    whatsappVendas: {
      number: "[PREENCHER]",
      display: "[PREENCHER]",
      defaultMessage: "Olá! Quero conhecer a plataforma de atendimento pelo WhatsApp.",
    },
    whatsappSuporte: {
      number: "[PREENCHER]",
      display: "[PREENCHER]",
      defaultMessage: "Olá! Preciso de suporte.",
    },
    emailComercial: "[PREENCHER]",
    emailSuporte: "[PREENCHER]",
    telefone: "[PREENCHER]",
    agendamentoUrl: "[PREENCHER]",
  },

  lgpd: {
    encarregadoNome: "[PREENCHER]",
    encarregadoEmail: "[PREENCHER]",
  },

  company: {
    razaoSocial: "4Traders Tecnologia e Serviços",
    cnpj: "[PREENCHER]",
    endereco: "[PREENCHER]",
    cidade: "[PREENCHER]",
  },

  social: {
    sameAs: [] as string[],
  },

  /** Cor de acento principal (não é verde WhatsApp). Secundária usada na página /estilo. */
  accent: {
    primary: "#B8472A",
    primaryHover: "#9A3A22",
    secondary: "#1A5F6B",
    secondaryHover: "#144A54",
  },

  flags: {
    mostrarPrecos: false,
    mostrarDepoimentos: false,
    mostrarLogosClientes: false,
    mostrarNumeros: false,
    mostrarChatDoSite: false,
  },
} as const;

export type BrandFlag = keyof typeof brand.flags;
