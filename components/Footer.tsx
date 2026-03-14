export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} AirLinkRide. All rights reserved.</p>

        <p className="mt-2">
          AirLinkRide Service • Pearson Airport (YYZ)
        </p>
      </div>
    </footer>
  );
}
