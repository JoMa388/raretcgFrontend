// import LoginForm from './LoginForm';
import LoginForm from "@/app/login/loginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Login</h1>
      <LoginForm />
    </div>
  );
}

