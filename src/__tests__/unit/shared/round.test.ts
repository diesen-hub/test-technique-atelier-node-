import { describe, it, expect } from 'vitest';
import { round } from '@shared/utils/round';

describe('round', () => {
  it('arrondit à 2 décimales par défaut', () => {
    expect(round(23.456789)).toBe(23.46);
  });

  it('arrondit au nombre de décimales spécifié', () => {
    expect(round(23.456789, 4)).toBe(23.4568);
  });

  it('gère les flottants imprécis', () => {
    expect(round(3 / 4)).toBe(0.75);
  });

  it('retourne un entier si decimals vaut 0', () => {
    expect(round(23.6, 0)).toBe(24);
  });

  it('ne modifie pas une valeur déjà arrondie', () => {
    expect(round(1.5)).toBe(1.5);
  });
});
