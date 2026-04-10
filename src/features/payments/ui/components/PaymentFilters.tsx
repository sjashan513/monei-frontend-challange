import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Check, RotateCcw, Calendar, X } from 'lucide-react';
import { cn } from '@/core/utils';
import { PAYMENT_STATUS_MAP, type PaymentStatus } from '../../domain/models/Payment';

export const PaymentFilters: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Estado 100% atado a la URL (Sin debounces ni estados locales intermedios)
    const currentStatus = searchParams.get('status') || 'ALL';
    const activeOption = currentStatus === 'ALL' ? null : PAYMENT_STATUS_MAP[currentStatus as PaymentStatus];
    const startDate = searchParams.get('start') || '';
    const endDate = searchParams.get('end') || '';

    const hasActiveFilters = currentStatus !== 'ALL' || startDate || endDate;

    // Manejo del click fuera del dropdown de estado (Desktop)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleStatusChange = (status: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (status === 'ALL') newParams.delete('status');
        else newParams.set('status', status);
        setSearchParams(newParams);
        setIsOpen(false);
    };

    // Actualización instantánea de la URL al cambiar la fecha
    const handleDateChange = (type: 'start' | 'end', value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (!value) {
            newParams.delete(type);
        } else {
            newParams.set(type, value);
        }
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSearchParams(new URLSearchParams());
        setIsOpen(false);
        setIsMobileModalOpen(false);
    };

    return (
        <div className="w-full md:w-auto">
            {/* BOTÓN MÓVIL (Activa el Modal) */}
            <button
                onClick={() => setIsMobileModalOpen(true)}
                className={cn(
                    "md:hidden w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-colors border",
                    hasActiveFilters
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                        : "bg-slate-900/50 border-slate-800 text-slate-300"
                )}
            >
                <Filter className="w-4 h-4" />
                {hasActiveFilters ? 'Filtros Activos' : 'Filtrar Resultados'}
            </button>

            {/* CONTENEDOR DE FILTROS (Modal en móvil, Inline en desktop) */}
            <div className={cn(
                "md:flex items-center gap-3",
                isMobileModalOpen ? "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end md:static md:bg-transparent md:p-0" : "hidden"
            )}>
                {/* Contenido del Modal/Inline */}
                <div className={cn(
                    "md:contents",
                    isMobileModalOpen ? "bg-slate-900 border-t border-slate-800 w-full rounded-t-4xl p-6 pb-8 flex flex-col gap-6 animate-in slide-in-from-bottom-8" : ""
                )}>
                    {/* Cabecera del Modal (Solo Móvil) */}
                    {isMobileModalOpen && (
                        <div className="flex items-center justify-between md:hidden mb-2">
                            <h3 className="text-xl font-black text-white">Filtros</h3>
                            <button onClick={() => setIsMobileModalOpen(false)} className="p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Dropdown de Estado */}
                    <div className="relative w-full md:w-auto" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "flex items-center justify-between gap-3 w-full md:w-auto px-4 py-3 md:py-2.5 rounded-2xl border transition-all duration-300",
                                isOpen
                                    ? "bg-slate-800 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] text-white"
                                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                            )}
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                <Filter className={cn("w-4 h-4 shrink-0", currentStatus !== 'ALL' && "text-indigo-400")} />
                                <span className="text-sm md:text-xs font-black uppercase tracking-widest truncate">
                                    {currentStatus === 'ALL' ? 'Estado' : `${activeOption?.label}`}
                                </span>
                            </div>
                            <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-300", isOpen && "rotate-180")} />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 left-0 md:left-auto mt-3 w-full md:w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl md:rounded-4xl shadow-2xl z-60 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="max-h-60 md:max-h-80 overflow-y-auto p-2 custom-scrollbar">
                                    <button
                                        onClick={() => handleStatusChange('ALL')}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-1",
                                            currentStatus === 'ALL' ? "bg-indigo-500/10 text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                        )}
                                    >
                                        <span className="text-xs font-bold">Mostrar todos</span>
                                        {currentStatus === 'ALL' && <Check className="w-4 h-4 text-indigo-400" />}
                                    </button>

                                    <div className="h-px bg-slate-800/60 my-2 mx-2"></div>

                                    {Object.values(PAYMENT_STATUS_MAP).map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleStatusChange(option.id)}
                                            className={cn(
                                                "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                                                currentStatus === option.id
                                                    ? "bg-indigo-500/10 text-white shadow-inner"
                                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                            )}
                                        >
                                            <div className="flex items-center gap-3 truncate">
                                                <div className={cn("w-2 h-2 rounded-full shrink-0", option.color)}></div>
                                                <span className="text-xs font-bold truncate">{option.label}</span>
                                            </div>
                                            {currentStatus === option.id && <Check className="w-4 h-4 text-indigo-400 shrink-0 animate-in zoom-in duration-300" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rango de Fechas */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-3 md:py-2 w-full md:w-auto hover:border-slate-700 transition-colors">
                        <Calendar className="hidden sm:block w-4 h-4 text-slate-400 shrink-0" />
                        <div className="flex items-center justify-between w-full md:w-auto gap-2">
                            <div className="flex flex-col sm:hidden w-full">
                                <span className="text-[10px] uppercase text-slate-500 font-bold mb-1">Desde</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => handleDateChange('start', e.target.value)}
                                    className="bg-transparent text-sm md:text-xs font-medium text-slate-300 outline-none w-full [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                                />
                            </div>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => handleDateChange('start', e.target.value)}
                                className="hidden sm:block bg-transparent text-xs font-medium text-slate-300 outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[0.8] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 w-27.5 transition-opacity"
                                title="Fecha de inicio"
                            />

                            <span className="text-slate-600 text-xs font-black hidden sm:block">→</span>
                            <div className="w-px h-8 bg-slate-800 sm:hidden mx-2"></div>

                            <div className="flex flex-col sm:hidden w-full">
                                <span className="text-[10px] uppercase text-slate-500 font-bold mb-1">Hasta</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => handleDateChange('end', e.target.value)}
                                    className="bg-transparent text-sm md:text-xs font-medium text-slate-300 outline-none w-full [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                                />
                            </div>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => handleDateChange('end', e.target.value)}
                                className="hidden sm:block bg-transparent text-xs font-medium text-slate-300 outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[0.8] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 w-27.5 transition-opacity"
                                title="Fecha de fin"
                            />
                        </div>
                    </div>



                    {/* Botones de acción del Modal (Móvil) / Reset (Desktop) */}
                    <div className="flex gap-3 mt-2 md:mt-0">
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex-1 md:flex-none flex items-center justify-center p-3 md:p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all group"
                                title="Limpiar filtros"
                            >
                                <span className="md:hidden font-bold mr-2 text-sm">Limpiar</span>
                                <RotateCcw className="w-4 h-4 md:group-hover:-rotate-180 transition-transform duration-500" />
                            </button>
                        )}
                        {isMobileModalOpen && (
                            <button onClick={() => setIsMobileModalOpen(false)} className="flex-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-2xl font-bold transition-colors shadow-lg shadow-indigo-500/25">
                                Ver Resultados
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};