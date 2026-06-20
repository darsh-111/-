import { Link, useSearchParams } from 'react-router-dom';
import { t, formatCurrency } from '../../i18n';

/**
 * Confirmation Page - Thank you / Receipt
 */
function Confirmation() {
    const [searchParams] = useSearchParams();
    const receiptNumber = searchParams.get('receipt') || Date.now();

    // Mock data - in real app this would come from API
    const donation = {
        amount: 500,
        type: 'صدقة',
        project: 'كسوة الشتاء للأسر المحتاجة',
        date: new Date().toLocaleDateString('ar-EG'),
        receiptNumber: `NRR-${receiptNumber}`,
    };

    return (
        <div className="py-10 min-h-[80vh] flex items-center">
            <div className="max-w-[768px] mx-auto px-4 md:px-6">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl text-center p-2 md:p-5 overflow-hidden border border-neutral-100 dark:border-neutral-700">
                    <div className="p-2 md:p-5">
                        {/* Success Icon */}
                        <div className="mb-3">
                            <i className="fa-solid fa-circle-check" style={{ fontSize: '5rem', color: 'var(--color-success-500)' }}></i>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                            {t('confirmation.title')}
                        </h3>
                        <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-2">
                            {t('confirmation.thankYou')}
                        </p>
                        <p className="text-base mb-5 max-w-[600px] mx-auto text-neutral-700 dark:text-neutral-300">
                            {t('confirmation.impactMessage')}
                        </p>

                        {/* Receipt Details */}
                        <div className="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-lg mb-5 max-w-[600px] mx-auto">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <span className="text-neutral-500 dark:text-neutral-400">{t('confirmation.receiptNumber')}</span>
                                    <span className="font-medium">{donation.receiptNumber}</span>
                                </div>
                                <hr className="border-t border-neutral-200 dark:border-neutral-700" />
                                <div className="flex justify-between">
                                    <span className="text-neutral-500 dark:text-neutral-400">المبلغ</span>
                                    <span className="text-lg text-primary-500 font-bold">{formatCurrency(donation.amount)}</span>
                                </div>
                                <hr className="border-t border-neutral-200 dark:border-neutral-700" />
                                <div className="flex justify-between">
                                    <span className="text-neutral-500 dark:text-neutral-400">نوع التبرع</span>
                                    <span className="font-medium">{donation.type}</span>
                                </div>
                                <hr className="border-t border-neutral-200 dark:border-neutral-700" />
                                <div className="flex justify-between">
                                    <span className="text-neutral-500 dark:text-neutral-400">المشروع</span>
                                    <span className="font-medium">{donation.project}</span>
                                </div>
                                <hr className="border-t border-neutral-200 dark:border-neutral-700" />
                                <div className="flex justify-between">
                                    <span className="text-neutral-500 dark:text-neutral-400">التاريخ</span>
                                    <span className="font-medium">{donation.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-4">
                            <button
                                onClick={() => window.print()}
                                className="border border-primary-500 text-primary-500 px-5 py-2 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center justify-center gap-2 min-w-[200px]"
                            >
                                <i className="fa-solid fa-download"></i>
                                {t('confirmation.downloadReceipt')}
                            </button>
                        </div>

                        <div className="flex flex-row gap-1 justify-center mb-5">
                            <button className="p-2 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors bg-primary-500/10 text-primary-500">
                                <i className="fa-brands fa-whatsapp"></i>
                            </button>
                            <button className="p-2 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors bg-primary-500/10 text-primary-500">
                                <i className="fa-brands fa-facebook-f"></i>
                            </button>
                            <button className="p-2 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors bg-primary-500/10 text-primary-500">
                                <i className="fa-brands fa-x-twitter"></i>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col-reverse sm:flex-row gap-2 justify-center">
                            <Link
                                to="/"
                                className="text-neutral-600 dark:text-neutral-400 px-3 py-1.5 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700/50 rounded-md transition-colors text-center"
                            >
                                {t('confirmation.backToHome')}
                            </Link>
                            <Link
                                to="/donate"
                                className="bg-primary-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-600 transition-colors text-center min-w-[200px]"
                            >
                                {t('confirmation.donateAgain')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
