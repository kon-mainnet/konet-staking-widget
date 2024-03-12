import { TOKENS } from '@lido-sdk/constants';

export const TOKEN_DISPLAY_NAMES = {
  ETH: 'KONET',
  [TOKENS.STETH]: 'stKONET',
  [TOKENS.WSTETH]: 'wstKONET',
};

export const getTokenDisplayName = (token: keyof typeof TOKEN_DISPLAY_NAMES) =>
  TOKEN_DISPLAY_NAMES[token];
