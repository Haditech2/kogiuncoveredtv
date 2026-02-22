import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  /** Your AdSense ad slot ID (e.g. '1234567890'). Set via VITE_ADSENSE_SLOT or leave empty until approved. */
  adSlot?: string;
  /** Your AdSense client ID (e.g. 'ca-pub-xxxxxxxxxxxxxxxx'). Set via VITE_ADSENSE_CLIENT. */
  adClient?: string;
  /** Ad format: 'auto' | 'rectangle' | 'horizontal' | 'vertical' */
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  /** Optional custom class for the container */
  className?: string;
}

/**
 * Google AdSense ad slot component.
 * Add VITE_ADSENSE_CLIENT and VITE_ADSENSE_SLOT to .env when you have your AdSense approval.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  adSlot,
  adClient = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined,
  adFormat = 'auto',
  className = '',
}) => {
  const slot = adSlot || (import.meta.env.VITE_ADSENSE_SLOT as string | undefined);
  const client = adClient;

  useEffect(() => {
    if (!client || !slot) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // AdSense script may not be loaded
    }
  }, [client, slot]);

  if (!client || !slot) {
    return (
      <div className={`min-h-[90px] flex items-center justify-center bg-muted/30 rounded-lg text-muted-foreground text-sm ${className}`}>
        {/* Placeholder until AdSense is configured */}
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
