"use client";
import Link from 'next/link';
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">RareTCG</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your ultimate trading card marketplace
        </p>
        
        <div className="flex flex-wrap justify-center items-stretch gap-6 mt-12">
          <Link 
            href="/all-cards"
            className="w-72 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 hover:border-blue-500"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">View All Cards</h2>
            <p className="text-gray-600">Browse the entire card library</p>
          </Link>
          
          {isLoggedIn ? (
            <Link 
              href="/add-card"
              className="w-72 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 hover:border-green-500"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Add New Card</h2>
              <p className="text-gray-600">Add a new card to the database</p>
            </Link>
          ): null}
          {/* Asks user to login to their account, should be conditional if user is not logged in */}
          {!isLoggedIn ? (
            <Link 
              href="/login"
              className="w-72 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 hover:border-purple-500"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Login</h2>
              <p className="text-gray-600">Access your account</p>
            </Link>
          ): null}
        </div>
      </div>
    </div>
  );
}
