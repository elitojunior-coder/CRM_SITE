export const PIPELINE_CANVAS_W = 1280;
export const PIPELINE_SIDEBAR_W = 152;
export const PIPELINE_COL_W = (PIPELINE_CANVAS_W - PIPELINE_SIDEBAR_W) / 5;
/** Largura visível no mobile: barra lateral + 2 colunas. */
export const PIPELINE_MOBILE_VISIBLE_W = PIPELINE_SIDEBAR_W + PIPELINE_COL_W * 2;
/** Altura ajustada ao conteúdo (sem faixa vazia embaixo). */
export const PIPELINE_CANVAS_H = 628;

export const PIPELINE_CANVAS_SIZE = {
  width: PIPELINE_CANVAS_W,
  height: PIPELINE_CANVAS_H,
};
