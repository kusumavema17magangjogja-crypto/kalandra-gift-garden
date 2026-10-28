import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AuthDialog } from "@/components/shop/AuthDialog";
import { StoreProvider, useStore } from "@/lib/store";

function Probe() {
  const s = useStore();
  return <><button onClick={() => s.setAuthOpen("forgot")}>Recover</button><output data-testid="result">{s.user?.email ?? "guest"}</output><AuthDialog /></>;
}
afterEach(() => { cleanup(); localStorage.clear(); sessionStorage.clear(); });

function recoveryStep() {
  render(<StoreProvider><Probe /></StoreProvider>);
  fireEvent.click(screen.getByText("Recover"));
  fireEvent.change(screen.getByLabelText("Email terdaftar"), { target: { value: "sari@email.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Kirim Kode Verifikasi / OTP" }));
}
describe("Simulated password recovery", () => {
  it("rejects OTP other than 1234", () => {
    recoveryStep();
    fireEvent.change(screen.getByLabelText("Kode OTP"), { target: { value: "4321" } });
    fireEvent.click(screen.getByRole("button", { name: "Verifikasi OTP" }));
    expect(screen.queryByLabelText("Password Baru")).toBeNull();
  });
  it("rejects fewer than six characters and mismatches, accepts six and logs in with the saved password", () => {
    recoveryStep();
    fireEvent.change(screen.getByLabelText("Kode OTP"), { target: { value: "1234" } });
    fireEvent.click(screen.getByRole("button", { name: "Verifikasi OTP" }));
    const fill = (password: string, confirm: string) => {
      fireEvent.change(screen.getByLabelText("Password Baru"), { target: { value: password } });
      fireEvent.change(screen.getByLabelText("Konfirmasi Password Baru"), { target: { value: confirm } });
      fireEvent.click(screen.getByRole("button", { name: "Simpan Password Baru" }));
    };
    fill("12345", "12345");
    expect(screen.getByLabelText("Password Baru")).toBeInTheDocument();
    fill("abcdef", "ghijkl");
    expect(screen.getByLabelText("Password Baru")).toBeInTheDocument();
    fill("abcdef", "abcdef");
    expect(screen.getByLabelText("Email")).toHaveValue("sari@email.com");
    const state = JSON.parse(localStorage.getItem("kalandra-state-v1") ?? "{}");
    expect(state.users.find((u: { email: string }) => u.email === "sari@email.com").password).toBe("abcdef");
    fireEvent.change(screen.getByLabelText("Password", { exact: true }), { target: { value: "abcdef" } });
    fireEvent.click(screen.getByRole("button", { name: /^Masuk$/ }));
    expect(screen.getByTestId("result").textContent).toBe("sari@email.com");
  });
});