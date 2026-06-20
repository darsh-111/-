import { t } from '../../i18n';
import TestimonialCardItem from './TestimonialCardItem';

function HomeTestimonials({ testimonials, isDark }) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <div className={`pt-16 md:pt-24 pb-4 md:pb-6`}
            style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.015)' : undefined }}
        >
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                <h3 className="font-bold text-center mb-6 text-2xl md:text-3xl">{t('home.testimonials')}</h3>
                <div className="grid grid-cols-12 gap-3">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="col-span-12 sm:col-span-6 md:col-span-4 flex">
                            <TestimonialCardItem
                                text={testimonial.content || testimonial.text}
                                name={testimonial.name}
                                role={testimonial.role}
                                initial={testimonial.name?.charAt(0)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeTestimonials;
