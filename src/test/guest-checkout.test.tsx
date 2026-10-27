import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { StoreProvider, useStore, ORDERS_KEY } from "@/lib/store";
import { buildCartWaMessage, type CartItem, type Order } from "@/lib/data";

const item: CartItem = { key: "guest-gift", productId: "p1", name: "Sage Celebration Basket", image: "", basePrice: 785000, qty: 1, to: "Ibu Ratna", from: "Sari", message: "Selamat ulang tahun!", ribbon: "gold", deliveryDate: "2026-10-25T12:00:00Z", addons: [] };

function GuestCart() {
  const store = useStore();
  return <><button onClick={() => { store.addToCart(item); store.setCartOpen(true); }}>Order as guest</button><output data-testid="session">{store.user ? "signed-in" : "guest"}:{store.authOpen ?? "closed"}</output><CartDrawer /></>;
}

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });

describe("Guest ordering", () => {
  it("lets a signed-out customer checkout via WhatsApp without opening login and records the order", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<StoreProvider><GuestCart /></StoreProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Order as guest" }));
    const button = screen.getByRole("button", { name: "Checkout via WhatsApp" });
    expect(screen.getByTestId("session").textContent).toBe("guest:closed");
    fireEvent.click(button);
    expect(screen.getByTestId("session").textContent).toBe("guest:closed");
    const url = new URL(open.mock.calls[0]?.[0] as string);
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain("Sage Celebration Basket");
    const saved = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]") as Order[];
    expect(saved[0]?.items[0]?.name).toBe("Sage Celebration Basket");
    expect(saved[0]?.status).toBe("Menunggu Pembayaran");
    expect(saved[0]?.customerEmail).toBe("guest@kalandra.id");
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
