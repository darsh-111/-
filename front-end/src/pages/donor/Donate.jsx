import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { donationTypes, paymentMethods } from '../../data/mockData';
import useDonateFlow from '../../hooks/useDonateFlow';
import DonateStepIndicator from './DonateStepIndicator';
import DonateAmountStep from './DonateAmountStep';
import DonateInfoStep from './DonateInfoStep';
import DonatePaymentStep from './DonatePaymentStep';
import DonateOrderSummary from './DonateOrderSummary';

function Donate() {
    const { isDark } = useTheme();
    const [searchParams] = useSearchParams();
    const preSelectedAmount = parseInt(searchParams.get('amount')) || null;
    const preSelectedProject = parseInt(searchParams.get('project')) || null;

    const {
        step, formData, errors, selectedProject, projects,
        updateForm, nextStep, prevStep, handleSubmit,
        getTotalAmount, getDonationTypeLabel,
        amounts, steps,
    } = useDonateFlow({ preSelectedAmount, preSelectedProject });

    return (
        <div className="py-8">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-8">
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card p-4 md:p-8">
                            <DonateStepIndicator steps={steps} step={step} />

                            {step === 0 && (
                                <DonateAmountStep
                                    formData={formData}
                                    updateForm={updateForm}
                                    amounts={amounts}
                                    donationTypes={donationTypes}
                                    projects={projects}
                                    errors={errors}
                                    getDonationTypeLabel={getDonationTypeLabel}
                                    onNext={nextStep}
                                />
                            )}

                            {step === 1 && (
                                <DonateInfoStep
                                    formData={formData}
                                    updateForm={updateForm}
                                    errors={errors}
                                    onNext={nextStep}
                                    onBack={prevStep}
                                />
                            )}

                            {step === 2 && (
                                <DonatePaymentStep
                                    formData={formData}
                                    updateForm={updateForm}
                                    paymentMethods={paymentMethods}
                                    onSubmit={handleSubmit}
                                    onBack={prevStep}
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <DonateOrderSummary
                            formData={formData}
                            selectedProject={selectedProject}
                            getTotalAmount={getTotalAmount}
                            getDonationTypeLabel={getDonationTypeLabel}
                            donationTypes={donationTypes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donate;
