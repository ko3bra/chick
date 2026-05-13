
import React, { useState } from 'react';
import { Plus, Flame, CheckCircle, X, Star, ArrowRight } from 'lucide-react';
import { Product, Language, CategoryConfig, TagConfig } from '../types';

interface MenuSectionProps {
  category: CategoryConfig;
  items: Product[];
  onAddToCart: (product: Product, spiciness?: 'Normal' | 'Spicy', size?: any, extras?: any[]) => void;
  lang: Language;
  tagsConfig: TagConfig[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ category, items, onAddToCart, lang, tagsConfig }) => {
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [showOptionsId, setShowOptionsId] = useState<string | null>(null);
  const [tempSelection, setTempSelection] = useState<{ size?: any, spiciness?: any, extras?: any[] }>({ extras: [] });

  const isAr = lang === 'ar';
  const currentItem = items.find(i => i.id === showOptionsId);

  const calculateTotal = () => {
    if (!currentItem) return 0;
    const basePrice = tempSelection.size ? tempSelection.size.price : currentItem.price;
    const extrasPrice = (tempSelection.extras || []).reduce((sum, mod) => sum + mod.price, 0);
    return basePrice + extrasPrice;
  };

  const handleAddClick = (product: Product) => {
    if (product.hasSizes || product.spicinessOption || (product.extras && product.extras.length > 0)) {
      setTempSelection({ extras: [], spiciness: product.spicinessOption ? 'Normal' : undefined });
      setShowOptionsId(product.id);
    } else {
      executeAdd(product);
    }
  };

  const executeAdd = (product: Product, spiciness?: 'Normal' | 'Spicy', size?: any, extras?: any[]) => {
    onAddToCart(product, spiciness, size, extras);
    setAnimatingId(product.id + (spiciness || '') + (size?.id || '') + (extras?.length || ''));
    setShowOptionsId(null);
    setTempSelection({ extras: [] });
    setTimeout(() => setAnimatingId(null), 800);
  };

  return (
    <section id={category.id} className="py-12 scroll-mt-32">
      <div className="flex flex-col items-center mb-12 text-center">
         <div className="flex gap-1 mb-4 opacity-90">
            <Star size={14} className="text-red-600 fill-red-600" />
            <Star size={14} className="text-red-600 fill-red-600" />
            <Star size={14} className="text-red-600 fill-red-600" />
         </div>
         <div className="flex items-center gap-4 w-full">
            <div className="h-px flex-1 bg-gradient-to-l from-slate-200 to-transparent"></div>
            <h2 className="text-3xl md:text-5xl font-black brand-font tracking-tight uppercase text-slate-900 px-4">
              {lang === 'en' ? category.nameEn : category.nameAr}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
         </div>
      </div>
      
      {showOptionsId && currentItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl animate-scale-up text-center relative border-[6px] border-white overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setShowOptionsId(null)} 
              className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X size={24} />
            </button>
            
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-200">
                <Star size={48} className="text-white animate-pulse" fill="currentColor" />
              </div>
              <h3 className="text-3xl font-black brand-font text-slate-900 uppercase tracking-tight leading-tight">
                {lang === 'en' ? 'CUSTOMIZE' : 'تخصيص الطلب'}
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{lang === 'en' ? currentItem.name : currentItem.nameAr}</p>
            </div>

            <div className="space-y-8 text-left">
              {/* Size Selection */}
              {currentItem.hasSizes && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-center">
                    {lang === 'en' ? 'Choose Size' : 'اختر الحجم'}
                  </p>
                  <div className="grid grid-cols-1 gap-3 text-center">
                    {currentItem.sizes?.map(size => (
                      <button 
                        key={size.id}
                        onClick={() => setTempSelection({ ...tempSelection, size })}
                        className={`w-full py-4 rounded-2xl font-black text-sm transition-all border-2 ${tempSelection.size?.id === size.id ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-slate-50 border-transparent text-slate-900 hover:bg-slate-100'}`}
                      >
                        {lang === 'en' ? size.nameEn : size.nameAr} - {size.price} LE
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spiciness Selection */}
              {currentItem.spicinessOption && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-center">
                    {lang === 'en' ? 'Choose Heat' : 'اختر درجة الحرارة'}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setTempSelection({ ...tempSelection, spiciness: 'Normal' })}
                      className={`py-4 rounded-2xl font-black text-sm transition-all border-2 ${tempSelection.spiciness === 'Normal' ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-slate-100 border-transparent text-slate-900'}`}
                    >
                      🍗 {lang === 'en' ? 'Original' : 'عادي'}
                    </button>
                    <button 
                      onClick={() => setTempSelection({ ...tempSelection, spiciness: 'Spicy' })}
                      className={`py-4 rounded-2xl font-black text-sm transition-all border-2 ${tempSelection.spiciness === 'Spicy' ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-slate-100 border-transparent text-slate-900'}`}
                    >
                      🔥 {lang === 'en' ? 'Zinger' : 'حار'}
                    </button>
                  </div>
                </div>
              )}

              {/* Extras Selection */}
              {currentItem.extras && currentItem.extras.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-center">
                    {lang === 'en' ? 'Add Extras' : 'إضافات'}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                     {currentItem.extras.map(mod => {
                        const isSelected = tempSelection.extras?.some(m => m.id === mod.id);
                        return (
                          <button 
                            key={mod.id}
                            onClick={() => {
                               const nextExtras = isSelected 
                                  ? tempSelection.extras?.filter(m => m.id !== mod.id)
                                  : [...(tempSelection.extras || []), mod];
                               setTempSelection({...tempSelection, extras: nextExtras});
                            }}
                            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${isSelected ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-slate-50 border-transparent text-slate-900 hover:bg-slate-100'}`}
                          >
                             <span className="text-xs font-black uppercase">{lang === 'en' ? mod.nameEn : mod.nameAr}</span>
                             <span className={`text-[10px] font-black ${isSelected ? 'text-red-400' : 'text-red-600'}`}>+{mod.price} LE</span>
                          </button>
                        )
                     })}
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center gap-2 pt-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Total' : 'الإجمالي'}</p>
                 <p className="text-3xl font-black text-red-600 brand-font">{calculateTotal()} LE</p>
              </div>

              <button 
                disabled={(currentItem.hasSizes && !tempSelection.size) || (currentItem.spicinessOption && !tempSelection.spiciness)}
                onClick={() => executeAdd(currentItem, tempSelection.spiciness, tempSelection.size, tempSelection.extras)}
                className="w-full bg-slate-900 text-white font-black py-6 rounded-[2rem] hover:bg-red-600 active:scale-95 transition-all shadow-2xl disabled:opacity-20 mt-4 uppercase tracking-widest text-xs"
              >
                {lang === 'en' ? 'ADD TO BASKET' : 'إضافة للطلب'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
        {items.map((item) => {
          const isAnimating = animatingId?.startsWith(item.id);

          return (
            <div 
              key={item.id} 
              className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-soft hover-lift border border-slate-100/50 flex flex-col relative"
            >
              <div className="relative h-40 md:h-64 overflow-hidden bg-white p-3 md:p-6">
                <img 
                   src={item.image} 
                   alt={lang === 'en' ? item.name : item.nameAr} 
                   loading="lazy"
                   decoding="async"
                   className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-3 md:top-6 left-3 md:left-6 flex flex-col gap-1 md:gap-2">
                  {item.tags?.map(tag => {
                    const tagObj = tagsConfig?.find(t => t.nameEn.toLowerCase() === tag.toLowerCase());
                    const displayName = isAr ? (tagObj?.nameAr || tag) : (tagObj?.nameEn || tag);
                    return (
                      <span key={tag} className="bg-white/95 backdrop-blur-md text-red-600 text-[8px] md:text-[10px] font-black px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl uppercase tracking-widest shadow-lg border border-red-50/50">
                        {displayName}
                      </span>
                    );
                  })}
                </div>
                
                {/* Price Tag - Classic Comparison Style */}
                <div className="absolute bottom-3 right-3 bg-slate-900/95 backdrop-blur-xl text-white px-3 py-2 rounded-2xl shadow-2xl border border-white/5 flex items-center gap-3 z-10">
                  {item.originalPrice !== undefined && item.originalPrice > item.price && item.originalPrice > 0 && (
                    <div className="flex items-center border-r border-white/10 pr-3">
                       <span className="text-red-500 font-black text-xs md:text-sm line-through decoration-white/40 decoration-[1.5px]">
                          {item.originalPrice}
                       </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-2xl font-black leading-none text-white tracking-tighter">
                      {item.price}
                    </span>
                    <span className="text-[7px] md:text-[9px] font-black text-white/40 uppercase">{isAr ? 'ج.م' : 'LE'}</span>
                  </div>
                </div>
              </div>

              <div className="px-4 md:px-8 pb-4 md:pb-8 pt-1 md:pt-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-start gap-2 md:gap-4">
                    <h3 className="font-black text-sm md:text-xl text-slate-900 leading-tight group-hover:text-red-600 transition-colors uppercase brand-font tracking-tight text-balance">
                      {lang === 'en' ? item.name : item.nameAr}
                    </h3>
                    {item.isSpicy && (
                      <div className="bg-red-50 text-red-600 p-1.5 md:p-2 rounded-lg md:rounded-xl shrink-0">
                         <Flame size={14} md:size={16} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <p className="text-[8px] md:text-[9px] text-slate-300 font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">{lang === 'en' ? item.nameAr : item.name}</p>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 opacity-80">
                    {lang === 'en' ? item.description : item.descriptionAr}
                  </p>
                </div>

                <div className="mt-4 md:mt-8 flex gap-1 md:gap-2">
                  <button 
                    onClick={() => handleAddClick(item)}
                    className={`flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-sm btn-add-to-cart ${
                      isAnimating ? 'bg-success border-success text-white shadow-lg' : ''
                    }`}
                  >
                    {isAnimating ? (
                      <div className="flex items-center justify-center gap-2">
                         <CheckCircle size={20} />
                         <span className="text-[11px] md:text-xs font-black">{lang === 'en' ? 'Added!' : 'تم الإضافة'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Plus size={20} strokeWidth={4} />
                        <span className="text-[11px] md:text-xs font-black">{lang === 'en' ? 'Add' : 'أضف'}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MenuSection;
