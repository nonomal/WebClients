import { useMemo } from 'react';

import { buyCredit, payInvoice, subscribe } from '@proton/shared/lib/api/payments';
import { ProductParam } from '@proton/shared/lib/apps/product';
import { Api, Currency, Cycle, PlanIDs } from '@proton/shared/lib/interfaces';

import {
    AmountAndCurrency,
    ChargeablePaymentParameters,
    PAYMENT_METHOD_TYPES,
    PaymentMethodFlows,
    PaymentMethodType,
    PaymentVerificator,
    isExistingPaymentMethod,
} from '../core';
import { useCard } from './useCard';
import { useMethods } from './useMethods';
import { usePaypal } from './usePaypal';
import { useSavedMethod } from './useSavedMethod';

export interface Operations {
    buyCredit: () => Promise<unknown>;
    payInvoice: (invoiceId: string) => Promise<unknown>;
    subscribe: (data: { Plans: PlanIDs; Cycle: Cycle; Codes?: string[]; product: ProductParam }) => Promise<unknown>;
}

function getOperations(api: Api, params: ChargeablePaymentParameters): Operations {
    return {
        buyCredit: async () => {
            return api(buyCredit(params));
        },
        payInvoice: async (invoiceId: string) => {
            return api(payInvoice(invoiceId, params));
        },
        subscribe: async (subscriptionData: {
            Plans: PlanIDs;
            Cycle: Cycle;
            Codes?: string[];
            product: ProductParam;
        }) => {
            const { product, ...data } = subscriptionData;

            return api({
                ...subscribe(
                    {
                        ...params,
                        ...data,
                    },
                    product
                ),
                timeout: 60000 * 2,
            });
        },
    };
}

export const usePaymentFacade = (
    {
        amount,
        currency,
        onChargeable,
        coupon,
        flow,
    }: {
        amount: number;
        currency: Currency;
        onChargeable: (
            operations: Operations,
            data: ChargeablePaymentParameters,
            source: PaymentMethodType
        ) => Promise<unknown>;
        coupon?: string;
        flow: PaymentMethodFlows;
    },
    {
        api,
        isAuthenticated,
        verifyPayment,
        verifyPaymentPaypal,
    }: {
        api: Api;
        isAuthenticated: boolean;
        verifyPayment: PaymentVerificator;
        verifyPaymentPaypal: PaymentVerificator;
    }
) => {
    const amountAndCurrency: AmountAndCurrency = {
        Amount: amount,
        Currency: currency,
    };

    const methods = useMethods(
        {
            amount,
            coupon: coupon ?? '',
            flow,
        },
        {
            api,
            isAuthenticated,
        }
    );

    const savedMethod = useSavedMethod(
        {
            amountAndCurrency,
            savedMethod: methods.savedSelectedMethod,
            onChargeable: (params, paymentMethodId) =>
                onChargeable(getOperations(api, params), params, paymentMethodId),
        },
        {
            api,
            verifyPayment,
        }
    );

    const card = useCard(
        {
            amountAndCurrency,
            onChargeable: (params) => onChargeable(getOperations(api, params), params, PAYMENT_METHOD_TYPES.CARD),
        },
        {
            api,
            verifyPayment,
        }
    );

    const paypalIgnoreAmountCheck = flow === 'invoice';
    const paypal = usePaypal(
        {
            amountAndCurrency,
            isCredit: false,
            onChargeable: (params) => onChargeable(getOperations(api, params), params, PAYMENT_METHOD_TYPES.PAYPAL),
            ignoreAmountCheck: paypalIgnoreAmountCheck,
        },
        {
            api,
            verifyPayment: verifyPaymentPaypal,
        }
    );

    const paypalCredit = usePaypal(
        {
            amountAndCurrency,
            isCredit: true,
            onChargeable: (params) =>
                onChargeable(getOperations(api, params), params, PAYMENT_METHOD_TYPES.PAYPAL_CREDIT),
            ignoreAmountCheck: paypalIgnoreAmountCheck,
        },
        {
            api,
            verifyPayment: verifyPaymentPaypal,
        }
    );

    const paymentMethodType: PaymentMethodType | undefined = methods.selectedMethod?.value;
    const selectedProcessor = useMemo(() => {
        if (isExistingPaymentMethod(paymentMethodType)) {
            return savedMethod;
        }

        if (paymentMethodType === PAYMENT_METHOD_TYPES.CARD) {
            return card;
        }

        if (paymentMethodType === PAYMENT_METHOD_TYPES.PAYPAL) {
            return paypal;
        }

        if (paymentMethodType === PAYMENT_METHOD_TYPES.PAYPAL_CREDIT) {
            return paypalCredit;
        }
    }, [paymentMethodType, card, savedMethod, paypal, paypalCredit]);

    return {
        methods,
        savedMethod,
        card,
        paypal,
        paypalCredit,
        selectedProcessor,
        flow,
        amount,
        currency,
    };
};
