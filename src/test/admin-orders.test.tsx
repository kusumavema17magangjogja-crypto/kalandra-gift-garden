import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { StoreProvider, useStore, ORDERS_KEY } from "@/lib/store";
import type { CartItem, Order } from "@/lib/data";

const item: CartItem = { key: "k1", productId: "p1", name: "Sage Celebration Basket", image: "", basePrice: 785000, qty: 1, to: "Ibu", from: "Sari", message: "", ribbon: "gold", deliveryDate: "2026-10-25T12:00:00Z", addons: [] };

function Probe() {
  const s = useStore();
  return <>
    <output data-testid="cart">{JSON.stringify(s.cart.map((i) => i.key))}</output>
    <output data-testid="orders">{JSON.stringify(s.orders.map((o) => `${o.id}:${o.status}`))}</output>
    <output data-testid="who">{s.user ? `${s.user.email}:${s.user.role}` : "guest"}</output>
    <button onClick={() => s.addToCart(item)}>Add</button>
    <button onClick={() => s.login("sari@email.com", "kalandra123")}>Login Sari</button>
    <button onClick={() => s.login("admin@kalandra.id", "admin123")}>Login Admin</button>
    <button onClick={() => s.logout()}>Logout</button>
    <button onClick={() => s.setOrderStatus(s.orders[0]!.id, "Sedang Dirangkai")}>Advance Status</button>
  </>;
}

afterEach(() => { cleanup(); localStorage.clear(); });

describe("Cart isolation", () => {
  it("keeps guest and customer carts in separate storage keys", () => {
    render(<StoreProvider><Probe /></StoreProvider>);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("who").textContent).toBe("guest");
    expect(screen.getByTestId("cart").textContent).toContain("k1");
    const guestKey = Object.keys(localStorage).find((k) => k.startsWith("kalandra-cart-"));
    expect(guestKey).toBeTruthy();
    fireEvent.click(screen.getByText("Login Sari"));
    expect(screen.getByTestId("cart").textContent).toBe("[]");
    fireEvent.click(screen.getByText("Add"));
    expect(JSON.parse(localStorage.getItem("kalandra-cart-sari@email.com") ?? "[]")).toHaveLength(1);
    fireEvent.click(screen.getByText("Logout"));
    expect(screen.getByTestId("cart").textContent).toContain("k1");
  });

  it("gives the admin no shopping cart at all", () => {
    render(<StoreProvider><Probe /></StoreProvider>);
    fireEvent.click(screen.getByText("Login Admin"));
    expect(screen.getByTestId("who").textContent).toContain("admin");
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("cart").textContent).toBe("[]");
    expect(Object.keys(localStorage).some((k) => k.includes("admin@kalandra.id"))).toBe(false);
  });
});

describe("Central orders list", () => {
  it("persists status changes to kalandra_orders so the storefront reads them back", () => {
    render(<StoreProvider><Probe /></StoreProvider>);
    const first = (JSON.parse(screen.getByTestId("orders").textContent ?? "[]") as string[])[0];
    expect(first).toMatch(/^KLD-24051:/);
    fireEvent.click(screen.getByText("Advance Status"));
    const saved = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]") as Order[];
    expect(saved[0]?.status).toBe("Sedang Dirangkai");
    expect(screen.getByTestId("orders").textContent).toContain("Sedang Dirangkai");
  });

  it("seeds kalandra_orders on first load", () => {
    render(<StoreProvider><Probe /></StoreProvider>);
    const saved = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]") as Order[];
    expect(saved.length).toBeGreaterThanOrEqual(8);
    expect(saved.some((o) => o.id === "KLD-24051")).toBe(true);
  });
});
