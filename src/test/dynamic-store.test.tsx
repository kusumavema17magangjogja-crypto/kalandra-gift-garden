import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, StoreProvider, useStore } from "@/lib/store";
import { waLink } from "@/lib/data";

function Probe() {
  const s = useStore();
  return <>
    <output data-testid="settings">{JSON.stringify(s.settings)}</output>
    <output data-testid="catalog">{JSON.stringify({ categories: s.categories, products: s.products })}</output>
    <a href={waLink(s.settings.whatsappNumber, "Pesan")}>Order</a>
    <button onClick={() => s.updateSettings({ storeName: "Toko Mawar", whatsappNumber: "6282223334444" })}>Save</button>
    <button onClick={() => s.saveProduct({ ...s.products[0], id: "custom", name: "Hadiah Baru", category: "Wisuda", price: 200000, stock: 4, image: "", description: "", active: true, tags: [], rating: 5, reviews: 0, badge: "Same-Day" })}>Add</button>
    <button onClick={() => s.deleteProduct("custom")}>Delete</button>
  </>;
}

afterEach(() => { cleanup(); localStorage.clear(); });

describe("Dynamic store rules", () => {
  it("uses the requested default WhatsApp and store settings", () => {
    expect(DEFAULT_SETTINGS.whatsappNumber).toBe("6281234567890");
    expect(DEFAULT_SETTINGS.storeName).toBe("Kalandra");
    expect(DEFAULT_SETTINGS.storeTagline).toBe("Hampers & Seserahan");
    expect(DEFAULT_SETTINGS.instagramUrl).toBe("https://instagram.com");
    expect(DEFAULT_SETTINGS.tiktokUrl).toBe("https://tiktok.com");
  });
  it("updates WhatsApp routing immediately and retains changes after remount", () => {
    const view = render(<StoreProvider><Probe /></StoreProvider>);
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByRole("link").getAttribute("href")).toBe("https://wa.me/6282223334444?text=Pesan");
    view.unmount();
    render(<StoreProvider><Probe /></StoreProvider>);
    expect(JSON.parse(screen.getByTestId("settings").textContent ?? "{}").storeName).toBe("Toko Mawar");
  });
  it("preserves a legacy saved number and fills missing settings", () => {
    localStorage.setItem("kalandra-state-v1", JSON.stringify({ settings: { waNumber: "6289998887777", citySlots: { Bandung: 7 } } }));
    render(<StoreProvider><Probe /></StoreProvider>);
    const settings = JSON.parse(screen.getByTestId("settings").textContent ?? "{}");
    expect(settings.whatsappNumber).toBe("6289998887777");
    expect(settings.heroHeadline).toBe("Rangkaian Kasih & Keanggunan di Setiap Momen Berharga");
    expect(settings.citySlots.Bandung).toBe(7);
    expect(settings.citySlots.Bali).toBe(20);
  });
  it("adds a new category with a product and removes that product immediately", () => {
    render(<StoreProvider><Probe /></StoreProvider>);
    fireEvent.click(screen.getByText("Add"));
    let catalog = JSON.parse(screen.getByTestId("catalog").textContent ?? "{}");
    expect(catalog.categories).toContain("Wisuda");
    expect(catalog.products.find((p: { id: string }) => p.id === "custom").badge).toBe("Same-Day");
    fireEvent.click(screen.getByText("Delete"));
    catalog = JSON.parse(screen.getByTestId("catalog").textContent ?? "{}");
    expect(catalog.products.some((p: { id: string }) => p.id === "custom")).toBe(false);
  });
});