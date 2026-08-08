import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen px-6 py-24">
      <div className="max-w-4xl w-full text-center">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            A Beautiful, Simple Homepage
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Clean starter layout for a Next.js app — responsive, accessible,
            and minimal so you can focus on building.
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-12">
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:opacity-95"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="inline-block border border-gray-200 px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Learn More
          </a>
        </div>

        <section id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <svg
              className="mx-auto mb-4 h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8" />
            </svg>
            <h3 className="font-semibold mb-2">Minimal</h3>
            <p className="text-sm text-gray-600">Only what you need to get going.</p>
          </div>

          <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <svg
              className="mx-auto mb-4 h-8 w-8 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            <h3 className="font-semibold mb-2">Responsive</h3>
            <p className="text-sm text-gray-600">Looks great on phones and desktops.</p>
          </div>

          <div className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <svg
              className="mx-auto mb-4 h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="font-semibold mb-2">Accessible</h3>
            <p className="text-sm text-gray-600">Semantic markup and good contrast.</p>
          </div>
        </section>

        <footer className="mt-12 text-sm text-gray-500">
          Built with ❤️ — simple design, fast start.
        </footer>
      </div>
    </main>
  );
}
