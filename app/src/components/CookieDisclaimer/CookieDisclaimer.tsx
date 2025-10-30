import { CookieManager } from '@boxfish-studio/react-cookie-manager';

import { SKCM_CONFIG } from '@/lib/cookieManager';

import './CookieDisclaimer.css';

export function CookieDisclaimer() {
	return <CookieManager configuration={SKCM_CONFIG} />;
}
