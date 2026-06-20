import { useRef } from 'react';
import { t } from '../../i18n';

export default function ProfileTab({ isDark, donorInfo, updateDonorPhoto }) {
    const profilePhotoRef = useRef(null);

    const handleProfilePhoto = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await updateDonorPhoto(file);
    };

    return (
        <div className="flex flex-col gap-6 max-w-md">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-100 dark:border-neutral-700 overflow-hidden">
                <div className="p-4 flex flex-col items-center py-8">
                    <div className="relative mb-4">
                        <div
                            className="w-28 h-28 rounded-full bg-primary-500 text-white flex items-center justify-center overflow-hidden cursor-pointer"
                            onClick={() => profilePhotoRef.current?.click()}
                        >
                            {donorInfo?.photo ? (
                                <img src={donorInfo.photo} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <i className="fa-solid fa-user text-4xl"></i>
                            )}
                        </div>
                        <button
                            className="absolute bottom-0 right-0 p-2 rounded-md bg-white dark:bg-neutral-700 shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors"
                            onClick={() => profilePhotoRef.current?.click()}
                        >
                            <i className="fa-solid fa-camera"></i>
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => profilePhotoRef.current?.click()} className="border border-primary-500 text-primary-500 px-4 py-1.5 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-sm">
                            {t('account.changePhoto')}
                        </button>
                        {donorInfo?.photo && (
                            <button onClick={() => updateDonorPhoto(null)} className="border border-error-500 text-error-500 px-4 py-1.5 rounded-md font-semibold hover:bg-error-50 dark:hover:bg-error-500/10 transition-colors text-sm">
                                {t('account.removePhoto')}
                            </button>
                        )}
                    </div>
                    <input
                        ref={profilePhotoRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePhoto}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-neutral-100 dark:border-neutral-700 overflow-hidden">
                <div className="p-4">
                    <h6 className="text-base font-bold mb-3 dark:text-white">{'معلومات الحساب'}</h6>
                    <form className="flex flex-col gap-4 mt-4">
                        <input
                            label={'الاسم الكامل'}
                            defaultValue={donorInfo.name}
                            className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
                            placeholder="الاسم الكامل"
                        />
                        <input
                            label={'البريد الإلكتروني'}
                            type="email"
                            defaultValue={donorInfo.email}
                            className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
                            placeholder="البريد الإلكتروني"
                        />
                        <input
                            label={'رقم الهاتف'}
                            type="tel"
                            defaultValue={donorInfo.phone}
                            className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
                            placeholder="رقم الهاتف"
                        />
                        <button type="submit" className="self-start bg-primary-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-primary-600 transition-colors">
                            {'حفظ التغييرات'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card border border-error-500 overflow-hidden">
                <div className="p-4">
                    <h6 className="text-base font-bold mb-3 text-error-500">{'إعدادات الحساب'}</h6>
                    <div className="flex flex-col gap-4 mt-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium dark:text-white">{'تغيير كلمة المرور'}</p>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{'قم بتحديث كلمة المرور الخاصة بك'}</p>
                            </div>
                            <button className="border border-primary-500 text-primary-500 px-4 py-1.5 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-sm">{'تغيير'}</button>
                        </div>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700" />
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium dark:text-white">{'إشعارات البريد'}</p>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{'إدارة تفضيلات الإشعارات'}</p>
                            </div>
                            <button className="border border-primary-500 text-primary-500 px-4 py-1.5 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors text-sm">{'إدارة'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
