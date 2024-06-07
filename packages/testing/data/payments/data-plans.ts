import { ADDON_NAMES, CYCLE, PLANS, PLAN_TYPES } from '@proton/shared/lib/constants';
import { PlansMap } from '@proton/shared/lib/interfaces';

export const PLANS_MAP: PlansMap = {
    [PLANS.MAIL_PRO]: {
        ID: 'BKiAUbkGnUPiy2c3b0sBCK557OBnWD7ACqqX3VPoZqOOyeMdupoWcjrPDBHy3ANfFKHnJs6qdQrdvHj7zjon_g==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.PLAN,
        Name: PLANS.MAIL_PRO,
        Title: 'Mail Essentials',
        MaxDomains: 3,
        MaxAddresses: 10,
        MaxCalendars: 25,
        MaxSpace: 16106127360,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 1,
        Features: 1,
        State: 1,
        Pricing: {
            '1': 799,
            '12': 8388,
            '24': 15576,
        },
        DefaultPricing: {
            '1': 799,
            '12': 8388,
            '24': 15576,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 799,
    },
    [ADDON_NAMES.MEMBER_MAIL_PRO]: {
        ID: 'FK4MKKIVJqOC9Pg_sAxCjNWf8PM9yGzrXO3eXq8sk5RJB6HtaRBNUEcnvJBrQVPAtrDSoTNq4Du3FpqIxyMhHQ==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.MEMBER_MAIL_PRO,
        Title: '+1 User',
        MaxDomains: 0,
        MaxAddresses: 10,
        MaxCalendars: 25,
        MaxSpace: 16106127360,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 1,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 799,
            '12': 8388,
            '24': 15576,
        },
        DefaultPricing: {
            '1': 799,
            '12': 8388,
            '24': 15576,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 799,
    },
    [PLANS.BUNDLE_PRO]: {
        ID: 'q6fRrEIn0nyJBE_-YSIiVf80M2VZhOuUHW5In4heCyOdV_nGibV38tK76fPKm7lTHQLcDiZtEblk0t55wbuw4w==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.PLAN,
        Name: PLANS.BUNDLE_PRO,
        Title: 'Business',
        MaxDomains: 10,
        MaxAddresses: 15,
        MaxCalendars: 25,
        MaxSpace: 536870912000,
        MaxMembers: 1,
        MaxVPN: 10,
        MaxTier: 2,
        MaxAI: 0,
        Services: 15,
        Features: 1,
        State: 1,
        Pricing: {
            '1': 1299,
            '12': 13188,
            '24': 23976,
        },
        DefaultPricing: {
            '1': 1299,
            '12': 13188,
            '24': 23976,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 1299,
    },
    [PLANS.BUNDLE_PRO_2024]: {
        ID: 'q6fRrEIn0nyJBE_-YSIiVf80M2VZhOuUHW5In4heCyOdV_nGibV38tK76fPKm7lTHQLcDiZtEblk0t55wbuw4w==',
        ParentMetaPlanID: '',
        Type: 1,
        Name: PLANS.BUNDLE_PRO_2024,
        Title: 'Business',
        MaxDomains: 15,
        MaxAddresses: 15,
        MaxCalendars: 25,
        MaxSpace: 536870912000,
        MaxMembers: 1,
        MaxVPN: 10,
        MaxTier: 2,
        MaxAI: 0,
        Services: 15,
        Features: 1,
        State: 1,
        Pricing: {
            '1': 1499,
            '12': 15588,
            '24': 31176,
        },
        DefaultPricing: {
            '1': 1499,
            '12': 15588,
            '24': 31176,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 1499,
    },
    [ADDON_NAMES.DOMAIN_BUNDLE_PRO]: {
        ID: '39hry1jlHiPzhXRXrWjfS6t3fqA14QbYfrbF30l2PYYWOhVpyJ33nhujM4z4SHtfuQqTx6e7oSQokrqhLMD8LQ==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.DOMAIN_BUNDLE_PRO,
        Title: '+1 Domain for Business',
        MaxDomains: 1,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 15,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 150,
            '12': 1680,
            '24': 3120,
        },
        DefaultPricing: {
            '1': 150,
            '12': 1680,
            '24': 3120,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 150,
    },
    [ADDON_NAMES.DOMAIN_BUNDLE_PRO_2024]: {
        ID: '39hry1jlHiPzhXRXrWjfS6t3fqA14QbYfrbF30l2PYYWOhVpyJ33nhujM4z4SHtfuQqTx6e7oSQokrqhLMD8LQ==',
        ParentMetaPlanID: '',
        Type: 0,
        Name: ADDON_NAMES.DOMAIN_BUNDLE_PRO_2024,
        Title: '+1 Domain for Business',
        MaxDomains: 1,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 15,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 150,
            '12': 1680,
            '24': 3120,
        },
        DefaultPricing: {
            '1': 150,
            '12': 1680,
            '24': 3120,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 150,
    },
    [ADDON_NAMES.MEMBER_BUNDLE_PRO]: {
        ID: '0WjWEbOmKh7F2a1Snx2FJKA7a3Fm05p-nIZ0TqiHjDDUa6oHnsyWeeVXgSuzumCmFE8_asJsom9ZzGbx-eDecw==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.MEMBER_BUNDLE_PRO,
        Title: '+1 User for Business',
        MaxDomains: 0,
        MaxAddresses: 15,
        MaxCalendars: 25,
        MaxSpace: 536870912000,
        MaxMembers: 1,
        MaxVPN: 10,
        MaxTier: 0,
        MaxAI: 0,
        Services: 15,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 1299,
            '12': 13188,
            '24': 23976,
        },
        DefaultPricing: {
            '1': 1299,
            '12': 13188,
            '24': 23976,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 1299,
    },
    [ADDON_NAMES.MEMBER_BUNDLE_PRO_2024]: {
        ID: '0WjWEbOmKh7F2a1Snx2FJKA7a3Fm05p-nIZ0TqiHjDDUa6oHnsyWeeVXgSuzumCmFE8_asJsom9ZzGbx-eDecw==',
        ParentMetaPlanID: '',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_BUNDLE_PRO_2024,
        Title: '+1 User for Business',
        MaxDomains: 0,
        MaxAddresses: 15,
        MaxCalendars: 25,
        MaxSpace: 536870912000,
        MaxMembers: 1,
        MaxVPN: 10,
        MaxTier: 0,
        MaxAI: 0,
        Services: 15,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 1499,
            '12': 15588,
            '24': 31176,
        },
        DefaultPricing: {
            '1': 1499,
            '12': 15588,
            '24': 31176,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 1499,
    },
    [PLANS.FAMILY]: {
        ID: 'UOZXnOXW6gC7xjRiJC14rn0UazL4M7wuHDdMILF1H6xnTW41x2ka_MY4XikenQOyBAk4r6ra5jfPzs2FybDKTg==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.PLAN,
        Name: PLANS.FAMILY,
        Title: 'Proton Family',
        MaxDomains: 3,
        MaxAddresses: 90,
        MaxCalendars: 150,
        MaxSpace: 3298534883328,
        MaxMembers: 6,
        MaxVPN: 60,
        MaxTier: 2,
        MaxAI: 0,
        Services: 15,
        Features: 1,
        State: 1,
        Pricing: {
            '1': 2999,
            '12': 28788,
            '24': 47976,
        },
        DefaultPricing: {
            '1': 2999,
            '12': 28788,
            '24': 47976,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 2999,
    },
    [PLANS.VPN_PRO]: {
        ID: 'AzampIHTO3xrN5LwsFXdd4fNyasQ4pojbycVaupg7I2pKhr5pzwQGxuFUgTF_fvUZiNZ_tVjjeCs8_DnOfADYQ==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.PLAN,
        Name: PLANS.VPN_PRO,
        Title: 'VPN Essentials',
        MaxDomains: 0,
        MaxAddresses: 2,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 2,
        MaxVPN: 20,
        MaxTier: 2,
        MaxAI: 0,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 1798,
            '12': 16776,
            '24': 28752,
        },
        DefaultPricing: {
            '1': 1798,
            '12': 16776,
            '24': 28752,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 1798,
    },
    [ADDON_NAMES.MEMBER_VPN_PRO]: {
        ID: 'XPnq2M_XbuLj7ct30C-hy0AwvPSjV_uMmbzrNeNRLQ63L8lOU7oSO1fRbjZhn0x4GFfypOHwInBKGFkS90AUKQ==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.MEMBER_VPN_PRO,
        Title: '+1 User',
        MaxDomains: 0,
        MaxAddresses: 1,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 1,
        MaxVPN: 10,
        MaxTier: 2,
        MaxAI: 0,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 898,
            '12': 8388,
            '24': 14376,
        },
        DefaultPricing: {
            '1': 898,
            '12': 8388,
            '24': 14376,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 898,
    },
    [PLANS.VPN_BUSINESS]: {
        ID: 'Br7AescivJNN22BCAqgq1aDCH0gvGXseztEeC2wurDH43gNMNfu77T3Y-kVZdp9wQH8r5nmycmQXLhBlh_gv9g==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.PLAN,
        Name: PLANS.VPN_BUSINESS,
        Title: 'VPN Business',
        MaxDomains: 0,
        MaxAddresses: 2,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 2,
        MaxVPN: 20,
        MaxTier: 2,
        MaxAI: 0,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 7397,
            '12': 71964,
            '24': 129528,
        },
        DefaultPricing: {
            '1': 7397,
            '12': 71964,
            '24': 129528,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 7397,
    },
    [ADDON_NAMES.MEMBER_VPN_BUSINESS]: {
        ID: '2XuG4XQN__aa3uie3ijJ1xVPs9vJP_9TJdY34ky3hJHsMajkQshefL7AXOfW1Z5_wV-GQ3fCg9lCskuJ92wHKg==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.MEMBER_VPN_BUSINESS,
        Title: '+1 User',
        MaxDomains: 0,
        MaxAddresses: 1,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 1,
        MaxVPN: 10,
        MaxTier: 2,
        MaxAI: 0,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 1199,
            '12': 11988,
            '24': 21576,
        },
        DefaultPricing: {
            '1': 1199,
            '12': 11988,
            '24': 21576,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 1199,
    },
    [ADDON_NAMES.IP_VPN_BUSINESS]: {
        ID: '3pf-EZUUjPtbBvBREF0TOxA4Cq6lYozP7fyUhCa0NnU3Im_QCoihoHN1vJKFWd7_hOx1lR35tAG3C8NjPr70RQ==',
        ParentMetaPlanID: '',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.IP_VPN_BUSINESS,
        Title: '+1 Ip',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 2,
        MaxAI: 0,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 4999,
            '12': 47988,
            '24': 86376,
        },
        DefaultPricing: {
            '1': 4999,
            '12': 47988,
            '24': 86376,
        },
        PeriodEnd: {
            '1': 1702849536,
            '12': 1731879936,
            '24': 1763415936,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 4999,
    },
    [PLANS.PASS_PRO]: {
        ID: 'OySTfh3gyWweyXPRW-BkZrGSSenuCOcDK4adqjncPgmBzlMrFUCrXCpTlbT-7oRVpi0alpmonYcJsFcuqpVefg==',
        ParentMetaPlanID: 'hUcV0_EeNwUmXA6EoyNrtO-ZTD8H8F6LvNaSjMaPxB5ecFkA7y-5kc3q38cGumJENGHjtSoUndkYFUx0_xlJeg==',
        Type: PLAN_TYPES.PLAN,
        Name: PLANS.PASS_PRO,
        Title: 'Pass Essentials',
        MaxDomains: 0,
        MaxAddresses: 1,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 499,
            '12': 4788,
            '24': 8376,
        },
        DefaultPricing: {
            '1': 499,
            '12': 4788,
            '24': 8376,
        },
        PeriodEnd: {
            '1': 1711138689,
            '12': 1740255489,
            '24': 1771791489,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 499,
    },
    [ADDON_NAMES.MEMBER_PASS_PRO]: {
        ID: 'dxuXGng5ZEeAighAzh3n-G4UCijM8mLDR9hBevtBb9ih6g59tTEhmJ-dud_j4yLfGlCL01HGOYNYo_x3ra85FA==',
        ParentMetaPlanID: 'OySTfh3gyWweyXPRW-BkZrGSSenuCOcDK4adqjncPgmBzlMrFUCrXCpTlbT-7oRVpi0alpmonYcJsFcuqpVefg==',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.MEMBER_PASS_PRO,
        Title: '+1 User',
        MaxDomains: 0,
        MaxAddresses: 1,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 499,
            '12': 4788,
            '24': 8376,
        },
        DefaultPricing: {
            '1': 499,
            '12': 4788,
            '24': 8376,
        },
        PeriodEnd: {
            '1': 1711138689,
            '12': 1740255489,
            '24': 1771791489,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 499,
    },
    [PLANS.PASS_BUSINESS]: {
        ID: 'EWlbA69KuBB8OH435nvAiMURv8GBAkFIhkTw5bXjnMdlknH9_F4DOqK5xoqieZv2aBcuFIwq9eAvY-BNPQesCg==',
        ParentMetaPlanID: 'hUcV0_EeNwUmXA6EoyNrtO-ZTD8H8F6LvNaSjMaPxB5ecFkA7y-5kc3q38cGumJENGHjtSoUndkYFUx0_xlJeg==',
        Type: PLAN_TYPES.PLAN,
        Name: PLANS.PASS_BUSINESS,
        Title: 'Pass Business',
        MaxDomains: 1,
        MaxAddresses: 1,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 699,
            '12': 7188,
            '24': 11976,
        },
        DefaultPricing: {
            '1': 699,
            '12': 7188,
            '24': 11976,
        },
        PeriodEnd: {
            '1': 1711138689,
            '12': 1740255489,
            '24': 1771791489,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 699,
    },
    [ADDON_NAMES.MEMBER_PASS_BUSINESS]: {
        ID: 'HW7S9giA-LN_tqrOszfTcj6OnEKFqgwUB4aSBQD2lmZHoW_O-B-f1sD8GcYxQePUWG_AP2L4HXIeoxhiSzBH8w==',
        ParentMetaPlanID: 'EWlbA69KuBB8OH435nvAiMURv8GBAkFIhkTw5bXjnMdlknH9_F4DOqK5xoqieZv2aBcuFIwq9eAvY-BNPQesCg==',
        Type: PLAN_TYPES.ADDON,
        Name: ADDON_NAMES.MEMBER_PASS_BUSINESS,
        Title: '+1 User',
        MaxDomains: 0,
        MaxAddresses: 1,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 699,
            '12': 7188,
            '24': 11976,
        },
        DefaultPricing: {
            '1': 699,
            '12': 7188,
            '24': 11976,
        },
        PeriodEnd: {
            '1': 1711138689,
            '12': 1740255489,
            '24': 1771791489,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: CYCLE.MONTHLY,
        Amount: 699,
    },
    [PLANS.MAIL_BUSINESS]: {
        ID: 'yoSFmhF2UBGCTGNxzVU8KBNZkJsDP-Wqvgon8LBw41_2QvbdrJUwKgyp0XAtON5BpNY-FpgIFYdVzT2U-ZJ0eg==',
        ParentMetaPlanID: 'hUcV0_EeNwUmXA6EoyNrtO-ZTD8H8F6LvNaSjMaPxB5ecFkA7y-5kc3q38cGumJENGHjtSoUndkYFUx0_xlJeg==',
        Type: 1,
        Name: PLANS.MAIL_BUSINESS,
        Title: 'Mail Professional',
        MaxDomains: 10,
        MaxAddresses: 10,
        MaxCalendars: 25,
        MaxSpace: 53687091200,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 1,
        Features: 1,
        State: 1,
        Pricing: {
            '1': 1099,
            '12': 11988,
        },
        DefaultPricing: {
            '1': 1099,
            '12': 11988,
        },
        PeriodEnd: {
            '1': 1718453594,
            '12': 1747311194,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 1099,
    },
    [ADDON_NAMES.MEMBER_MAIL_BUSINESS]: {
        ID: 'IDAj2rZGOXCdx2HL5h4ggc7SjAubaBiXtf3L4xwFLFBnDHYWqqSqBaKpLIU43OEl-rU16xG608NDMfPRxayV3Q==',
        ParentMetaPlanID: 'yoSFmhF2UBGCTGNxzVU8KBNZkJsDP-Wqvgon8LBw41_2QvbdrJUwKgyp0XAtON5BpNY-FpgIFYdVzT2U-ZJ0eg==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_MAIL_BUSINESS,
        Title: '+1 User',
        MaxDomains: 0,
        MaxAddresses: 10,
        MaxCalendars: 25,
        MaxSpace: 53687091200,
        MaxMembers: 1,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 1,
        Features: 1,
        State: 1,
        Pricing: {
            '1': 1099,
            '12': 11988,
        },
        DefaultPricing: {
            '1': 1099,
            '12': 11988,
        },
        PeriodEnd: {
            '1': 1718453594,
            '12': 1747311194,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 1099,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_VPN]: {
        ID: 'CK-HjTDgMzl_HxNWq9mojwWAv3K3FtreQaV7ycFhACsyu7LNKF8AG_6iULAH-vSZveLHn_eMFul2vwAXeUs1KA==',
        ParentMetaPlanID: 'pIJGEYyNFsPEb61otAc47_X8eoSeAfMSokny6dmg3jg2JrcdohiRuWSN2i1rgnkEnZmolVx4Np96IcwxJh1WNw==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_VPN,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '15': 12499,
            '18': 14999,
            '24': 19999,
            '30': 24999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '15': 12499,
            '18': 14999,
            '24': 19999,
            '30': 24999,
        },
        PeriodEnd: {
            '1': 1718461753,
            '12': 1747319353,
            '15': 1755268153,
            '18': 1763216953,
            '24': 1778855353,
            '30': 1794752953,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_VPN2024]: {
        ID: 'klHlWI9EqPULc0sWO_C36DM8eHJ1H1bzIo4EmX-HG_VbDfS67gMvCt_5mhHFwHh9n02aNoux8qj4bUZOaebRUg==',
        ParentMetaPlanID: 'PhqBg0UrNpdO4nb_-TwW5-icFlifQcrebtrMga7L11Xp21l0mekW9gGmor0BsG3YCfvqT1bWBo4XDAJgK3buqQ==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_VPN2024,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '3': 2997,
            '12': 9999,
            '15': 12499,
            '18': 14999,
            '24': 19999,
            '30': 24999,
        },
        DefaultPricing: {
            '1': 999,
            '3': 2997,
            '12': 9999,
            '15': 12499,
            '18': 14999,
            '24': 19999,
            '30': 24999,
        },
        PeriodEnd: {
            '1': 1718461753,
            '3': 1723732153,
            '12': 1747319353,
            '15': 1755268153,
            '18': 1763216953,
            '24': 1778855353,
            '30': 1794752953,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_VPN_PASS_BUNDLE]: {
        ID: 'ul47gJFW0fATV18Rv5lK3kOxdfUOMTyM7cNDtAOg9j3Xz0k3lOwhcWDg0QwcBdQE4zVnz1epptUBFmxSXxCeUQ==',
        ParentMetaPlanID: 'L88CBy7oHAAm7k3QqvJGnscflaHiFDrdLOWr5V7sMcAltzO8bd91bglN4MJakiiLc_Q9L7VtZPHJd06xkKn6Ow==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_VPN_PASS_BUNDLE,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 12,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1718461753,
            '12': 1747319353,
            '24': 1778855353,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_MAIL_PRO]: {
        ID: 'jnoPyf11v2h7BgdQlYnFD6FeXc7poh0TbT-wvOwzOM0fHF03hglroQa2RmXDJRz7FtBGnCbgHAuMTH9CUxMRUA==',
        ParentMetaPlanID: 'BKiAUbkGnUPiy2c3b0sBCK557OBnWD7ACqqX3VPoZqOOyeMdupoWcjrPDBHy3ANfFKHnJs6qdQrdvHj7zjon_g==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_MAIL_PRO,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 1,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1719044298,
            '12': 1747901898,
            '24': 1779437898,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_BUNDLE_PRO]: {
        ID: 'vF11E5JaE5KiGvIf4xBEZoiWTCJ87pybUpZYtGH854V5lwFl0FpqRLK4D5jMFj8b9nJpG8RPHWLVP_mkFsRyug==',
        ParentMetaPlanID: 'q6fRrEIn0nyJBE_-YSIiVf80M2VZhOuUHW5In4heCyOdV_nGibV38tK76fPKm7lTHQLcDiZtEblk0t55wbuw4w==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_BUNDLE_PRO,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 15,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1719044298,
            '12': 1747901898,
            '24': 1779437898,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_VPN_PRO]: {
        ID: 'e6JuwJ2yhtzYEjBQfdLmPNt0-yZteqV2kSxXWZ47GnISxuMWrvNCa2PHk6wi0go_4tXwq38DT4UKrEM85ZjLoQ==',
        ParentMetaPlanID: 'AzampIHTO3xrN5LwsFXdd4fNyasQ4pojbycVaupg7I2pKhr5pzwQGxuFUgTF_fvUZiNZ_tVjjeCs8_DnOfADYQ==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_VPN_PRO,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1719044298,
            '12': 1747901898,
            '24': 1779437898,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_VPN_BIZ]: {
        ID: 'Bb3FFQzShbHR_GMVgpfYa2CcWbi7LoqOCh2uxQFSNVUCreuCFicpb6BUIX54w4fFC5k7t8hqfvTTjUN5DSoY-w==',
        ParentMetaPlanID: 'gpfidfvvitJlS13V7HNO1_1dFkZjIgPCpTZr-IuUeZojByNEYlNp2HL2y-mMm-EJfsbidxM4E-z4rTjP6nsn8A==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_VPN_BIZ,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 4,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1719044298,
            '12': 1747901898,
            '24': 1779437898,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_PASS_PRO]: {
        ID: 'DZmUxr28FB-XKrCddigZEt0ikO16l0dMyUJ0oK1j2GoDEPHJadlpSMueP8OOyhkdPNBndGxQQ0AgAD-HqhICnA==',
        ParentMetaPlanID: 'nIEIvpgfK81xvkIBV5UneTuRdXawEYXbNfmFNhLdwc-9-rH0ZEpR6Xihbqk4QA2CmYiNurXPQFvu3Bgca7hXVg==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_PASS_PRO,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1719044298,
            '12': 1747901898,
            '24': 1779437898,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_PASS_BIZ]: {
        ID: 'uFNjdGsp73iep-S9gw-Bd4VaKKHd-BTej65TaqGfxJeEx3ZDIey259b7ap3V833IMiFx91CsBqpcFt95azM1Kg==',
        ParentMetaPlanID: 'rMreZHS7obI2or1iQvPxOXvYqFk0CvxuPW72AQbHuwmDVwBbkOCnc0NDQdiVe5OKH9bVRAEHPotu1ui4foKMLA==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_PASS_BIZ,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1719044298,
            '12': 1747901898,
            '24': 1779437898,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_FAMILY]: {
        ID: '1BSc81hGVLVMzC_JLFpMQ3vcUrip_BH8E7PS0eHqMEDJ6sZVBC7SwwLhGSINQALf9PSZzPLFMYevvfA9IFtMHg==',
        ParentMetaPlanID: 'UOZXnOXW6gC7xjRiJC14rn0UazL4M7wuHDdMILF1H6xnTW41x2ka_MY4XikenQOyBAk4r6ra5jfPzs2FybDKTg==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_FAMILY,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 15,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1719044298,
            '12': 1747901898,
            '24': 1779437898,
        },
        Currency: 'CHF',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_MAILPLUS]: {
        ID: 'F-ikXC2syNNn_JwsUV1QfOdMK0HlK1jJkxcuxuZTf96mCwITPe4frUfo_kAYuDISSVqfPsNwk14oQQIfPvI4Gw==',
        ParentMetaPlanID: 'l8vWAXHBQmv0u7OVtPbcqMa4iwQaBqowINSQjPrxAr-Da8fVPKUkUcqAq30_BCxj1X0nW70HQRmAa-rIvzmKUA==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_MAILPLUS,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 1,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1718461753,
            '12': 1747319353,
            '24': 1778855353,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_DRIVEPLUS]: {
        ID: 's-x11OOoEMfUM_HVpHTrdTZ0IdCQlWg2-PHt18o5LVGVxP_I6WGByN22byNZPW26bP9icvf-pZTpJNbHRyMyDQ==',
        ParentMetaPlanID: '-Bpgivr5H2qGDRiUQ4-7gm5YLf215MEgZCdzOtLW5psxgB8oNc8OnoFRykab4Z23EGEW1ka3GtQPF9xwx9-VUA==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_DRIVE_PRO,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 2,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1718461753,
            '12': 1747319353,
            '24': 1778855353,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_BUNDLE]: {
        ID: 'fdahCnlu7Ni4Xwfv0JmTzLhPWd88y4Z70FzgGiufmQ8oH864YIH6ucJAz5hMARMEo4Xk9uAxW5OstVvV0a6HuQ==',
        ParentMetaPlanID: 'lY2ZCYkVNfl_osze70PRoqzg34MQI64mE3-pLc-yMp_6KXthkV1paUsyS276OdNwucz9zKoWKZL_TgtKxOPb0w==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_BUNDLE,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 15,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1718461753,
            '12': 1747319353,
            '24': 1778855353,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_PASS]: {
        ID: '9llrakjgfS2vQAg7s8F_da0Di5oi4rMXvJ6Z2u-qPxZMR27jy3e8QNRmQM2jN6Px-J-MAMfSNewaFSKdCLGPyQ==',
        ParentMetaPlanID: 'kBZYBzgHWtjW5igU33BXqwVZ66GBdJi4ycXPzZjyUmp840-O2yXyNEO0ayRveZKNnASS_btzUY-WkI_mcvNuOg==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_PASS,
        Title: '+1 AI Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 1,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1718461753,
            '12': 1747319353,
            '24': 1778855353,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
    [ADDON_NAMES.MEMBER_SCRIBE_MAIL_BUSINESS]: {
        ID: 'nYUlw3zZzxzboyuGGj8nkajrvOb-cANMlQyCz6WlmZnasZKQQ-f4HXy94jrPP5WpUdlkVETDr2DvRDRhSni1mg==',
        ParentMetaPlanID: 'yoSFmhF2UBGCTGNxzVU8KBNZkJsDP-Wqvgon8LBw41_2QvbdrJUwKgyp0XAtON5BpNY-FpgIFYdVzT2U-ZJ0eg==',
        Type: 0,
        Name: ADDON_NAMES.MEMBER_SCRIBE_MAIL_BUSINESS,
        Title: '+1 Scribe Seat',
        MaxDomains: 0,
        MaxAddresses: 0,
        MaxCalendars: 0,
        MaxSpace: 0,
        MaxMembers: 0,
        MaxVPN: 0,
        MaxTier: 0,
        MaxAI: 0,
        Services: 8,
        Features: 0,
        State: 1,
        Pricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        DefaultPricing: {
            '1': 999,
            '12': 9999,
            '24': 19999,
        },
        PeriodEnd: {
            '1': 1720271347,
            '12': 1749215347,
            '24': 1780751347,
        },
        Currency: 'EUR',
        Quantity: 1,
        Offers: [],
        Cycle: 1,
        Amount: 999,
    },
};
