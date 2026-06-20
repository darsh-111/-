import { t } from '../../i18n';

function DonatePaymentStep({ formData, updateForm, paymentMethods, onSubmit, onBack }) {
    return (
        <div className="flex flex-col gap-6">
            <h6 className="font-bold">{t('donate.paymentMethod')}</h6>

            <div className="grid grid-cols-12 gap-2">
                {paymentMethods.map(method => (
                    <div className="col-span-12 sm:col-span-4" key={method.id}>
                        <button
                            className={`w-full flex flex-col items-center py-4 px-3 gap-2 border rounded-lg font-medium transition-colors ${
                                formData.paymentMethod === method.id
                                    ? 'bg-primary-500/5 border-primary-500 text-primary-500'
                                    : 'border-neutral-200 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                            }`}
                            onClick={() => updateForm('paymentMethod', method.id)}
                        >
                            <i className={method.icon} style={{ fontSize: '1.5rem' }}></i>
                            {method.title || method.label || method.name}
                        </button>
                    </div>
                ))}
            </div>

            {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-12">
                            <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="col-span-6">
                            <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="MM/YY" />
                        </div>
                        <div className="col-span-6">
                            <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="123" />
                        </div>
                        <div className="col-span-12">
                            <input placeholder={t('donate.cardName') || 'الاسم على البطاقة'} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2 text-success-500">
                <i className="fa-solid fa-shield-halved"></i>
                <p className="text-sm">{t('donate.securePayment')}</p>
            </div>

            <div className="flex gap-2">
                <button className="px-5 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20" onClick={onBack}>{t('common.back')}</button>
                <button className="px-5 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer bg-primary-500 text-white hover:bg-primary-600 text-lg" onClick={onSubmit}>{t('donate.payNow')}</button>
            </div>
        </div>
    );
}

export default DonatePaymentStep;
