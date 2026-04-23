// Copyright (c) 2026 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useImportMultisig } from '../hooks/useImportMultisig';
import { CustomWalletButton } from './CustomWalletButton';
import { Button } from './ui/button';
import { Input } from './ui/input';

const importMultisigSchema = z.object({
	address: z
		.string()
		.min(1, 'Multisig address is required')
		.regex(
			/^0x[a-fA-F0-9]{64}$/,
			'Invalid IOTA address format',
		),
	name: z
		.string()
		.max(255, 'Name must be 255 characters or less')
		.optional(),
});

type ImportMultisigForm = z.infer<
	typeof importMultisigSchema
>;

export function ImportMultisigPage() {
	const importMultisig = useImportMultisig();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ImportMultisigForm>({
		resolver: zodResolver(importMultisigSchema),
	});

	const onSubmit = (data: ImportMultisigForm) => {
		importMultisig.mutate(data);
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Main Grid Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
				{/* Left Side - Info Section */}
				<div className="bg-slate-50 p-6 lg:p-8 lg:col-span-4 overflow-y-auto">
					<div className="max-w-md mx-auto lg:max-w-none">
						<Link
							to="/"
							className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6"
						>
							<ArrowLeft className="w-4 h-4 mr-1" />
							Back to Dashboard
						</Link>

						<div className="mb-6 mt-6">
							<h1 className="text-3xl font-bold text-slate-900 mb-4">
								Import Existing Multisig
							</h1>
						</div>

						<div className="space-y-4 text-sm text-slate-600 mt-8">
							<div className="bg-white rounded-lg p-4 border border-slate-200">
								<h3 className="font-semibold text-slate-900 mb-2">
									Requirements
								</h3>
								<ul className="list-disc list-inside space-y-1">
									<li>
										You must be a member of the multisig
									</li>
									<li>
										The multisig must have at least one
										transaction
									</li>
									<li>You'll need the multisig address</li>
								</ul>
							</div>

							<div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
								<h3 className="font-semibold text-blue-900 mb-2">
									Auto-Authentication
								</h3>
								<p className="text-blue-700">
									All members of the imported multisig will
									be automatically authenticated since the
									multisig has already been used on-chain.
									No additional acceptance is required.
								</p>
							</div>
						</div>

						<div className="mt-8">
							<CustomWalletButton
								variant="sidebar"
								disableAccountSwitching
							/>
						</div>
					</div>
				</div>

				{/* Right Side - Form */}
				<div className="p-6 lg:p-8 lg:col-span-8 overflow-y-auto">
					<div className="max-w-lg mx-auto lg:max-w-none">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6"
						>
							{/* Multisig Address Input */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Multisig Address
								</label>
								<Input
									{...register('address')}
									placeholder="0x..."
									className="font-mono text-sm"
								/>
								{errors.address && (
									<p className="text-sm text-red-500 mt-1">
										{errors.address.message}
									</p>
								)}
								<p className="text-xs text-gray-500 mt-2">
									The address of the multisig wallet you
									want to import
								</p>
							</div>

							{/* Name Input */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Multisig Name (Optional)
								</label>
								<Input
									{...register('name')}
									placeholder="e.g., Team Treasury"
									maxLength={255}
								/>
								{errors.name && (
									<p className="text-sm text-red-500 mt-1">
										{errors.name.message}
									</p>
								)}
								<p className="text-xs text-gray-500 mt-2">
									Give this multisig a friendly name for
									easy identification
								</p>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-4 pt-4">
								<Button
									type="button"
									variant="outline"
									className="flex-1"
									disabled={importMultisig.isPending}
									onClick={() => navigate('/')}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="flex-1"
									disabled={importMultisig.isPending}
								>
									{importMultisig.isPending
										? 'Importing...'
										: 'Import Multisig'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
