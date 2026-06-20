import { useState, useEffect } from 'react';
import { useAdminData, adminActions } from '../../contexts/AdminDataContext';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { useToast } from '../../components/common';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`cms-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <div className="py-6">
                    {children}
                </div>
            )}
        </div>
    );
}

const TABS = ['الشريط المتحرك', 'الصفحة الرئيسية', 'الآيات والرسائل', 'الإعلانات', 'من نحن وآراء المتبرعين', 'إحصائيات المنصة', 'المظهر (Theme)', 'إعدادات الزكاة'];

export default function AdminCMS() {
    const { state, dispatch } = useAdminData();
    const toast = useToast();
    const [tab, setTab] = useState(0);

    const [formData, setFormData] = useState(state.content);
    const [themeData, setThemeData] = useState(state.settings);

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleThemeChange = (field, value) => {
        setThemeData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (section, index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev[section]];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [section]: newArray };
        });
    };

    const handleTopLevelChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddArrayItem = (section, defaultItem) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], { id: Date.now(), ...defaultItem }]
        }));
    };

    const handleDeleteArrayItem = (section, id) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const handleSave = () => {
        dispatch(adminActions.updateContent(formData));
        dispatch({ type: 'UPDATE_SETTINGS', payload: themeData });
        toast.success('تم تحديث المحتوى والإعدادات بنجاح');
    };

    return (
        <div>
            <AdminPageHeader
                title="إدارة المحتوى"
                subtitle="التحكم في النصوص والإعلانات المعروضة في واجهة المتبرع"
            />

            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card mb-8">
                <div className="border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto" role="tablist" aria-label="cms tabs">
                        {TABS.map((label, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={tab === i}
                                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    tab === i
                                        ? 'border-primary-500 text-primary-500'
                                        : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                                }`}
                                onClick={() => setTab(i)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 md:p-8">
                    {/* Hero Slider Tab */}
                    <TabPanel value={tab} index={0}>
                        <div className="flex justify-between mb-4">
                            <h6 className="text-base font-bold">الشريط المتحرك (Hero Slider)</h6>
                            <button className="border border-primary-500 text-primary-500 px-5 py-2 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center gap-2" onClick={() => handleAddArrayItem('heroSlides', { title: '', subtitle: '', image: '', ctaText: '', ctaLink: '/donate', ctaIcon: 'fa-solid fa-heart', active: true })}>
                                <i className="fa-solid fa-plus" />
                                إضافة شريحة
                            </button>
                        </div>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6">
                            {(formData.heroSlides || []).length === 0 && (
                                <div className="col-span-12">
                                    <p className="text-neutral-500 dark:text-neutral-400 text-center py-8">
                                        لا توجد شرائح بعد. أضف أول شريحة لعرضها في واجهة البداية.
                                    </p>
                                </div>
                            )}
                            {(formData.heroSlides || []).map((slide, index) => (
                                <div className="col-span-12" key={slide.id}>
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg relative">
                                        <button className="absolute top-2 left-2 p-1.5 rounded-md text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors" onClick={() => handleDeleteArrayItem('heroSlides', slide.id)}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: 14 }} />
                                        </button>
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-12 md:col-span-8">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">العنوان</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={slide.title} onChange={(e) => handleArrayChange('heroSlides', index, 'title', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">رابط الزر (مثال: /donate)</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={slide.ctaLink || '/donate'} onChange={(e) => handleArrayChange('heroSlides', index, 'ctaLink', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">النص الفرعي</label>
                                                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={slide.subtitle} onChange={(e) => handleArrayChange('heroSlides', index, 'subtitle', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">نص الزر (مثال: تبرع الآن)</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={slide.ctaText} onChange={(e) => handleArrayChange('heroSlides', index, 'ctaText', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">أيقونة الزر (مثال: fa-solid fa-heart)</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={slide.ctaIcon || 'fa-solid fa-heart'} onChange={(e) => handleArrayChange('heroSlides', index, 'ctaIcon', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-10">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">رابط صورة الخلفية (اختياري - URL)</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={slide.image || ''} onChange={(e) => handleArrayChange('heroSlides', index, 'image', e.target.value)} placeholder="https://example.com/image.jpg" />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-2 flex items-center">
                                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                                    <span className="relative inline-block w-10 h-5">
                                                        <input type="checkbox" className="sr-only peer" checked={slide.active !== false} onChange={(e) => handleArrayChange('heroSlides', index, 'active', e.target.checked)} />
                                                        <span className="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full peer-checked:bg-primary-500 transition-colors"></span>
                                                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></span>
                                                    </span>
                                                    <span className="text-sm">نشط</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    {/* Homepage Tab */}
                    <TabPanel value={tab} index={1}>
                        <h6 className="text-base font-bold mb-2">واجهة البداية (Hero Banner)</h6>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">العنوان الرئيسي</label>
                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={formData.heroBanner.title} onChange={(e) => handleChange('heroBanner', 'title', e.target.value)} />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">النص الفرعي</label>
                                    <textarea rows={3} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.heroBanner.subtitle} onChange={(e) => handleChange('heroBanner', 'subtitle', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Islamic Content Tab */}
                    <TabPanel value={tab} index={2}>
                        <div className="flex justify-between mb-4">
                            <h6 className="text-base font-bold">المحتوى الإسلامي (آيات وأحاديث)</h6>
                            <button className="border border-primary-500 text-primary-500 px-5 py-2 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center gap-2" onClick={() => handleAddArrayItem('quranicVerses', { text: '', reference: '', active: true, type: 'quran' })}>
                                <i className="fa-solid fa-plus" />
                                إضافة جديد
                            </button>
                        </div>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">طريقة العرض</label>
                                    <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.islamicDisplayMode || 'rotating'} onChange={(e) => handleTopLevelChange('islamicDisplayMode', e.target.value)}>
                                        <option value="rotating">متناوب (تدوير)</option>
                                        <option value="stacked">قائمة متتالية</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">مدة التناوب (ثواني)</label>
                                    <input type="number" className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.islamicRotationInterval || 5} onChange={(e) => handleTopLevelChange('islamicRotationInterval', Number(e.target.value))} disabled={formData.islamicDisplayMode !== 'rotating'} />
                                </div>
                            </div>
                            {formData.quranicVerses?.map((verse, index) => (
                                <div className="col-span-12" key={verse.id}>
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg relative">
                                        <button className="absolute top-2 left-2 p-1.5 rounded-md text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors" onClick={() => handleDeleteArrayItem('quranicVerses', verse.id)}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: 14 }} />
                                        </button>
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-12">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">النص</label>
                                                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={verse.text} onChange={(e) => handleArrayChange('quranicVerses', index, 'text', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">المرجع (مثال: سورة البقرة)</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={verse.reference} onChange={(e) => handleArrayChange('quranicVerses', index, 'reference', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">النوع</label>
                                                    <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={verse.type || 'quran'} onChange={(e) => handleArrayChange('quranicVerses', index, 'type', e.target.value)}>
                                                        <option value="quran">قرآن كريم</option>
                                                        <option value="hadith">حديث شريف</option>
                                                        <option value="quote">مأثورات</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                                    <span className="relative inline-block w-10 h-5">
                                                        <input type="checkbox" className="sr-only peer" checked={verse.active} onChange={(e) => handleArrayChange('quranicVerses', index, 'active', e.target.checked)} />
                                                        <span className="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full peer-checked:bg-primary-500 transition-colors"></span>
                                                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></span>
                                                    </span>
                                                    <span className="text-sm">نشط</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    {/* Announcements Tab */}
                    <TabPanel value={tab} index={3}>
                        <div className="flex justify-between mb-4">
                            <h6 className="text-base font-bold">شريط الإعلانات والحملات</h6>
                            <button className="border border-primary-500 text-primary-500 px-5 py-2 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center gap-2" onClick={() => handleAddArrayItem('announcements', { title: '', text: '', type: 'info', active: true, startDate: '', endDate: '' })}>
                                <i className="fa-solid fa-plus" />
                                إضافة إعلان
                            </button>
                        </div>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6">
                            {formData.announcements?.map((ann, index) => (
                                <div className="col-span-12" key={ann.id}>
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg relative">
                                        <button className="absolute top-2 left-2 p-1.5 rounded-md text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors" onClick={() => handleDeleteArrayItem('announcements', ann.id)}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: 14 }} />
                                        </button>
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-12 md:col-span-8">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">نص الإعلان</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={ann.text} onChange={(e) => handleArrayChange('announcements', index, 'text', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">النوع</label>
                                                    <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={ann.type || 'info'} onChange={(e) => handleArrayChange('announcements', index, 'type', e.target.value)}>
                                                        <option value="urgent">عاجل (أحمر)</option>
                                                        <option value="info">معلومة (أزرق)</option>
                                                        <option value="success">نجاح (أخضر)</option>
                                                        <option value="seasonal">موسمي (ذهبي)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">تاريخ البدء</label>
                                                    <input type="date" className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={ann.startDate || ''} onChange={(e) => handleArrayChange('announcements', index, 'startDate', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">تاريخ الانتهاء</label>
                                                    <input type="date" className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={ann.endDate || ''} onChange={(e) => handleArrayChange('announcements', index, 'endDate', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4 flex items-center">
                                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                                    <span className="relative inline-block w-10 h-5">
                                                        <input type="checkbox" className="sr-only peer" checked={ann.active} onChange={(e) => handleArrayChange('announcements', index, 'active', e.target.checked)} />
                                                        <span className="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full peer-checked:bg-primary-500 transition-colors"></span>
                                                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></span>
                                                    </span>
                                                    <span className="text-sm">مفعّل</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    {/* About Us & Testimonials Tab */}
                    <TabPanel value={tab} index={4}>
                        <h6 className="text-base font-bold mb-2">من نحن</h6>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6 mb-8">
                            <div className="col-span-12">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">قصتنا</label>
                                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.aboutUs?.story || ''} onChange={(e) => handleChange('aboutUs', 'story', e.target.value)} />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">رؤيتنا</label>
                                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.aboutUs?.vision || ''} onChange={(e) => handleChange('aboutUs', 'vision', e.target.value)} />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">رسالتنا</label>
                                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.aboutUs?.mission || ''} onChange={(e) => handleChange('aboutUs', 'mission', e.target.value)} />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">قيمنا</label>
                                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={formData.aboutUs?.values || ''} onChange={(e) => handleChange('aboutUs', 'values', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mb-4">
                            <h6 className="text-base font-bold">آراء المتبرعين والمستفيدين</h6>
                            <button className="border border-primary-500 text-primary-500 px-5 py-2 rounded-md font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center gap-2" onClick={() => handleAddArrayItem('testimonials', { name: '', role: '', content: '', avatar: '' })}>
                                <i className="fa-solid fa-plus" />
                                إضافة رأي
                            </button>
                        </div>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6">
                            {formData.testimonials?.map((test, index) => (
                                <div className="col-span-12 md:col-span-6" key={test.id}>
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg relative">
                                        <button className="absolute top-2 left-2 p-1.5 rounded-md text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors" onClick={() => handleDeleteArrayItem('testimonials', test.id)}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: 14 }} />
                                        </button>
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-12">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">الاسم</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={test.name} onChange={(e) => handleArrayChange('testimonials', index, 'name', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">الصفة (مثال: متبرع دائم)</label>
                                                    <input className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" value={test.role} onChange={(e) => handleArrayChange('testimonials', index, 'role', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">النص</label>
                                                    <textarea rows={2} className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={test.content} onChange={(e) => handleArrayChange('testimonials', index, 'content', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    {/* Stats Override Tab */}
                    <TabPanel value={tab} index={5}>
                        <div className="flex justify-between mb-4">
                            <h6 className="text-base font-bold">إحصائيات المنصة (الرئيسية)</h6>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <span className="relative inline-block w-10 h-5">
                                    <input type="checkbox" className="sr-only peer" checked={formData.statsConfig?.override || false} onChange={(e) => handleChange('statsConfig', 'override', e.target.checked)} />
                                    <span className="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full peer-checked:bg-primary-500 transition-colors"></span>
                                    <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></span>
                                </span>
                                <span className="text-sm">استخدام أرقام يدوية (بدل الحساب التلقائي)</span>
                            </label>
                        </div>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">إجمالي التبرعات المكتوبة</label>
                                    <input type="number" className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.statsConfig?.totalDonations || 0} onChange={(e) => handleChange('statsConfig', 'totalDonations', Number(e.target.value))} disabled={!formData.statsConfig?.override} />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">عدد المستفيدين المكتوب</label>
                                    <input type="number" className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.statsConfig?.beneficiaries || 0} onChange={(e) => handleChange('statsConfig', 'beneficiaries', Number(e.target.value))} disabled={!formData.statsConfig?.override} />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">عدد المشاريع المكتوب</label>
                                    <input type="number" className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.statsConfig?.projects || 0} onChange={(e) => handleChange('statsConfig', 'projects', Number(e.target.value))} disabled={!formData.statsConfig?.override} />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">سنوات العطاء</label>
                                    <input type="number" className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.statsConfig?.years || 0} onChange={(e) => handleChange('statsConfig', 'years', Number(e.target.value))} disabled={!formData.statsConfig?.override} />
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Theme Settings Tab */}
                    <TabPanel value={tab} index={6}>
                        <h6 className="text-base font-bold mb-2">المظهر العام والألوان</h6>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">اللون الرئيسي (Primary Color)</label>
                                    <input type="color" value={themeData.primaryColor || '#00b16a'} onChange={(e) => handleThemeChange('primaryColor', e.target.value)} className="w-full h-10 px-1 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent cursor-pointer" />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">اللون الثانوي (Secondary Color)</label>
                                    <input type="color" value={themeData.secondaryColor || '#f39c12'} onChange={(e) => handleThemeChange('secondaryColor', e.target.value)} className="w-full h-10 px-1 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent cursor-pointer" />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">حجم الخط</label>
                                    <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={themeData.fontSize || 'normal'} onChange={(e) => handleThemeChange('fontSize', e.target.value)}>
                                        <option value="small">صغير</option>
                                        <option value="normal">متوسط (افتراضي)</option>
                                        <option value="large">كبير</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">انحناء الحواف (Border Radius)</label>
                                    <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={themeData.borderRadius || 'medium'} onChange={(e) => handleThemeChange('borderRadius', e.target.value)}>
                                        <option value="none">بدون انحناء</option>
                                        <option value="small">صغير</option>
                                        <option value="medium">متوسط</option>
                                        <option value="large">دائري</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">شكل واجهة البداية (Hero Style)</label>
                                    <select className="w-full px-3 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 outline-none" value={themeData.heroStyle || 'gradient'} onChange={(e) => handleThemeChange('heroStyle', e.target.value)}>
                                        <option value="gradient">تدرج لوني</option>
                                        <option value="image">صورة خلفية كاملة</option>
                                        <option value="split">مقسم (نص وصورة)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Zakat Tab */}
                    <TabPanel value={tab} index={7}>
                        <h6 className="text-base font-bold mb-2">إعدادات حساب الزكاة</h6>
                        <hr className="border-t border-neutral-200 dark:border-neutral-700 mb-6" />
                        <div className="mb-8">
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <span className="relative inline-block w-10 h-5">
                                    <input type="checkbox" className="sr-only peer" checked={formData.zakatConfig.useLiveApi !== false} onChange={(e) => handleChange('zakatConfig', 'useLiveApi', e.target.checked)} />
                                    <span className="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full peer-checked:bg-primary-500 transition-colors"></span>
                                    <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform"></span>
                                </span>
                                <span className="text-sm">تحديث أسعار الذهب والفضة تلقائياً بالربط مع أسعار السوق العالمية (Live API)</span>
                            </label>
                            <span className="block text-xs text-neutral-500 dark:text-neutral-400 mt-1 mr-8">
                                عند التفعيل، سيقوم النظام تلقائياً بجلب الأسعار اللحظية من الإنترنت. ستُستخدم الأسعار اليدوية بالأسفل كاحتياطي فقط في حال تعذر الاتصال بالخدمة.
                            </span>
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {formData.zakatConfig.useLiveApi !== false ? "سعر جرام الذهب الاحتياطي (عيار 24)" : "سعر جرام الذهب المعتمد (عيار 24)"}
                                    </label>
                                    <div className="relative">
                                        <input type="number" value={formData.zakatConfig.goldPrice} onChange={(e) => handleChange('zakatConfig', 'goldPrice', Number(e.target.value))} className="w-full px-3 py-2.5 pl-12 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-neutral-500 dark:text-neutral-400 pointer-events-none">ج.م</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{formData.zakatConfig.useLiveApi !== false ? "يُستخدم كاحتياطي في حال فشل جلب السعر الحي" : "السعر الثابت المستخدم في الحساب"}</p>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {formData.zakatConfig.useLiveApi !== false ? "سعر جرام الفضة الاحتياطي" : "سعر جرام الفضة المعتمد"}
                                    </label>
                                    <div className="relative">
                                        <input type="number" value={formData.zakatConfig.silverPrice} onChange={(e) => handleChange('zakatConfig', 'silverPrice', Number(e.target.value))} className="w-full px-3 py-2.5 pl-12 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-neutral-500 dark:text-neutral-400 pointer-events-none">ج.م</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{formData.zakatConfig.useLiveApi !== false ? "يُستخدم كاحتياطي في حال فشل جلب السعر الحي" : "السعر الثابت المستخدم في الحساب"}</p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>

            <div className="flex justify-end">
                <button className="bg-primary-500 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-primary-600 transition-colors" onClick={handleSave}>
                    حفظ التغييرات
                </button>
            </div>
        </div>
    );
}
