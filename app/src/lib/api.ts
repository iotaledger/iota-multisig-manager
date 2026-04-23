// Copyright (c) Mysten Labs, Inc.
// Modifications Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { IotaMultisigClient } from '@iotaledger/iota-multisig-manager';

const API_BASE_URL =
	import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = new IotaMultisigClient(
	API_BASE_URL,
	'cookie',
);
