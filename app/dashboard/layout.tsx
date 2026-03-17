"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Settings,LogOut, Menu, X, Sparkle, Icon } from "lucide-react";
 
export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon:LayoutDashboard },
        { name: "Reports", href: "/dashboard/reports", icon:FileText },
        { name: "Settings", href: "/dashboard/settings", icon:Settings },
    ];

return (
    <div>
        <h1>sidebar</h1>
    </div>
)


}
