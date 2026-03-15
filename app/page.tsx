import Link from "next/link";
import { ArrowRight, TrendingUp, Search, FileText, Sparkles} from 'lucide-react';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* // Start Navigation //  */}

    <nav className="border-b bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NicheCopy</span>
          </div>

    <div className="flex items-center gap-4">
      <Link href="/signin" className="text-gray-600 hover:text-gray-900 transition">Sing In</Link>

     <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Get Started
     </Link>
    </div>
        </div>        
      </div>
    </nav>

      {/* // End Navigation //  */}
     
    </div>
  );
}
