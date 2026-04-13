// Copyright (c) 2026 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import type { ReactNode } from 'react';

import './MdxLayout.css';

interface MdxLayoutProps {
	children: ReactNode;
}

export function MdxLayout({ children }: MdxLayoutProps) {
	return (
		<div className="container mx-auto mt-10 pb-10">
			<div className="legal-content">{children}</div>
		</div>
	);
}
