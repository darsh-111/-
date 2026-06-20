const DARK_HEAD = '#f8fafc';

function ZakatModalSection({ icon, color, title, children, font, dk }) {
    return (
        <div className="mb-2.5">
            <div className="flex items-center mb-1" style={{gap:'1.2rem'}}>
                <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center shrink-0" style={{
                    backgroundColor: `${color}1f`,
                }}>
                    <i className={`fa-solid ${icon}`} style={{ fontSize: '0.8rem', color }} />
                </div>
                <p className="font-extrabold text-[0.95rem]" style={{ fontFamily: font, color: dk ? DARK_HEAD : '#1a1a1a' }}>
                    {title}
                </p>
            </div>
            {children}
        </div>
    );
}

export default ZakatModalSection;
