// Copyright (c) Mysten Labs, Inc.
// Modifications Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ReactDOM from 'react-dom/client';

import '@iota/dapp-kit/dist/index.css';
import './index.css';

import { CookieManagerProvider } from '@boxfish-studio/react-cookie-manager';
import {
	IotaClientProvider,
	WalletProvider,
} from '@iota/dapp-kit';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'sonner';

import App from './App.tsx';
import { CookieDisclaimer } from './components/CookieDisclaimer';
import { ApiAuthProvider } from './contexts/ApiAuthContext.tsx';
import { CONFIG } from './lib/constants';
import { networkConfig } from './networkConfig.ts';

const queryClient = new QueryClient();

// Get stored network or default to configured default
const storedNetwork =
	(localStorage.getItem('iotaNetwork') as
		| 'testnet'
		| 'mainnet') || CONFIG.DEFAULT_NETWORK;

ReactDOM.createRoot(
	document.getElementById('root')!,
).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<IotaClientProvider
				networks={networkConfig}
				defaultNetwork={storedNetwork}
			>
				<WalletProvider autoConnect>
					<ApiAuthProvider>
						<CookieManagerProvider>
							<App />
							<CookieDisclaimer />
						</CookieManagerProvider>
					</ApiAuthProvider>
				</WalletProvider>
			</IotaClientProvider>
		</QueryClientProvider>

		<Toaster />
	</React.StrictMode>,
);
