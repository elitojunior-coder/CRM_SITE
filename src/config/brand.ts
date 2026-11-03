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

  /** Acento laranja-brasa — CTAs e estados ativos. Petróleo para faixas de destaque. */
  accent: {
    primary: "#FF5B2E",
    primaryHover: "#E84E24",
    secondary: "#0E3B43",
    secondaryHover: "#0A2E34",
  },

  surfaces: {
    dark: "#0B0D0E",
    warm: "#F5F2EB",
    petroleum: "#0E3B43",
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
