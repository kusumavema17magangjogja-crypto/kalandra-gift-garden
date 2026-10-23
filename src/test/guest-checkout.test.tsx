import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { StoreProvider, useStore } from "@/lib/store";
import { buildCartWaMessage, type CartItem } from "@/lib/data";

const item: CartItem = { key: "guest-gift", productId: "p1", name: "Sage Celebration Basket", image: "", basePrice: 785000, qty: 1, to: "Ibu Ratna", from: "Sari", message: "Selamat ulang tahun!", ribbon: "gold", deliveryDate: "2026-10-25T12:00:00Z", addons: [] };

function GuestCart() {
  const store = useStore();
  return <><button onClick={() => { store.addToCart(item); store.setCartOpen(true); }}>Order as guest</button><output data-testid="session">{store.user ? "signed-in" : "guest"}:{store.authOpen ?? "closed"}</output><CartDrawer /></>;
}

afterEach(() => { cleanup(); localStorage.clear(); });

describe("Guest ordering", () => {
  it("allows a signed-out customer to checkout their cart without opening login", () => {
    render(<StoreProvider><GuestCart /></StoreProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Order as guest" }));
    const link = screen.getByRole("link", { name: "Checkout via WhatsApp" });
    expect(screen.getByTestId("session").textContent).toBe("guest:closed");
    const url = new URL(link.getAttribute("href") ?? "");
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain("Sage Celebration Basket");
    fireEvent.click(link);
    expect(screen.getByTestId("session").textContent).toBe("guest:closed");
  });

  it("includes guest greeting customization and selected delivery date in checkout", () => {
    const message = buildCartWaMessage([item], "Jabodetabek", 25000);
    expect(message).toContain("To: Ibu Ratna | From: Sari");
    expect(message).toContain('"Selamat ulang tahun!"');
    expect(message).toContain("25 Okt 2026");
    expect(message).toContain("Champagne Gold");
    expect(message).toContain("Total pesanan: Rp 810.000");
  });
});