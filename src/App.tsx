import { useState } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '@/core/apollo/client';
import { PaymentListPage } from '@/features/payments/ui/views/PaymentListPage';
import { AnalyticsPage } from '@/features/analytics/ui/views/AnalyticsPage';
import { cn } from '@/core/utils';
import { CreditCard, PieChart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'payments' | 'analytics'>('payments');

  return (
    <ApolloProvider client={client}>
      {/* Fondo ultra oscuro con un ligerísimo tinte índigo para darle profundidad */}
      <div className="min-h-screen bg-[#0B0F19] text-slate-200 selection:bg-teal-500/30 font-sans">

        {/* Header al estilo MONEI */}
        <header className="border-b border-slate-800/60 bg-[#0B0F19]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-6xl">

            {/* MONEI Logo - Imitando su fuente geométrica y su color Menta */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <span className="text-white font-black text-xl tracking-tighter">M</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                MONEI <span className="text-teal-400 font-medium">Dashboard</span>
              </h1>
            </div>

            {/* Navegación estilo "Píldora" */}
            <nav className="flex gap-1 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
              <button
                onClick={() => setActiveTab('payments')}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                  activeTab === 'payments'
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <CreditCard className="w-4 h-4" />
                Transacciones
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                  activeTab === 'analytics'
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                )}
              >
                <PieChart className="w-4 h-4" />
                Analytics
              </button>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-6xl relative">
          {/* Efectos de luz de fondo (Glows) sutiles con los colores de MONEI */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

          {/* Renderizado de Vistas */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'payments' ? <PaymentListPage /> : <AnalyticsPage />}
          </div>
        </main>
      </div>
    </ApolloProvider>
  );
}