
import { Product, SiteConfig, Area } from '../types';


export const INITIAL_MENU_DATA: Product[] = [
    {
        id: 'm1',
        name: 'Mega Deal 1',
        nameAr: 'ميجـا ديـل ١',
        price: 350,
        originalPrice: 480,
        category: 'deals',
        description: '2 Sandwiches + 2 Pieces + Large Fries + Liter Cola',
        descriptionAr: '٢ ساندوتش + ٢ قطعة + بطاطس كبير + لتر كولا',
        image: '',
        isSpicy: true,
        tags: ['Best Seller', 'Spicy']
    },
    {
        id: 'm2',
        name: 'Super Dinner',
        nameAr: 'سوبر دينر',
        price: 280,
        originalPrice: 320,
        category: 'deals',
        description: '3 Pieces + Fries + Coleslaw + Bun',
        descriptionAr: '٣ قطع + بطاطس + كول سلو + خبز',
        image: '',
        tags: ['New']
    },
    {
        id: 'm3',
        name: 'Chicken Burger',
        nameAr: 'تشيكن برجر',
        price: 100,
        category: 'sandwiches',
        description: 'Fresh chicken breast with lettuce and mayo',
        descriptionAr: 'صدر دجاج طازج مع خس ومايونيز',
        image: '',
        tags: ['Classic']
    },
    {
        id: 'm4',
        name: 'Heavy Hummer',
        nameAr: 'هيفي هامر',
        price: 220,
        originalPrice: 250,
        category: 'sandwiches',
        description: 'Double breast, triple cheese, special sauce',
        descriptionAr: 'صدر مضاعف، جبن ثلاثي، صوص خاص',
        image: '',
        isSpicy: true,
        tags: ['Spicy', 'Heavy']
    },
    {
        id: 'f1',
        name: 'Family Bucket',
        nameAr: 'باكيت العائلة',
        price: 650,
        category: 'family-meals',
        description: '12 Pieces + Large Fries + 2 Coleslaw + 4 Buns + 1.5L Cola',
        descriptionAr: '١٢ قطعة + بطاطس كبير + ٢ كول سلو + ٤ خبز + ١.٥ لتر كولا',
        image: '',
        tags: ['Best Seller']
    },
    {
        id: 's1',
        name: 'Coleslaw',
        nameAr: 'كول سلو',
        price: 35,
        category: 'sides',
        description: 'Fresh and creamy cabbage salad',
        descriptionAr: 'سلطة كرنب طازجة وكريمية',
        image: ''
    },
    {
        id: 'k1',
        name: 'Junior Meal',
        nameAr: 'وجبة الصغار',
        price: 120,
        category: 'kids',
        description: '1 Piece + Small Fries + Juice + Toy',
        descriptionAr: '١ قطعة + بطاطس صغير + عصير + لعبة',
        image: '',
        tags: ['For Kids']
    }
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
    hero: {
        banners: [
            {
                id: 'b1',
                titleEn: 'CRAVE THE CRUNCH!',
                titleAr: 'اعشق القرمشة!',
                subtitleEn: 'Dinner Box',
                subtitleAr: 'بوكس العشاء',
                image: '',
                offerPrice: 150,
                originalPrice: 220,
                promoTagEn: 'Limited Time Offer',
                promoTagAr: 'عرض لفترة محدودة',
                offerLabelEn: 'ORDER THE DEAL',
                offerLabelAr: 'اطلب الآن'
            }
        ]
    },
    header: {
        logoRed: 'https://raw.githubusercontent.com/ai-studio-assets/chick-logo/main/logo-red.png',
        logoWhite: 'https://raw.githubusercontent.com/ai-studio-assets/chick-logo/main/logo-white.png',
        phone: '01062222850'
    },
    footer: {
        aboutEn: 'The best fried chicken in Egypt.',
        aboutAr: 'أقوى فرايد تشيكن في مصر.',
        facebook: 'https://facebook.com/chick',
        instagram: 'https://instagram.com/chick',
        tiktok: 'https://tiktok.com/@chick',
        locationUrl: 'https://maps.app.goo.gl/R49XXYqwM6vzEf469',
        addressEn: 'Palm Beach, St 14 corner 29, El Agamy El Bahria, Egypt',
        addressAr: 'شاطئ النخيل شارع ١٤ مع ٢٩، العجمي البحرية، الإسكندرية',
        copyrightEn: '© 2024 Hassan Mohamed',
        copyrightAr: '© ٢٠٢٤ حسن محمد'
    },
    layout: [
        { id: 'deals', nameEn: 'Deals', nameAr: 'العروض' },
        { id: 'sandwiches', nameEn: 'Sandwiches', nameAr: 'سندوتشات' },
        { id: 'family-meals', nameEn: 'Family Meals', nameAr: 'وجبات عائلية' },
        { id: 'sides', nameEn: 'Side Items', nameAr: 'أصناف جانبية' },
        { id: 'kids', nameEn: 'Happy Meal', nameAr: 'وجبات أطفال' }
    ],
    tags: [
        { id: 't1', nameEn: 'Best Seller', nameAr: 'الأكثر مبيعاً' },
        { id: 't2', nameEn: 'New', nameAr: 'جديد' },
        { id: 't3', nameEn: 'Spicy', nameAr: 'حار' },
        { id: 't4', nameEn: 'Vegetarian', nameAr: 'نباتي' },
        { id: 't5', nameEn: 'Classic', nameAr: 'كلاسيك' },
        { id: 't6', nameEn: 'Heavy', nameAr: 'هيفي' }
    ],
    areas: [],
    theme: { primaryColor: '#E4002B' },
    branchStatus: 'open'
};

export const getStoredMenu = (): Product[] => {
    const stored = localStorage.getItem('chick_menu');
    const parsed = stored ? JSON.parse(stored) : null;
    return (parsed && Array.isArray(parsed) && parsed.length > 0) ? parsed : INITIAL_MENU_DATA;
};

export const getStoredConfig = (): SiteConfig => {
    const stored = localStorage.getItem('chick_config');
    const parsed = stored ? JSON.parse(stored) : null;
    return (parsed && parsed.hero && parsed.hero.banners && parsed.hero.banners.length > 0) ? parsed : INITIAL_SITE_CONFIG;
};

export const saveMenuToStorage = async (menu: Product[]) => {
    localStorage.setItem('chick_menu', JSON.stringify(menu));
    // In Supabase, we usually handle individual row updates in the Admin component,
    // but for compatibility with existing code that sends the whole array:
    // (Assuming a 'menu_items' table where each product is a row)
    // This function might be better handled in AdminDashboard now.
};

export const saveConfigToStorage = async (config: SiteConfig) => {
    localStorage.setItem('chick_config', JSON.stringify(config));
    // Similarly, site_builder updates will be handled in AdminDashboard.
};


