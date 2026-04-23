// Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { bcs } from '@iota/iota-sdk/bcs';
import { parseSerializedSignature } from '@iota/iota-sdk/cryptography';
import { MultiSigPublicKey } from '@iota/iota-sdk/multisig';
import { fromBase64 } from '@iota/iota-sdk/utils';

import { NotFoundError, ValidationError } from '../errors';
import {
	getIotaClient,
	type IotaNetwork,
} from '../utils/client';

export interface MultisigMemberInfo {
	publicKey: string; // IOTA public key format (with flag)
	address: string; // IOTA address
	weight: number;
}

export interface MultisigInfo {
	address: string;
	members: MultisigMemberInfo[];
	threshold: number;
	multisigPublicKey: string;
}

/**
 * Queries the blockchain and extracts multisig information from an address.
 * Uses the recovery pattern - queries for transactions from the address,
 * then extracts the multisig structure from the signature.
 *
 * @param address - The multisig address to query
 * @param network - The network to query (testnet, mainnet, etc.)
 * @returns MultisigInfo containing all members, weights, and threshold
 * @throws NotFoundError if no transactions found for the address
 * @throws ValidationError if the address is not a multisig
 */
export async function extractMultisigFromBlockchain(
	address: string,
	network: IotaNetwork,
): Promise<MultisigInfo> {
	const client = getIotaClient(network);

	// 1. Query for transactions from this address
	const resp = await client.queryTransactionBlocks({
		filter: {
			FromAddress: address,
		},
		limit: 1,
		options: { showRawInput: true },
	});

	if (
		resp.data.length === 0 ||
		!resp.data[0].rawTransaction
	) {
		throw new NotFoundError(
			'No usable transactions found for this address. The multisig must have at least one executed transaction to be imported.',
		);
	}

	const signedData = bcs.SenderSignedData.parse(
		fromBase64(resp.data[0].rawTransaction),
	);

	const signature = signedData[0].txSignatures[0];
	const parsed = parseSerializedSignature(signature);

	// 3. Verify it's a multisig
	if (parsed.signatureScheme !== 'MultiSig') {
		throw new ValidationError(
			'This address is not a multisig',
		);
	}

	// 4. Extract multisig structure
	const multisig = new MultiSigPublicKey(
		parsed.multisig.multisig_pk,
	);

	const members = multisig.getPublicKeys().map((pk) => ({
		publicKey: pk.publicKey.toIotaPublicKey(),
		address: pk.publicKey.toIotaAddress(),
		weight: pk.weight,
	}));

	return {
		address: multisig.toIotaAddress(),
		members,
		threshold: multisig.getThreshold(),
		multisigPublicKey: multisig.toIotaPublicKey(),
	};
}
