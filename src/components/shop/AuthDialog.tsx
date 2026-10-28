import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function passwordStrength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

export function StrengthBar({ value }: { value: string }) {
  const s = passwordStrength(value);
  const labels = ["Sangat lemah", "Lemah", "Cukup", "Kuat", "Sangat kuat"];
  const colors = ["bg-destructive", "bg-destructive", "bg-warning", "bg-success", "bg-success"];
  return (
    <div className="space-y-1">
      <div className="flex gap-1">{[0, 1, 2, 3].map((i) => <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < s ? colors[s] : "bg-muted")} />)}</div>
      {value && <p className="text-xs text-muted-foreground">Kekuatan: {labels[s]}</p>}
    </div>
  );
}

export function PasswordInput({ value, onChange, id, placeholder }: { value: string; onChange: (v: string) => void; id?: string; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input id={id} type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pr-10" />
      <Button variant="ghost" size="icon" type="button" onClick={() => setShow(!show)} aria-label={show ? "Sembunyikan password" : "Tampilkan password"} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export function AuthDialog() {
  const { authOpen, setAuthOpen } = useStore();
  return (
    <Dialog open={!!authOpen} onOpenChange={(o) => !o && setAuthOpen(null)}>
      <DialogContent className="max-w-md">
        {authOpen === "login" && <Login />}
        {authOpen === "register" && <Register />}
        {authOpen === "forgot" && <Forgot />}
      </DialogContent>
    </Dialog>
  );
}

function Login() {
  const { login, setAuthOpen, loginEmail } = useStore();
  const [email, setEmail] = useState(loginEmail);
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, pw);
    if (err) return void toast.error(err);
    toast.success("Selamat datang kembali!");
    setAuthOpen(null);
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <DialogHeader><DialogTitle className="font-serif text-3xl text-primary">Masuk</DialogTitle></DialogHeader>
      <div className="space-y-1.5"><Label htmlFor="le">Email</Label><Input id="le" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div className="space-y-1.5"><Label htmlFor="lp">Password</Label><PasswordInput id="lp" value={pw} onChange={setPw} /></div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2"><Checkbox checked={remember} onCheckedChange={(c) => setRemember(!!c)} />Ingat Saya</label>
        <button type="button" className="text-accent hover:underline" onClick={() => setAuthOpen("forgot")}>Lupa Password?</button>
      </div>
      <Button type="submit" className="w-full" size="lg">Masuk</Button>
      <p className="text-center text-sm text-muted-foreground">Belum punya akun? <button type="button" className="font-semibold text-primary hover:underline" onClick={() => setAuthOpen("register")}>Daftar</button></p>
    </form>
  );
}

function Register() {
  const { register, setAuthOpen } = useStore();
  const [f, setF] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof typeof f, string>> = {};
    if (f.name.trim().length < 3) er.name = "Nama minimal 3 karakter";
    if (!/^(62|08)\d{8,12}$/.test(f.phone.replace(/\D/g, ""))) er.phone = "Nomor WhatsApp tidak valid (contoh 0812…)";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Email tidak valid";
    if (f.password.length < 8) er.password = "Password minimal 8 karakter";
    if (f.password !== f.confirm) er.confirm = "Konfirmasi password tidak cocok";
    setErrors(er);
    if (Object.keys(er).length) return;
    const phone = f.phone.replace(/\D/g, "").replace(/^0/, "62");
    const err = register({ name: f.name.trim(), phone, email: f.email.trim(), password: f.password });
    if (err) return void toast.error(err);
    toast.success("Akun berhasil dibuat!");
    setAuthOpen(null);
  };
  const Field = ({ k, label, type = "text" }: { k: keyof typeof f; label: string; type?: string }) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {type === "password" ? <PasswordInput value={f[k]} onChange={set(k)} /> : <Input type={type} value={f[k]} onChange={(e) => set(k)(e.target.value)} />}
      {errors[k] && <p className="text-xs text-destructive">{errors[k]}</p>}
    </div>
  );
  return (
    <form onSubmit={submit} className="space-y-3">
      <DialogHeader><DialogTitle className="font-serif text-3xl text-primary">Buat Akun</DialogTitle><DialogDescription>Simpan alamat & lacak pesanan dengan mudah.</DialogDescription></DialogHeader>
      {Field({ k: "name", label: "Nama Lengkap" })}
      {Field({ k: "phone", label: "Nomor WhatsApp Aktif", type: "tel" })}
      {Field({ k: "email", label: "Email", type: "email" })}
      {Field({ k: "password", label: "Password", type: "password" })}
      <StrengthBar value={f.password} />
      {Field({ k: "confirm", label: "Konfirmasi Password", type: "password" })}
      <Button type="submit" className="w-full" size="lg">Daftar</Button>
      <p className="text-center text-sm text-muted-foreground">Sudah punya akun? <button type="button" className="font-semibold text-primary hover:underline" onClick={() => setAuthOpen("login")}>Masuk</button></p>
    </form>
  );
}

export function Forgot({ onComplete, onBack }: { onComplete?: (email: string) => void; onBack?: () => void }) {
  const { userExists, resetPassword, setAuthOpen, setLoginEmail } = useStore();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    if (step !== 2 || timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [step, timer]);

  const request = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userExists(email.trim())) return void toast.error("Email tidak terdaftar");
    setEmail(email.trim());
    toast.success("Kode verifikasi simulasi: 1234");
    setOtp(""); setStep(2); setTimer(60);
  };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw !== confirm) return void toast.error("Konfirmasi password tidak cocok");
    const error = resetPassword(email, pw, otp);
    if (error) return void toast.error(error);
    toast.success("Password berhasil diperbarui! Silakan masuk kembali.");
    if (onComplete) onComplete(email);
    else { setLoginEmail(email); setAuthOpen("login"); }
  };

  return (
    <div className="space-y-4">
      <DialogHeader><DialogTitle className="font-serif text-3xl text-primary">Reset Password</DialogTitle><DialogDescription>Langkah {step} dari 3 · Verifikasi simulasi</DialogDescription></DialogHeader>
      <div className="flex gap-2">{[1, 2, 3].map((i) => <div key={i} className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-muted")} />)}</div>
      {step === 1 && <form onSubmit={request} className="space-y-4">
        <div className="space-y-1.5"><Label htmlFor="recovery-email">Email terdaftar</Label><Input id="recovery-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <Button type="submit" className="w-full">Kirim Kode Verifikasi / OTP</Button>
      </form>}
      {step === 2 && <div className="space-y-4 text-center">
        <p className="break-words text-sm text-muted-foreground">Verifikasi untuk {email} · Kode simulasi: 1234</p>
        <div className="flex justify-center"><InputOTP aria-label="Kode OTP" maxLength={4} value={otp} onChange={setOtp}><InputOTPGroup>{[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg" />)}</InputOTPGroup></InputOTP></div>
        <Button variant="link" disabled={timer > 0} onClick={() => { setOtp(""); setTimer(60); toast.success("Kode verifikasi simulasi: 1234"); }}>{timer > 0 ? `Kirim Ulang Kode (${timer}s)` : "Kirim Ulang Kode"}</Button>
        <Button className="w-full" onClick={() => otp === "1234" ? setStep(3) : toast.error("Kode OTP salah")} disabled={otp.length < 4}>Verifikasi OTP</Button>
      </div>}
      {step === 3 && <form onSubmit={save} className="space-y-3">
        <div className="space-y-1.5"><Label htmlFor="recovery-password">Password Baru</Label><PasswordInput id="recovery-password" placeholder="Minimal 6 karakter" value={pw} onChange={setPw} /></div>
        <StrengthBar value={pw} />
        <div className="space-y-1.5"><Label htmlFor="recovery-confirm">Konfirmasi Password Baru</Label><PasswordInput id="recovery-confirm" value={confirm} onChange={setConfirm} /></div>
        <Button type="submit" className="w-full">Simpan Password Baru</Button>
      </form>}
      <Button variant="link" className="w-full" onClick={() => onBack ? onBack() : setAuthOpen("login")}>Kembali ke Masuk</Button>
    </div>
  );
}
