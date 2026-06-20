const LATIN_FONT = "'Inter', 'Manrope', sans-serif";

function ZakatPriceBadges({ prices, formatCurrency, loc, font, source }) {
    if (!prices) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 mt-2.5" style={{ animation: 'fadeInUp 0.5s ease 0.25s both' }}>
            {[
                { label: loc('ذهب 24', '24K'), value: prices.gold24k, color: '#f59e0b' },
                { label: loc('ذهب 21', '21K'), value: prices.gold21k, color: '#f59e0b' },
                { label: loc('ذهب 18', '18K'), value: prices.gold18k, color: '#f59e0b' },
                { label: loc('فضة', 'Silver'), value: prices.silver, color: '#94a3b8' },
            ].map((item, i) => (
                <div key={i} className="inline-flex items-center px-1.5 py-0.5 rounded-xl backdrop-blur" style={{
                    gap: '0.8rem',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                }}>
                    <span className="text-[0.68rem] font-semibold" style={{ fontFamily: font, color: 'rgba(255,255,255,0.6)' }}>
                        {item.label}
                    </span>
                    <span className="text-[0.75rem] font-extrabold" style={{ fontFamily: LATIN_FONT, color: item.color }}>
                        {formatCurrency(item.value)}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default ZakatPriceBadges;
