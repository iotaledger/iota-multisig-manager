// Copyright (c) Mysten Labs, Inc.
// Modifications Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { AlertTriangle, X } from 'lucide-react';

import { useNetwork } from '../contexts/NetworkContext';

interface TestModeBannerProps {
	onDismiss?: () => void;
}
export function TestModeBanner({
	onDismiss,
}: TestModeBannerProps) {
	const { isTestMode, network, setNetwork } = useNetwork();

	if (!isTestMode) {
		return null;
	}

	return (
		<div className="bg-yellow-100 border-t-2 border-yellow-300 py-3">
			<div className="flex items-center justify-between container mx-auto">
				<div className="flex items-center gap-3">
					<AlertTriangle className="w-5 h-5 text-yellow-700" />
					<div>
						<p className="text-sm font-medium text-yellow-800">
							Test Mode Active
						</p>
						<p className="text-xs text-yellow-700">
							You're connected to {network}. No real funds
							will be used.
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={() => setNetwork('mainnet')}
						className="text-xs bg-black hover:bg-gray-800 text-white px-3 py-1.5 rounded transition-colors"
					>
						Switch to Mainnet
					</button>
					<button
						onClick={onDismiss}
						className="p-1 hover:bg-yellow-200 rounded transition-colors"
						title="Dismiss"
					>
						<X className="w-4 h-4 text-yellow-700" />
					</button>
				</div>
			</div>
		</div>
	);
}
