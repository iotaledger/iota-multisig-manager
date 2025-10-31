// Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { type SKCMConfiguration } from '@boxfish-studio/react-cookie-manager';

export const SKCM_COOKIES_ACCEPTED_NAME =
	'SKCM_cookies_accepted';

const handleCookieConsent = (bool: boolean): void => {
	document.cookie = `${SKCM_COOKIES_ACCEPTED_NAME}=${String(bool)}; path=/; max-age=${60 * 60 * 24 * 365} ; SameSite=Lax; Secure; HTTPOnly`;
};

export const SKCM_CONFIG: SKCMConfiguration = {
	disclaimer: {
		title: undefined,
		body: 'This site uses essential cookies for login, and tracking tools for analytics. Essential cookies are required while tracking ones are set only with consent. Learn more in our ',
		policyText: 'Cookie Policy',
		policyUrl: '/cookie-policy',
		acceptButtonText: 'Accept',
		rejectButtonText: 'Decline',
	},
	services: {
		customNecessaryCookies: [
			{
				name: SKCM_COOKIES_ACCEPTED_NAME,
				purpose: 'Stores your cookie consent preference.',
				expiry: '1 year',
				type: 'HTTP',
				showDisclaimerIfMissing: true,
			},
			{
				name: 'connected-wallet',
				purpose:
					'Stores the user’s authentication token to keep the user securely logged in. This cookie is essential for the web app to function.',
				expiry: '1 year',
				type: 'HTTP',
				showDisclaimerIfMissing: false,
			},
		],
	},
	onAcceptCookies: () => handleCookieConsent(true),
	onDeclineCookies: () => handleCookieConsent(false),
};
