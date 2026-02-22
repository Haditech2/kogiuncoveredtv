import React, { useEffect } from 'react';

interface AdSlotProps {
	adSlot?: string;
	adClient?: string;
	adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
	className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({
	adSlot,
	adClient = (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined) || 'ca-pub-4211041071990839',
	adFormat = 'auto',
	className = '',
}) => {
	const slot = adSlot || (import.meta.env.VITE_ADSENSE_SLOT as string | undefined);
	const client = adClient;

	useEffect(() => {
		if (!client || !slot) return;
		try {
			const adsWindow = window as unknown as { adsbygoogle?: unknown[] };
			(adsWindow.adsbygoogle = adsWindow.adsbygoogle || []).push({});
		} catch {
			// AdSense script may not be ready
		}
	}, [client, slot]);

	if (!client || !slot) {
		return (
			<div className={`flex min-h-[90px] items-center justify-center rounded-lg border border-border/70 bg-muted/30 text-sm text-muted-foreground ${className}`}>
				<span>Ad space</span>
			</div>
		);
	}

	return (
		<div className={`adsense-slot ${className}`}>
			<ins
				className="adsbygoogle"
				data-ad-client={client}
				data-ad-slot={slot}
				data-ad-format={adFormat}
				data-full-width-responsive={adFormat === 'auto' ? 'true' : undefined}
				style={{ display: 'block' }}
			/>
		</div>
	);
};

export default AdSlot;
