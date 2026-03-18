"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LayoutDashboard, Users, Settings,LogOut, Menu, X, Shield, BarChart3, Receipt } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }){

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

    if (!session || (session.user as any)?.role !== "ADMIN" ) {
        return null;
    }

    const navigation = [
        { name: "Dashboard", href: "/admin", icon:LayoutDashboard },
        { name: "Payment Requests", href: "/admin/payment-requests", icon:Receipt },
        { name: "Users", href: "/admin/users", icon:Users },
        { name: "Analytics", href: "/admin/analytics", icon:BarChart3 },
        { name: "Settings", href: "/admin/settings", icon:Settings },
    ];


    return (
        <div>LEFT SIDE BAR</div>
    )





}