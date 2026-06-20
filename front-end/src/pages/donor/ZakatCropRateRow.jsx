const DARK_HEAD = '#f8fafc';
const LATIN_FONT = "'Inter', 'Manrope', sans-serif";

function ZakatCropRateRow({ icon, color, rate, label, desc, font, dk }) {
    return (
        <div className="rounded-[10px] flex items-center gap-1.5" style={{
            padding: '1.2rem',
            backgroundColor: dk ? 'rgba(255,255,255,0.02)' : '#fafbfc',
            border: `1px solid ${dk ? 'rgba(255,255,255,0.04)' : '#f0f4f8'}`,
        }}>
            <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}1a` }}>
                <i className={`fa-solid ${icon}`} style={{ fontSize: '0.75rem', color }} />
            </div>
            <div className="flex-1">
                <p className="text-[0.78rem] font-bold" style={{ fontFamily: font, color: dk ? DARK_HEAD : '#333' }}>
                    {label}
                </p>
                <p className="text-[0.65rem]" style={{ fontFamily: font, color: dk ? 'rgba(226,232,240,0.5)' : '#999' }}>
                    {desc}
                </p>
            </div>
            <p className="font-black text-[0.95rem] shrink-0" style={{ fontFamily: LATIN_FONT, color }}>
                {rate}
            </p>
        </div>
    );
}

export default ZakatCropRateRow;
