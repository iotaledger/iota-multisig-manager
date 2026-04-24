// Copyright (c) 2026 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import type { PublicKey } from '@iota/iota-sdk/cryptography';

import type { MultisigInfo } from './blockchain.service';

/**
 * Generic service for importing multisigs from the blockchain.
 * Works with any multisig that has been created and used on-chain.
 */

/**
 * Validates that the current user is a member of the multisig being imported.
 *
 * @param userPublicKeys - The public keys of the current user
 * @param multisigMembers - The members of the multisig
 * @returns true if user is a member, false otherwise
 */
export function validateUserIsMember(
	userPublicKeys: PublicKey[],
	multisigMembers: MultisigInfo['members'],
): boolean {
	const userAddresses = userPublicKeys.map((k) =>
		k.toIotaAddress(),
	);

	const memberAddresses = multisigMembers.map(
		(m) => m.address,
	);

	return userAddresses.some((addr) =>
		memberAddresses.includes(addr),
	);
}
