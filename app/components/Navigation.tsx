"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '@/app/context/AuthContext'

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter()
  const { user, isLoggedIn, logout } = useAuth();

  // const [decoded, setDecoded] = useState<{ email?: string } | null>(null)
  // const [isAuthed, setIsAuthed] = useState(false)

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   setIsAuthed(!!token)
  //   console.log("Stored token:", token)

  //   if (!token) {
  //     setDecoded(null);
  //     return;
  //   }

  //   try {
  //     setDecoded(jwtDecode<{ email?: string }>(token))
  //   } catch (error) {
  //     console.error("Invalid JWT:", error);
  //     localStorage.removeItem("token");
  //     setDecoded(null)
  //   }
    
  // }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-cards', label: 'All Cards' },
    
    // auth dependent links
    isLoggedIn && { href: '/add-card', label: 'Add Card' },
    !isLoggedIn && { href: '/login', label: 'Login' },
    !isLoggedIn && { href: '/signup', label: 'Sign up' },
    isLoggedIn && { href: '/my-profile', label: 'Account' },
  ].filter(Boolean) as { href: string; label: string }[];
  
  // const handleLogout = () => {
  //   localStorage.removeItem("token")
  //   setIsAuthed(false)
  //   router.push("/")
  // }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center h-16 gap-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
              RareTCG
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {isLoggedIn && user ? (
              <span className="px-3 py-2 rounded-md text-sm font-medium text-white">
                Hi, {user.email}
              </span>
            ) : null}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-white text-blue-600'
                    : 'hover:bg-blue-500 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn && user ? (
              <button 
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-500 hover:text-white text-white cursor-pointer"
              >
                Logout
              </button>
            ) : null}
            {isLoggedIn && user ? (
              <Link
                href="/cart"
                className={`p-3 rounded-md transition-colors ${
                  pathname === '/cart'
                    ? 'bg-white text-blue-600'
                    : 'hover:bg-blue-500 hover:text-white'
                }`}
                aria-label="Shopping cart"
              >
                <FaShoppingCart className="w-6 h-6" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}



