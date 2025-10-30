import { CookieLibrary } from '@boxfish-studio/react-cookie-manager';

import { SKCM_CONFIG } from '@/lib/cookieManager';

import './CookiePolicyPage.css';

export function CookiePolicyPage() {
	return (
		<div className="container mx-auto mt-10 pb-10">
			<CookieLibrary
				configuration={{
					...SKCM_CONFIG,
					theme: {
						primary: '#e5e5e5',
						light: '#1a1a1a',
					},
				}}
			/>
		</div>
	);
}
