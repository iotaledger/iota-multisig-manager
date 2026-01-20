// Copyright (c) 2025 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import {
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useApiAuth } from '@/contexts/ApiAuthContext';

import { useNetwork } from '../contexts/NetworkContext';
import { apiClient } from '../lib/api';
import { QueryKeys } from '../lib/queryKeys';

export function useImportMultisig() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { currentAddress } = useApiAuth();
	const { network } = useNetwork();

	return useMutation({
		mutationFn: async (data: {
			address: string;
			name?: string;
		}) => {
			if (!currentAddress)
				throw new Error('No wallet connected');
			if (!network) throw new Error('No network selected');

			return apiClient.importMultisig({
				...data,
				network,
			});
		},
		onSuccess: (response) => {
			// Invalidate queries
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Multisigs],
			});

			toast.success('Multisig imported successfully!');

			// Navigate to the imported multisig page
			navigate(`/multisig/${response.multisig.address}`);
		},
		onError: (error: Error) => {
			toast.error(
				`Failed to import multisig: ${error.message}`,
			);
		},
	});
}
