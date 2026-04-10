import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { CreditCard, PieChart, Menu, X } from 'lucide-react';
import { cn } from '../utils';

export const Layout: React.FC = () => {
    // Estado para controlar el menú hamburguesa en móvil
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="min-h-screen bg-monei-dark text-slate-200 selection:bg-teal-500/30 font-sans">
            <header className="border-b border-slate-800/60 bg-monei-dark/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between max-w-6xl">

                    {/* LOGO AREA */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <span className="text-white font-black text-xl tracking-tighter">M</span>
                        </div>
                        {/* Texto oculto en móvil, visible en escritorio */}
                        <h1 className="hidden md:block text-xl md:text-2xl font-black tracking-tight text-white">
                            MONEI <span className="text-teal-400 font-medium">Dashboard</span>
                        </h1>
                    </div>

                    {/* NAVEGACIÓN DESKTOP */}
                    <nav className="hidden md:flex gap-1 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
                        <NavLink
                            to="/analytics"
                            className={({ isActive }) => cn(
                                "flex items-center gap-2.5 px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                                isActive ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                            )}
                        >
                            <PieChart className="w-4 h-4" />
                            Analytics
                        </NavLink>
                        <NavLink
                            to="/payments"
                            className={({ isActive }) => cn(
                                "flex items-center gap-2.5 px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                                isActive ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                            )}
                        >
                            <CreditCard className="w-4 h-4" />
                            Transacciones
                        </NavLink>
                    </nav>

                    {/* BOTÓN HAMBURGUESA MÓVIL */}
                    <button
                        className="md:hidden p-2 -mr-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* NAVEGACIÓN MÓVIL (Dropdown) */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-[64px] left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-4 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-2">
                        <NavLink
                            to="/analytics"
                            onClick={closeMenu}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-5 py-4 text-sm font-bold rounded-xl transition-all",
                                isActive ? "bg-indigo-500/10 text-indigo-400" : "text-slate-300 hover:bg-slate-800/50"
                            )}
                        >
                            <PieChart className="w-5 h-5" />
                            Analytics
                        </NavLink>
                        <NavLink
                            to="/payments"
                            onClick={closeMenu}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-5 py-4 text-sm font-bold rounded-xl transition-all",
                                isActive ? "bg-indigo-500/10 text-indigo-400" : "text-slate-300 hover:bg-slate-800/50"
                            )}
                        >
                            <CreditCard className="w-5 h-5" />
                            Transacciones
                        </NavLink>
                    </div>
                )}
            </header>

            <main className="container mx-auto px-4 md:px-6 py-6 md:py-12 max-w-6xl relative">
                <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
                <div className="absolute top-40 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};