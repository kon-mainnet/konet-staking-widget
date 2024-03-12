import { TOKENS } from '@lido-sdk/constants';

export const ETH = 'KONET';
export const TOKENS_TO_WRAP = {
  ETH,
  [TOKENS.STETH]: TOKENS.STETH,
} as const;

export type TokensWrappable = keyof typeof TOKENS_TO_WRAP;
