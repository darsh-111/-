function ZakatFormulaBox({ dk, formula, font }) {
    return (
        <div className="mt-1.5 rounded-[10px] text-center" style={{
            padding: '1.2rem',
            backgroundColor: dk ? 'rgba(255,255,255,0.03)' : '#f8f9fb',
            border: `1px dashed ${dk ? 'rgba(255,255,255,0.08)' : '#e0e3e8'}`,
        }}>
            <p className="text-[0.8rem] font-bold tracking-wide" style={{ fontFamily: font, color: dk ? 'rgba(226,232,240,0.8)' : '#555' }}>
                {formula}
            </p>
        </div>
    );
}

export default ZakatFormulaBox;
