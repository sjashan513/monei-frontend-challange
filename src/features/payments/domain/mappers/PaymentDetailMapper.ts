import type { PaymentDetail, PaymentDetailDTO, PaymentStatus } from "../models/Payment";


export const PaymentDetailMapper = {
    toDomain(dto: PaymentDetailDTO): PaymentDetail {
        return {
            id: dto.id,
            accountId: dto.accountId,
            amount: dto.amount / 100,
            amountEUR: (dto.amountEUR || dto.amount) / 100,
            currency: dto.currency,
            status: dto.status as PaymentStatus,
            description: dto.description,
            descriptor: dto.descriptor,
            createdAt: new Date(dto.createdAt * 1000),
            updatedAt: dto.updatedAt ? new Date(dto.updatedAt * 1000) : undefined,

            customer: dto.customer,
            billingDetails: dto.billingDetails,
            shippingDetails: dto.shippingDetails,
            paymentMethod: dto.paymentMethod,
            shop: dto.shop,

            livemode: dto.livemode,
            authorizationCode: dto.authorizationCode, // ¡Adiós al (dto as any)!
            statusCode: dto.statusCode,
            statusMessage: dto.statusMessage,
            fraudDetectorScore: dto.fraudDetectorScore,

            // Mapeo de metadata mucho más limpio sabiendo que es un array seguro
            metadata: Array.isArray(dto.metadata)
                ? dto.metadata.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
                : {},

            urls: {
                callback: dto.callbackUrl,
                complete: dto.completeUrl,
                fail: dto.failUrl,
                cancel: dto.cancelUrl,
            }
        };
    }
};