"use client";

import * as React from "react";
// import { AnonAadhaarProvider } from "anon-aadhaar-react";
import {
	RainbowKitProvider,
	getDefaultWallets,
	getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
	argentWallet,
	trustWallet,
	ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
	arbitrum,
	base,
	mainnet,
	optimism,
	polygon,
	polygonMumbai,
	sepolia,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
	appName: "RainbowKit demo",
	projectId: "YOUR_PROJECT_ID",
	wallets: [
		...wallets,
		{
			groupName: "Other",
			wallets: [argentWallet, trustWallet, ledgerWallet],
		},
	],
	chains: [
		mainnet,
		polygon,
		optimism,
		arbitrum,
		base,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
			? [sepolia, polygonMumbai]
			: []),
	],
	ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				{/* <AnonAadhaarProvider _useTestAadhaar={true}> */}
					<RainbowKitProvider>{children}</RainbowKitProvider>
				{/* </AnonAadhaarProvider> */}
			</QueryClientProvider>
		</WagmiProvider>
	);
}
