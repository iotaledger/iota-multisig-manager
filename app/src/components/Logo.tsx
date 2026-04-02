// Copyright (c) Mysten Labs, Inc.
// Modifications Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { Link } from 'react-router-dom';

interface LogoProps {
	size?: 'sm' | 'md' | 'lg';
	asLink?: boolean;
}

export function Logo({
	size = 'md',
	asLink = true,
}: LogoProps) {
	const sizeConfig = {
		sm: { height: 30 },
		md: { height: 40 },
		lg: { height: 50 },
	};

	const { height } = sizeConfig[size];

	const logoContent = (
		<div className="relative inline-block transition-transform duration-300 ease-out hover:scale-105">
			{/* Desktop Logo */}
			<img
				src="/iota-multisig-manager.svg"
				alt="IOTA Multisig Manager"
				style={{ height: `${height}px` }}
				className="hidden md:block h-auto w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
			/>
			{/* Mobile Logo */}
			<img
				src="/iota-multisig-manager-mobile.svg"
				alt="IOTA"
				style={{ height: `${height}px` }}
				className="block md:hidden h-auto w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
			/>
		</div>
	);

	if (asLink) {
		return (
			<Link
				to="/"
				className="inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
			>
				{logoContent}
			</Link>
		);
	}

	return logoContent;
}
