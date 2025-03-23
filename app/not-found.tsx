import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Flavius Cojocaru",
  description:
    "The page you're looking for doesn't exist. Return to the homepage of Flavius Cojocaru's portfolio.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
