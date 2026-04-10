import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../ui/Layout';
import { PaymentListPage } from '@/features/payments/ui/views/PaymentListPage';
import { PaymentDetailPage } from '@/features/payments/ui/views/PaymentDetailPage';
import { AnalyticsPage } from '@/features/analytics/ui/views/AnalyticsPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/analytics" replace />
            },
            {
                path: 'payments',
                element: <PaymentListPage />
            },
            {
                path: 'payments/:id',
                element: <PaymentDetailPage />
            },
            {
                path: 'analytics',
                element: <AnalyticsPage />
            }
        ]
    }
]);