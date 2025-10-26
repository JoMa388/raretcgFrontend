// import LoginForm from './LoginForm';
import LoginForm from "@/app/components/loginForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <LoginForm /> {/* ← Client component */}
    </main>
  );
}

