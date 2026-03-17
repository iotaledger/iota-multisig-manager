// Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { IotaLogoWeb } from '@iota/apps-ui-icons';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
	{
		text: 'Terms of Use',
		url: '/terms-of-service',
	},
	{ text: 'Privacy Policy', url: '/privacy-policy' },
	{ text: 'Cookie Policy', url: '/cookie-policy' },
];

export function Footer() {
	return (
		<footer className="border-t py-8 font-medium text-sm">
			<div className="container mx-auto">
				<div className="flex flex-row items-center justify-between w-full">
					<div className="flex flex-row items-center gap-4 whitespace-nowrap">
						<Link to="/">
							<IotaLogoWeb height="auto" width={120} />
						</Link>
						<span className="text-neutral-800">
							© IOTA Ecosystem DLT Foundation{' '}
							{new Date().getFullYear()}
						</span>
					</div>

					<nav className="flex flex-row gap-4">
						{FOOTER_LINKS.map((link) => (
							<Link
								key={link.text}
								to={link.url}
								className="hover:underline"
								{...(link.url.startsWith('http')
									? {
											target: '_blank',
											rel: 'noopener noreferrer',
										}
									: {})}
							>
								{link.text}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
}
