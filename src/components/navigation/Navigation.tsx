import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          FlySmart
        </Link>
        
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link href="/flights" className="hover:text-blue-200 transition">
            Flights
          </Link>
          <Link href="/about" className="hover:text-blue-200 transition">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}