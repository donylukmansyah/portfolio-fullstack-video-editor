"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="flex min-h-screen items-center justify-center bg-white p-4 font-sans">
        <div className="max-w-md rounded-[5px] border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_black]">
          <h2 className="mb-3 text-xl font-bold">Something went wrong</h2>
          <p className="mb-4 text-sm text-gray-700">
            A critical error occurred. Please refresh the page.
          </p>
          <button
            onClick={reset}
            className="rounded-[5px] border-2 border-black bg-[#ff5a52] px-4 py-2 text-sm font-bold text-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
