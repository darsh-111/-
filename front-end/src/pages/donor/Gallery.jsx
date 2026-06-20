import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataContext';

function Gallery() {
    const { state } = useAdminData();
    const [selected, setSelected] = useState(null);
    const images = state.gallery || [];

    return (
        <div className="pb-16">
            <div className="bg-gradient-to-br from-[#0d6b4b] to-[#094a33] text-white py-16 px-0 text-center">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <h3 className="text-3xl font-bold mb-3">معرض الصور</h3>
                    <p className="text-lg opacity-90">لحظات من رحلتنا الخيرية</p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-6">
                {images.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                        <i className="fa-regular fa-images text-5xl opacity-30"></i>
                        <p className="mt-3">لا توجد صور في المعرض بعد</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-3">
                        {images.map((img) => (
                            <div className="col-span-6 sm:col-span-4 md:col-span-3" key={img.id}>
                                <div
                                    className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden cursor-pointer group"
                                    onClick={() => setSelected(img)}
                                >
                                    <div className="relative">
                                        <img
                                            className="w-full h-48 object-cover"
                                            src={img.image}
                                            alt={img.title}
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=300&fit=crop'; }}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-sm font-bold text-white">{img.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelected(null)}>
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-2 right-2 p-2 rounded-md text-white bg-black/50 hover:bg-black/70 transition-colors z-10"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img
                            src={selected.image}
                            alt={selected.title}
                            className="max-w-[90vw] max-h-[85vh] rounded-xl block"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop'; }}
                        />
                        <div className="text-center mt-2">
                            <h6 className="text-lg font-bold text-white">{selected.title}</h6>
                            {selected.description && <p className="text-sm text-white/70">{selected.description}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
