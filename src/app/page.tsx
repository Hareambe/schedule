"use client";
import "../styles/auth.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
      <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-16 font-sans">
        {/* Logo Section */}
        <header className="flex justify-center">
          <Image
              src="/next.svg"
              alt="App Logo"
              width={180}
              height={38}
              priority
          />
        </header>

        {/* Main Section */}
        <main className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-center">Welcome to the Support App</h1>
          <p className="text-center text-lg">
            Manage tickets, users, and messages with ease.
          </p>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
                onClick={() => navigateTo("/login")}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
                onClick={() => navigateTo("/register")}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Register
            </button>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="flex flex-col items-center gap-2 text-sm">
          <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
          >
            Read Documentation
          </a>
          <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
          >
            Deploy with Vercel
          </a>
        </footer>
      </div>
  );
}
