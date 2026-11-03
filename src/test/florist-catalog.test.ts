import { describe, expect, it } from "vitest";
import { SEED_PRODUCTS, isHalalProduct, migrateFloristCatalog, type Product } from "@/lib/data";

function product(name: string): Product {
  const p = SEED_PRODUCTS.find((p) => p.name === name);
  if (!p) throw new Error(`Missing product: ${name}`);
  return p;
}

describe("Florist catalog classification", () => {
  it.each(["Buah Lokal & Kurma Berkah", "Executive Coffee Set"])("labels the requested halal food product %s", (name) => {
    expect(isHalalProduct(product(name))).toBe(true);
  });
  it.each(["Luxury Wine & Truffles Crate", "Imported Fruit & Sparkling Wine Basket", "Gourmet Wine & Fine Cheese Box"])("never labels %s halal even with conflicting classification", (name) => {
    expect(isHalalProduct({ ...product(name), foodStatus: "halal" })).toBe(false);
  });
  it.each(["Bunga Papan Celebration", "Blush Rose & Lily Hand Bouquet", "Seserahan Akrilik Gold 7 Box"])("never labels the non-food product %s", (name) => {
    expect(isHalalProduct({ ...product(name), foodStatus: "halal" })).toBe(false);
  });
  it.each(["beer", "bir", "champagne", "sampanye", "babi", "non-halal"])("excludes hampers containing %s", (content) => {
    expect(isHalalProduct({ ...product("Executive Coffee Set"), description: content })).toBe(false);
  });
  it("does not label unknown food products", () => {
    expect(isHalalProduct({ ...product("Executive Coffee Set"), foodStatus: undefined })).toBe(false);
  });
  it("does not label the original hamper whose preserved photo contains champagne", () => {
    expect(isHalalProduct(product("Sage Celebration Basket"))).toBe(false);
  });
  it("preserves saved image URLs and customized catalog data", () => {
    const saved = { ...product("Executive Coffee Set"), id: "p1", name: "Custom gift", image: "https://example.com/existing.jpg", price: 123000 };
    const migrated = migrateFloristCatalog([saved]);
    expect(migrated.find((p) => p.id === "p1")).toEqual(saved);
    expect(migrated.filter((p) => p.id === "florist-coffee")).toHaveLength(1);
  });
  it("does not resurrect a deleted addition after migration", () => {
    const migrated = migrateFloristCatalog([]).filter((p) => p.id !== "florist-coffee");
    expect(migrateFloristCatalog(migrated, 1).some((p) => p.id === "florist-coffee")).toBe(false);
  });
});