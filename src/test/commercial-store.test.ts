import { describe, expect, it } from 'vitest';
import { ADDONS, BUDGETS, COMMERCIAL_CATEGORIES, COMMERCIAL_PRODUCTS, dailyCountdown, migrateCommercialCatalog, saleValues } from '@/data/floristData';
import { addonsTotal, buildWaMessage, isHalalProduct } from '@/lib/data';
describe('Commercial storefront rules', () => {
  it.each([['topper', 25000], ['chocolate', 45000], ['bag', 15000], ['led', 20000], ['teddy', 35000], ['graduation', 35000]])('charges the requested price for %s', (id, price) => {
    expect(ADDONS.find(a => a.id === id)?.price).toBe(price);
    expect(addonsTotal([String(id)])).toBe(price);
  });
  it.each(COMMERCIAL_CATEGORIES)('has at least five products in %s', category => {
    expect(COMMERCIAL_PRODUCTS.filter(p => p.category === category).length).toBeGreaterThanOrEqual(5);
  });
  it('does not badge flowers, standing or acrylic even when incorrectly marked halal', () => {
    for (const p of COMMERCIAL_PRODUCTS.filter(p => p.foodStatus === 'non-food')) expect(isHalalProduct({ ...p, foodStatus: 'halal' })).toBe(false);
  });
  it('keeps wine and champagne unlabelled, and badges explicit halal food', () => {
    for (const p of COMMERCIAL_PRODUCTS.filter(p => p.foodStatus === 'non-halal')) expect(isHalalProduct({ ...p, foodStatus: 'halal' })).toBe(false);
    for (const p of COMMERCIAL_PRODUCTS.filter(p => p.foodStatus === 'halal')) expect(isHalalProduct(p)).toBe(true);
  });
  it('resets at Jakarta midnight every 24 hours', () => {
    expect(dailyCountdown(new Date('2026-11-03T16:59:59Z'))).toBe('00:00:01');
    expect(dailyCountdown(new Date('2026-11-03T17:00:00Z'))).toBe('24:00:00');
    expect(dailyCountdown(new Date('2026-11-04T16:59:59Z'))).toBe('00:00:01');
  });
  it('calculates the saving and percentage from actual prices', () => {
    expect(saleValues(425000, 644000)).toEqual({ saving: 219000, discount: 34 });
  });
  it('preserves existing products and does not resurrect removed additions', () => {
    const old = { ...COMMERCIAL_PRODUCTS[0], image: 'https://example.com/custom.jpg', price: 123000 };
    expect(migrateCommercialCatalog([old])[0]).toEqual(old);
    const migrated = migrateCommercialCatalog([]).filter(p => p.id !== 'commercial-fruit');
    expect(migrateCommercialCatalog(migrated, 1).some(p => p.id === 'commercial-fruit')).toBe(false);
  });
  it.each([299999, 300000, 600000, 600001, 1000000, 1000001])('assigns price %s to exactly one budget', price => {
    expect(BUDGETS.filter(b => price >= b.min && price < b.max)).toHaveLength(1);
  });
  it('sends selected card, new ribbon and add-on to WhatsApp with correct price', () => {
    const message = buildWaMessage({ name: 'Buket', price: 285000 }, { to: 'Ibu', from: 'Anak', message: 'Selamat', ribbon: 'sage', cardTemplate: 'minimal', deliveryDate: '2026-11-04T00:00:00Z', addons: ['led', 'graduation'], qty: 1 }, 'Bandung');
    expect(message).toContain('Modern Minimalist');
    expect(message).toContain('Sage Green');
    expect(message).toContain('Fairy LED Lights');
    expect(message).toContain('Rp 340.000');
  });
});
