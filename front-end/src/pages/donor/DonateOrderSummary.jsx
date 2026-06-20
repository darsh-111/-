import { t, formatCurrency } from '../../i18n';

function DonateOrderSummary({ formData, selectedProject, getTotalAmount, getDonationTypeLabel, donationTypes }) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-200 dark:border-neutral-700 sticky top-10">
            <div className="p-4">
                <h6 className="font-bold mb-3">{t('donate.orderSummary')}</h6>
                <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-3" />

                {selectedProject && (
                    <div className="flex gap-3 mb-4">
                        <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-15 h-15 rounded object-cover"
                            style={{ width: 60, height: 60 }}
                        />
                        <div>
                            <p className="text-sm font-medium leading-tight">{selectedProject.title}</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3 mb-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">{t('donate.subtotal')}</span>
                        <span className="text-sm font-medium">{formatCurrency(getTotalAmount())}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">نوع التبرع</span>
                        <span className="text-sm font-medium">
                            {getDonationTypeLabel(donationTypes.find(d => d.id === formData.donationType))}
                        </span>
                    </div>
                    {formData.isRecurring && (
                        <div className="flex justify-between">
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">التكرار</span>
                            <span className="text-sm font-medium">شهري</span>
                        </div>
                    )}
                </div>

                <hr className="border-t border-neutral-200 dark:border-neutral-700 my-3" />

                <div className="flex justify-between items-center">
                    <h6 className="font-bold">{t('donate.total')}</h6>
                    <h5 className="text-lg font-bold text-primary-500">{formatCurrency(getTotalAmount())}</h5>
                </div>
            </div>
        </div>
    );
}

export default DonateOrderSummary;
