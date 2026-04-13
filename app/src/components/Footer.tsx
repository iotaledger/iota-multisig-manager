// Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { IotaLogoWeb } from '@iota/apps-ui-icons';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
	{
		text: 'Terms of Use',
		url: '/terms-of-use',
	},
	{ text: 'Privacy Policy', url: '/privacy-policy' },
	{ text: 'Cookie Policy', url: '/cookie-policy' },
];

export function Footer() {
	return (
		<footer className="border-t py-8 font-medium text-sm">
			<div className="container mx-auto">
				<div className="flex flex-row items-start justify-between w-full">
					<div className="flex flex-row items-center gap-8 whitespace-nowrap">
						<Link to="/">
							<IotaLogoWeb height="auto" width={120} />
						</Link>
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

					<div className="flex flex-col gap-2 text-neutral-800">
						<span className="font-semibold">
							© IOTA Ecosystem DLT Foundation{' '}
							{new Date().getFullYear()}
						</span>
						<div className="flex flex-col ">
							<span>Tamouh Tower</span>
							<span>Office No. 1301 & 1302</span>
							<span>13th Floor</span>
							<span>Tamouh</span>
							<span>Al Reem Island</span>
							<span>Abu Dhabi UAE</span>
							<Link
								className="hover:underline"
								to="mailto:contact@iotadlt.foundation"
							>
								contact@iotadlt.foundation
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
