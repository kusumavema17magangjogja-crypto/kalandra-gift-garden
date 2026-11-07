import { describe, expect, it } from 'vitest';
import { ADDONS, BUDGETS, CARD_TEMPLATES, COMMERCIAL_CATEGORIES, COMMERCIAL_PRODUCTS, RIBBONS, dailyCountdown, migrateCommercialCatalog, saleValues } from '@/data/floristData';
import { addonsTotal, buildWaMessage, isHalalProduct } from '@/lib/data';
describe('Commercial storefront rules', () => {
  it('contains twenty-five unique catalog items', () => { expect(COMMERCIAL_PRODUCTS).toHaveLength(25); expect(new Set(COMMERCIAL_PRODUCTS.map(p => p.id)).size).toBe(25); });
  it.each([[1, 600000], [2, 650000], [3, 850000], [4, 950000], [5, 780000], [6, 625000], [7, 750000], [8, 350000], [9, 480000], [10, 520000], [11, 980000], [12, 1450000], [13, 480000], [14, 750000], [15, 1250000], [16, 785000], [17, 420000], [18, 385000], [19, 1150000], [20, 1450000], [21, 925000], [22, 450000], [23, 3500000], [24, 1250000], [25, 595000]])('uses requested catalog price for item %s', (number, price) => { expect(COMMERCIAL_PRODUCTS.find(p => p.id === `catalog-${String(number).padStart(2, '0')}`)?.price).toBe(price); });
  it.each([['topper', 25000], ['chocolate', 45000], ['bag', 15000], ['led', 20000], ['teddy', 35000], ['graduation', 35000]])('charges the requested price for %s', (id, price) => {
    expect(ADDONS.find(a => a.id === id)?.price).toBe(price);
    expect(addonsTotal([String(id)])).toBe(price);
  });
  it('gives every product its own distinct image', () => {
    expect(new Set(COMMERCIAL_PRODUCTS.map(p => p.image)).size).toBe(25);
  });
  it.each(COMMERCIAL_CATEGORIES)('has five products in %s', category => {
    expect(COMMERCIAL_PRODUCTS.filter(p => p.category === category).length).toBe(5);
  });
  it('offers nine satin ribbons with the requested colours', () => {
    expect(RIBBONS.map(r => [r.id, r.hex])).toEqual([
      ['emerald', '#1B3B2B'], ['baby-blue', '#A0C4E2'], ['midnight-navy', '#1B263B'], ['gold', '#D4AF37'],
      ['terracotta', '#C87A5B'], ['burgundy', '#800020'], ['sage', '#8A9A86'], ['rose-gold', '#B76E79'], ['ivory', '#FFFFF0'],
    ]);
  });
  it('offers six greeting card templates', () => {
    expect(CARD_TEMPLATES.map(t => t.label)).toEqual(['Classic Floral', 'Gold Border', 'Modern Minimalist', 'Festive', 'Islamic Eid', 'Sweet Romance']);
  });
  it('does not badge flowers, standing or acrylic even when incorrectly marked halal', () => {
    for (const p of COMMERCIAL_PRODUCTS.filter(p => p.foodStatus === 'non-food')) expect(isHalalProduct({ ...p, foodStatus: 'halal' }), p.name).toBe(false);
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
  it('replaces old catalog items with the new definitions, keeping stock and active flag', () => {
    const first = COMMERCIAL_PRODUCTS[0];
    if (!first) throw new Error("Missing catalog");
    const old = { ...first, name: 'Produk Lama', image: '/src/assets/old-shared.jpg', price: 111000, stock: 3, active: false };
    const [out] = migrateCommercialCatalog([old], 3);
    expect(out).toEqual({ ...first, stock: 3, active: false });
  });
  it('retires legacy products and keeps admin-added customs during the total replacement', () => {
    const custom = { ...COMMERCIAL_PRODUCTS[0]!, id: 'p1700000000000', name: 'Kreasi Admin', image: 'https://example.com/custom.jpg' };
    const retired = { ...COMMERCIAL_PRODUCTS[0]!, id: 'p3', name: 'Parsel Fitri Lama' };
    const oldCatalog = { ...COMMERCIAL_PRODUCTS[0]!, id: 'catalog-30', name: 'Produk Katalog Lama' };
    const oldItems = COMMERCIAL_PRODUCTS.map(p => ({ ...p, name: 'Versi Lama ' + p.id, image: '/old-shared.jpg' }));
    const migrated = migrateCommercialCatalog([custom, retired, oldCatalog, ...oldItems], 3);
    expect(migrated.find(p => p.id === custom.id)).toEqual(custom);
    expect(migrated.some(p => p.id === 'p3' || p.id === 'catalog-30')).toBe(false);
    const catalog = migrated.filter(p => p.id.startsWith('catalog-'));
    expect(catalog).toHaveLength(25);
    for (const p of catalog) expect(p.name).toBe(COMMERCIAL_PRODUCTS.find(f => f.id === p.id)?.name);
  });
  it('does not resurrect catalog items deleted before the migration', () => {
    const without = COMMERCIAL_PRODUCTS.filter(p => p.id !== 'catalog-07');
    const migrated = migrateCommercialCatalog(without, 3);
    expect(migrated.some(p => p.id === 'catalog-07')).toBe(false);
    expect(migrated).toHaveLength(24);
  });
  it('installs the full catalog for states that never had it', () => {
    expect(migrateCommercialCatalog([], 0).filter(p => p.id.startsWith('catalog-'))).toHaveLength(25);
  });
  it.each([299999, 300000, 600000, 600001, 1000000, 1000001])('assigns price %s to exactly one budget', price => {
    expect(BUDGETS.filter(b => price >= b.min && price < b.max)).toHaveLength(1);
  });
  it('sends selected card, new ribbon and add-on to WhatsApp with correct price', () => {
    const message = buildWaMessage({ name: 'Buket', price: 285000 }, { to: 'Ibu', from: 'Anak', message: 'Selamat', ribbon: 'rose-gold', cardTemplate: 'romance', deliveryDate: '2026-11-04T00:00:00Z', addons: ['led', 'graduation'], qty: 1 }, 'Bandung');
    expect(message).toContain('Sweet Romance');
    expect(message).toContain('Rose Gold');
    expect(message).toContain('Fairy LED Lights');
    expect(message).toContain('Rp 340.000');
  });
});
