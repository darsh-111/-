import { useState, useEffect } from 'react';

const num = (v) => parseFloat(v) || 0;

function useZakatCalculation({ prices, nisab }) {
    const [cash, setCash] = useState('');
    const [goldEntries, setGoldEntries] = useState([{ id: 1, grams: '', karat: '24' }]);
    const [silverGrams, setSilverGrams] = useState('');
    const [cropWeight, setCropWeight] = useState('');
    const [irrigationMode, setIrrigationMode] = useState('natural');
    const [expandedSections, setExpandedSections] = useState({ cash: true, gold: true, crops: true });
    const [zakatDue, setZakatDue] = useState({ cash: 0, gold: 0, silver: 0, totalCurrency: 0, zakatableWealth: 0, cropsWeightDue: 0 });

    const toggleSection = (key) =>
        setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

    const addGoldEntry = () =>
        setGoldEntries(prev => [...prev, { id: Date.now(), grams: '', karat: '24' }]);
    const removeGoldEntry = (id) => {
        if (goldEntries.length > 1)
            setGoldEntries(prev => prev.filter(e => e.id !== id));
    };
    const updateGoldEntry = (id, field, value) =>
        setGoldEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));

    useEffect(() => {
        if (!prices) return;
        const timer = setTimeout(() => {
            const cashVal = num(cash);
            const silverVal = num(silverGrams);
            const cropVal = num(cropWeight);

            let totalGoldValue = 0;
            goldEntries.forEach(e => {
                totalGoldValue += num(e.grams) * (prices[`gold${e.karat}k`] || 0);
            });

            const silverValue = silverVal * prices.silver;
            const totalWealth = cashVal + totalGoldValue + silverValue;

            let cZ = 0, gZ = 0, sZ = 0;
            if (totalWealth >= nisab) {
                cZ = cashVal * 0.025;
                gZ = totalGoldValue * 0.025;
                sZ = silverValue * 0.025;
            }

            const cropRates = { natural: 0.10, irrigated: 0.05, mixed: 0.075 };
            const cropsZW = cropVal * (cropRates[irrigationMode] || 0.10);

            setZakatDue({
                cash: cZ, gold: gZ, silver: sZ,
                cropsWeightDue: cropsZW,
                totalCurrency: cZ + gZ + sZ,
                zakatableWealth: totalWealth,
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [cash, goldEntries, silverGrams, cropWeight, irrigationMode, prices, nisab]);

    return {
        cash, setCash,
        goldEntries, addGoldEntry, removeGoldEntry, updateGoldEntry,
        silverGrams, setSilverGrams,
        cropWeight, setCropWeight,
        irrigationMode, setIrrigationMode,
        expandedSections, toggleSection,
        zakatDue,
    };
}

export default useZakatCalculation;
