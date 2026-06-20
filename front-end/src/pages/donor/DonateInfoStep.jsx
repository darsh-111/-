import { t } from '../../i18n';

function DonateInfoStep({ formData, updateForm, errors, onNext, onBack }) {
    return (
        <div className="flex flex-col gap-6">
            <h6 className="font-bold">{t('donate.yourInfo')}</h6>

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) => updateForm('isAnonymous', e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm">{t('donate.anonymous')}</span>
            </label>

            {!formData.isAnonymous && (
                <div className="flex flex-col gap-4">
                    <div>
                        <input
                            placeholder={t('donate.fullName')}
                            value={formData.fullName}
                            onChange={(e) => updateForm('fullName', e.target.value)}
                            required
                            className={`w-full px-3 py-2.5 border rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${errors.fullName ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'}`}
                        />
                        {errors.fullName && <p className="text-error-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>
                    <input
                        placeholder={t('donate.email')}
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                    <div>
                        <input
                            placeholder={t('donate.phone')}
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateForm('phone', e.target.value)}
                            required
                            className={`w-full px-3 py-2.5 border rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${errors.phone ? 'border-error-500' : 'border-neutral-300 dark:border-neutral-600'}`}
                        />
                        {errors.phone && <p className="text-error-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                </div>
            )}

            <div className="flex gap-2">
                <button className="px-5 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20" onClick={onBack}>{t('common.back')}</button>
                <button className="px-5 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer bg-primary-500 text-white hover:bg-primary-600" onClick={onNext}>{t('common.next')}</button>
            </div>
        </div>
    );
}

export default DonateInfoStep;
