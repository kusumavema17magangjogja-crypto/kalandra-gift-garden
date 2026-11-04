import { describe, expect, it } from 'vitest';
import { ADDONS, BUDGETS, COMMERCIAL_CATEGORIES, COMMERCIAL_PRODUCTS, dailyCountdown, migrateCommercialCatalog, saleValues } from '@/data/floristData';
import { addonsTotal, buildWaMessage, isHalalProduct } from '@/lib/data';
describe('Commercial storefront rules', () => {
  it('contains fifty unique catalog items', () => { expect(COMMERCIAL_PRODUCTS).toHaveLength(50); expect(new Set(COMMERCIAL_PRODUCTS.map(p => p.id)).size).toBe(50); });
  it.each([[1, 600000], [2, 650000], [3, 750000], [4, 850000], [5, 850000], [6, 950000], [7, 550000], [8, 1150000], [9, 780000], [10, 890000], [11, 625000], [12, 750000], [13, 480000], [14, 350000], [15, 680000], [16, 820000], [17, 550000], [18, 120000], [19, 690000], [20, 520000], [21, 980000], [22, 450000], [23, 1450000], [24, 480000], [25, 620000], [26, 620000], [27, 750000], [28, 480000], [29, 1250000], [30, 390000], [31, 785000], [32, 650000], [33, 385000], [34, 740000], [35, 1150000], [36, 1450000], [37, 1850000], [38, 680000], [39, 550000], [40, 420000], [41, 925000], [42, 450000], [43, 1150000], [44, 620000], [45, 3500000], [46, 1250000], [47, 595000], [48, 795000], [49, 1650000], [50, 2400000]])('uses requested catalog price for item %s', (number, price) => { expect(COMMERCIAL_PRODUCTS.find(p => p.id === `catalog-${String(number).padStart(2, '0')}`)?.price).toBe(price); });
  it.each([['topper', 25000], ['chocolate', 45000], ['bag', 15000], ['led', 20000], ['teddy', 35000], ['graduation', 35000]])('charges the requested price for %s', (id, price) => {
    expect(ADDONS.find(a => a.id === id)?.price).toBe(price);
    expect(addonsTotal([String(id)])).toBe(price);
  });
  it.each(COMMERCIAL_CATEGORIES)('has ten products in %s', category => {
    expect(COMMERCIAL_PRODUCTS.filter(p => p.category === category).length).toBe(10);
  });
  it('does not badge flowers, standing or acrylic even when incorrectly marked halal', () => {
    for (const p of COMMERCIAL_PRODUCTS.filter(p => p.foodStatus === 'non-food')) expect(isHalalProduct({ ...p, foodStatus: 'halal' })).toBe(false);
  });
  it('keeps wine and champagne unlabelled, and badges explicit halal food', () => {
    for (const p of COMMERCIAL_PRODUCTS.filter(p => p.foodStatus === 'non-halal')) expect(isHalalProduct({ ...p, foodStatus: 'halal' })).toBe(false);
    for (const p of COMMERCIAL_PRODUCTS.filter(p => p.foodStatus === 'halal')) expect(isHalalProduct(p), p.name).toBe(true);
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
    const first = COMMERCIAL_PRODUCTS[0];
    if (!first) throw new Error("Missing catalog");
    const old = { ...first, image: 'https://example.com/custom.jpg', price: 123000 };
    expect(migrateCommercialCatalog([old])[0]).toEqual(old);
    const migrated = migrateCommercialCatalog([]).filter(p => p.id !== 'catalog-22');
    expect(migrateCommercialCatalog(migrated, 2).some(p => p.id === 'catalog-22')).toBe(false);
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
