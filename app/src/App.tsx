// Copyright (c) Mysten Labs, Inc.
// Modifications Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react';
import {
	BrowserRouter,
	useLocation,
} from 'react-router-dom';

import { AppRouter } from './components/AppRouter';
import { Footer } from './components/Footer';
import { Header } from './components/header';
import { TestModeBanner } from './components/TestModeBanner';

function AppContent() {
	const [isBannerDismissed, setIsBannerDismissed] =
		useState(false);
	const location = useLocation();
	const hideHeaderOnPaths = ['/create'];
	const hideBannerOnPaths = ['/create'];

	// Hide banner on tools pages (public/offline pages)
	const shouldHideHeader = hideHeaderOnPaths.includes(
		location.pathname,
	);
	const shouldHideBanner =
		hideBannerOnPaths.includes(location.pathname) ||
		location.pathname.startsWith('/tools') ||
		isBannerDismissed;

	return (
		<div className="flex flex-col flex-1">
			{!shouldHideHeader && <Header />}
			<div className="flex-1">
				<AppRouter />
			</div>
			<Footer />
			{!shouldHideBanner && (
				<TestModeBanner
					onDismiss={() => setIsBannerDismissed(true)}
				/>
			)}
		</div>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}

export default App;
