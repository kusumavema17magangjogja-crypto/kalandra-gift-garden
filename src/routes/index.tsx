import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Gift, ShieldCheck, ArrowRight, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalandra Florist & Gift — Florist & Bespoke Gift Studio" },
      {
        name: "description",
        content: "Rangkaian bunga papan, buket, parsel, dan hampers eksklusif Kalandra Florist & Gift.",
      },
      { property: "og:title", content: "Kalandra Florist & Gift" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const navigate = useNavigate();
  const store = useStore() as ReturnType<typeof useStore> & {
    login?: (email: string, password: string) => boolean | Promise<boolean>;
    setIsAdmin?: (val: boolean) => void;
  };

  const { settings, isAdmin, loaded } = store;
  const [email, setEmail] = useState("admin@kalandra.id");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Jika sudah terdeteksi sebagai admin, langsung arahkan ke /admin secara aman
  useEffect(() => {
    if (loaded && isAdmin) {
      navigate({ to: "/admin", replace: true });
    }
  }, [loaded, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      if (typeof store.login === "function") {
        const result = await store.login(email.trim(), password);
        if (result) {
          toast.success("Login admin berhasil. Membuka dashboard...");
          navigate({ to: "/admin", replace: true });
          return;
        }
      }

      // Fallback aman bila store menggunakan flag admin lokal
      if (typeof store.setIsAdmin === "function" && email.trim() && password.trim()) {
        store.setIsAdmin(true);
        toast.success("Akses admin aktif. Membuka dashboard...");
        navigate({ to: "/admin", replace: true });
        return;
      }

      toast.error("Email atau kata sandi belum sesuai.");
    } catch {
      toast.error("Terjadi kendala saat proses masuk.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!loaded) {
    return (
      <div className="grid min-h-screen place-items-center bg-secondary px-4 text-sm text-muted-foreground">
        Memuat {settings?.storeName || "Kalandra Florist & Gift"}...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-soft md:p-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Gift className="h-6 w-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-primary">
            {settings?.storeName || "Kalandra Florist & Gift"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {settings?.storeTagline || "Florist & Bespoke Gift Studio"}
          </p>
        </div>

        {isAdmin ? (
          <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" /> Sesi Admin Aktif
            </div>
            <p className="text-xs text-muted-foreground">
              Akun admin sudah aktif. Klik tombol di bawah untuk masuk ke halaman dashboard.
            </p>
            <Button asChild className="w-full">
              <Link to="/admin">
                Buka Dashboard Admin <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="rounded-xl border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5 font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Akses Dashboard Admin
              </p>
              <p className="mt-1">
                Masuk dengan akun admin terlebih dahulu agar rute <code>/admin</code> terbuka dengan aman.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email Admin</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kalandra.id"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="login-password">Kata Sandi</Label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              <Lock className="mr-1.5 h-4 w-4" />
              {submitting ? "Memproses..." : "Masuk ke Dashboard"}
            </Button>
          </form>
        )}

        <div className="border-t pt-4 text-center">
          <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground">
            <Link to="/admin">
              Arahkan ke Rute /admin <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
