// Copyright (c) 2026 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { MdxLayout } from '@/components/mdx/MdxLayout';

import PrivacyContent from './legal/content/privacy-policy.mdx';

export function PrivacyPolicyPage() {
	return (
		<MdxLayout>
			<PrivacyContent />
		</MdxLayout>
	);
}
