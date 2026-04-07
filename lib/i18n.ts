export const locales = ['en', 'es', 'zh', 'tl', 'vi', 'ko', 'hi', 'bn', 'ur', 'ar', 'so', 'ru', 'pl', 'fr', 'pt', 'de', 'ja', 'he'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export interface Translations {
  nav: {
    allPosts: string;
    backToOneTapAlert: string;
    downloadApp: string;
    oneTapAlertBlog: string;
  };
  blog: {
    latestArticles: string;
    readMore: string;
    minRead: string;
    backToBlog: string;
    relatedArticles: string;
    tableOfContents: string;
    heroSubtitle: string;
    downloadApp: string;
    readArticles: string;
    stayInformed: string;
  };
  cta: {
    title: string;
    description: string;
    downloadNow: string;
    stayProtected: string;
    getTheApp: string;
  };
  footer: {
    quickLinks: string;
    support: string;
    home: string;
    about: string;
    features: string;
    pricing: string;
    blog: string;
    helpCenter: string;
    contactUs: string;
    privacyPolicy: string;
    termsOfService: string;
    allRightsReserved: string;
    tagline: string;
    brandDescription: string;
  };
  meta: {
    defaultTitle: string;
    defaultDescription: string;
    titleTemplate: string;
  };
  language: {
    name: string;
    code: string;
  };
}

const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      allPosts: 'All Posts',
      backToOneTapAlert: 'Back to One Tap Alert',
      downloadApp: 'Download App',
      oneTapAlertBlog: 'One Tap Alert Blog',
    },
    blog: {
      latestArticles: 'Latest Articles',
      readMore: 'Read more',
      minRead: 'min read',
      backToBlog: 'Back to Blog',
      relatedArticles: 'Related Articles',
      tableOfContents: 'Table of Contents',
      heroSubtitle: 'Safety tips, emergency preparedness guides, and personal security advice to help you stay protected.',
      downloadApp: 'Download App',
      readArticles: 'Read Articles',
      stayInformed: 'Stay informed with our latest safety guides and personal security tips.',
    },
    cta: {
      title: 'Stay Safe with One Tap Alert',
      description: 'Alert your emergency contacts with your live location in one tap. Free to download, available on iOS.',
      downloadNow: 'Download Now',
      stayProtected: 'Stay protected everywhere you go.',
      getTheApp: 'Get One Tap Alert — your personal safety network.',
    },
    footer: {
      quickLinks: 'Quick Links',
      support: 'Support',
      home: 'Home',
      about: 'About',
      features: 'Features',
      pricing: 'Pricing',
      blog: 'Blog',
      helpCenter: 'Help Center',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      allRightsReserved: 'All rights reserved.',
      tagline: 'Your personal safety network.',
      brandDescription: 'One Tap Alert lets you instantly notify your emergency contacts with your real-time location when you need help. No background tracking, no data selling — just safety.',
    },
    meta: {
      defaultTitle: 'One Tap Alert Blog — Personal Safety Tips & Emergency Guides',
      defaultDescription: 'Expert guides on personal safety, emergency preparedness, campus safety, and how to stay protected with One Tap Alert — your SOS safety app.',
      titleTemplate: '%s | One Tap Alert Blog',
    },
    language: { name: 'English', code: 'EN' },
  },
  es: {
    nav: {
      allPosts: 'Todos los artículos',
      backToOneTapAlert: 'Volver a One Tap Alert',
      downloadApp: 'Descargar App',
      oneTapAlertBlog: 'Blog de One Tap Alert',
    },
    blog: {
      latestArticles: 'Últimos artículos',
      readMore: 'Leer más',
      minRead: 'min de lectura',
      backToBlog: 'Volver al blog',
      relatedArticles: 'Artículos relacionados',
      tableOfContents: 'Tabla de contenidos',
      heroSubtitle: 'Consejos de seguridad, guías de preparación para emergencias y consejos de seguridad personal.',
      downloadApp: 'Descargar App',
      readArticles: 'Leer artículos',
      stayInformed: 'Mantente informado con nuestras últimas guías de seguridad.',
    },
    cta: {
      title: 'Mantente seguro con One Tap Alert',
      description: 'Alerta a tus contactos de emergencia con tu ubicación en vivo con un solo toque. Gratis para descargar.',
      downloadNow: 'Descargar ahora',
      stayProtected: 'Mantente protegido donde vayas.',
      getTheApp: 'Obtén One Tap Alert — tu red de seguridad personal.',
    },
    footer: {
      quickLinks: 'Enlaces rápidos',
      support: 'Soporte',
      home: 'Inicio',
      about: 'Acerca de',
      features: 'Funciones',
      pricing: 'Precios',
      blog: 'Blog',
      helpCenter: 'Centro de ayuda',
      contactUs: 'Contáctanos',
      privacyPolicy: 'Política de privacidad',
      termsOfService: 'Términos de servicio',
      allRightsReserved: 'Todos los derechos reservados.',
      tagline: 'Tu red de seguridad personal.',
      brandDescription: 'One Tap Alert te permite notificar al instante a tus contactos de emergencia con tu ubicación en tiempo real cuando necesitas ayuda.',
    },
    meta: {
      defaultTitle: 'Blog de One Tap Alert — Consejos de Seguridad Personal',
      defaultDescription: 'Guías expertas sobre seguridad personal, preparación para emergencias y cómo mantenerte protegido con One Tap Alert.',
      titleTemplate: '%s | Blog de One Tap Alert',
    },
    language: { name: 'Español', code: 'ES' },
  },
  zh: {
    nav: {
      allPosts: '所有文章',
      backToOneTapAlert: '返回 One Tap Alert',
      downloadApp: '下载应用',
      oneTapAlertBlog: 'One Tap Alert 博客',
    },
    blog: {
      latestArticles: '最新文章',
      readMore: '阅读更多',
      minRead: '分钟阅读',
      backToBlog: '返回博客',
      relatedArticles: '相关文章',
      tableOfContents: '目录',
      heroSubtitle: '安全提示、应急准备指南和个人安全建议，帮助您保持安全。',
      downloadApp: '下载应用',
      readArticles: '阅读文章',
      stayInformed: '通过我们最新的安全指南和个人安全提示保持了解。',
    },
    cta: {
      title: '使用 One Tap Alert 保持安全',
      description: '一键向紧急联系人发送您的实时位置。免费下载，适用于 iOS。',
      downloadNow: '立即下载',
      stayProtected: '无论您在哪里都保持安全。',
      getTheApp: '获取 One Tap Alert — 您的个人安全网络。',
    },
    footer: {
      quickLinks: '快速链接',
      support: '支持',
      home: '首页',
      about: '关于',
      features: '功能',
      pricing: '价格',
      blog: '博客',
      helpCenter: '帮助中心',
      contactUs: '联系我们',
      privacyPolicy: '隐私政策',
      termsOfService: '服务条款',
      allRightsReserved: '保留所有权利。',
      tagline: '您的个人安全网络。',
      brandDescription: 'One Tap Alert 让您在需要帮助时立即通知紧急联系人并分享实时位置。无后台追踪，不出售数据——只关注安全。',
    },
    meta: {
      defaultTitle: 'One Tap Alert 博客 — 个人安全提示与应急指南',
      defaultDescription: '个人安全、应急准备、校园安全的专家指南，以及如何使用 One Tap Alert 保持安全。',
      titleTemplate: '%s | One Tap Alert 博客',
    },
    language: { name: '中文', code: '中文' },
  },
  tl: {
    nav: { allPosts: 'Lahat ng Artikulo', backToOneTapAlert: 'Bumalik sa One Tap Alert', downloadApp: 'I-download ang App', oneTapAlertBlog: 'One Tap Alert Blog' },
    blog: { latestArticles: 'Pinakabagong Artikulo', readMore: 'Magbasa pa', minRead: 'min basahin', backToBlog: 'Bumalik sa Blog', relatedArticles: 'Kaugnay na Artikulo', tableOfContents: 'Talaan ng Nilalaman', heroSubtitle: 'Mga tip sa kaligtasan, gabay sa paghahanda sa emerhensiya, at payo sa personal na seguridad.', downloadApp: 'I-download ang App', readArticles: 'Basahin ang mga Artikulo', stayInformed: 'Manatiling updated sa aming pinakabagong gabay sa kaligtasan.' },
    cta: { title: 'Manatiling Ligtas gamit ang One Tap Alert', description: 'Alertuhan ang iyong mga emergency contact gamit ang iyong live na lokasyon sa isang tap. Libreng i-download.', downloadNow: 'I-download Ngayon', stayProtected: 'Manatiling protektado saan ka man pumunta.', getTheApp: 'Kunin ang One Tap Alert — ang iyong personal na safety network.' },
    footer: { quickLinks: 'Mabilisang Link', support: 'Suporta', home: 'Home', about: 'Tungkol', features: 'Mga Tampok', pricing: 'Presyo', blog: 'Blog', helpCenter: 'Help Center', contactUs: 'Kontakin Kami', privacyPolicy: 'Patakaran sa Privacy', termsOfService: 'Mga Tuntunin ng Serbisyo', allRightsReserved: 'Lahat ng karapatan ay nakalaan.', tagline: 'Ang iyong personal na safety network.', brandDescription: 'Pinapayagan ka ng One Tap Alert na agad na alertuhan ang iyong mga emergency contact gamit ang iyong real-time na lokasyon kapag kailangan mo ng tulong.' },
    meta: { defaultTitle: 'One Tap Alert Blog — Mga Tip sa Personal na Kaligtasan', defaultDescription: 'Mga gabay sa personal na kaligtasan, paghahanda sa emerhensiya, at paano manatiling protektado gamit ang One Tap Alert.', titleTemplate: '%s | One Tap Alert Blog' },
    language: { name: 'Tagalog', code: 'TL' },
  },
  vi: {
    nav: { allPosts: 'Tất cả bài viết', backToOneTapAlert: 'Quay lại One Tap Alert', downloadApp: 'Tải ứng dụng', oneTapAlertBlog: 'Blog One Tap Alert' },
    blog: { latestArticles: 'Bài viết mới nhất', readMore: 'Đọc thêm', minRead: 'phút đọc', backToBlog: 'Quay lại Blog', relatedArticles: 'Bài viết liên quan', tableOfContents: 'Mục lục', heroSubtitle: 'Mẹo an toàn, hướng dẫn chuẩn bị khẩn cấp và lời khuyên về an ninh cá nhân.', downloadApp: 'Tải ứng dụng', readArticles: 'Đọc bài viết', stayInformed: 'Cập nhật với các hướng dẫn an toàn và mẹo bảo mật cá nhân mới nhất.' },
    cta: { title: 'An toàn với One Tap Alert', description: 'Thông báo cho liên hệ khẩn cấp với vị trí trực tiếp chỉ bằng một chạm. Miễn phí tải xuống.', downloadNow: 'Tải ngay', stayProtected: 'Luôn được bảo vệ mọi nơi bạn đến.', getTheApp: 'Tải One Tap Alert — mạng lưới an toàn cá nhân của bạn.' },
    footer: { quickLinks: 'Liên kết nhanh', support: 'Hỗ trợ', home: 'Trang chủ', about: 'Giới thiệu', features: 'Tính năng', pricing: 'Giá cả', blog: 'Blog', helpCenter: 'Trung tâm trợ giúp', contactUs: 'Liên hệ', privacyPolicy: 'Chính sách bảo mật', termsOfService: 'Điều khoản dịch vụ', allRightsReserved: 'Bảo lưu mọi quyền.', tagline: 'Mạng lưới an toàn cá nhân của bạn.', brandDescription: 'One Tap Alert cho phép bạn ngay lập tức thông báo cho liên hệ khẩn cấp với vị trí thời gian thực khi cần giúp đỡ.' },
    meta: { defaultTitle: 'Blog One Tap Alert — Mẹo An Toàn Cá Nhân', defaultDescription: 'Hướng dẫn chuyên gia về an toàn cá nhân, chuẩn bị khẩn cấp và cách giữ an toàn với One Tap Alert.', titleTemplate: '%s | Blog One Tap Alert' },
    language: { name: 'Tiếng Việt', code: 'VI' },
  },
  ko: {
    nav: { allPosts: '모든 글', backToOneTapAlert: 'One Tap Alert로 돌아가기', downloadApp: '앱 다운로드', oneTapAlertBlog: 'One Tap Alert 블로그' },
    blog: { latestArticles: '최신 글', readMore: '더 읽기', minRead: '분 읽기', backToBlog: '블로그로 돌아가기', relatedArticles: '관련 글', tableOfContents: '목차', heroSubtitle: '안전 팁, 비상 대비 가이드, 개인 보안 조언으로 안전하게 지내세요.', downloadApp: '앱 다운로드', readArticles: '글 읽기', stayInformed: '최신 안전 가이드와 개인 보안 팁을 확인하세요.' },
    cta: { title: 'One Tap Alert로 안전하게', description: '한 번의 탭으로 비상 연락처에 실시간 위치를 알립니다. 무료 다운로드.', downloadNow: '지금 다운로드', stayProtected: '어디를 가든 안전하게.', getTheApp: 'One Tap Alert 다운로드 — 당신의 개인 안전 네트워크.' },
    footer: { quickLinks: '빠른 링크', support: '지원', home: '홈', about: '소개', features: '기능', pricing: '가격', blog: '블로그', helpCenter: '도움말 센터', contactUs: '문의하기', privacyPolicy: '개인정보 처리방침', termsOfService: '서비스 약관', allRightsReserved: '모든 권리 보유.', tagline: '당신의 개인 안전 네트워크.', brandDescription: 'One Tap Alert는 도움이 필요할 때 비상 연락처에 실시간 위치를 즉시 알릴 수 있습니다.' },
    meta: { defaultTitle: 'One Tap Alert 블로그 — 개인 안전 팁 및 비상 가이드', defaultDescription: '개인 안전, 비상 대비, 캠퍼스 안전 전문 가이드 및 One Tap Alert로 안전하게 지내는 방법.', titleTemplate: '%s | One Tap Alert 블로그' },
    language: { name: '한국어', code: '한국어' },
  },
  hi: {
    nav: { allPosts: 'सभी लेख', backToOneTapAlert: 'One Tap Alert पर वापस', downloadApp: 'ऐप डाउनलोड करें', oneTapAlertBlog: 'One Tap Alert ब्लॉग' },
    blog: { latestArticles: 'नवीनतम लेख', readMore: 'और पढ़ें', minRead: 'मिनट पढ़ें', backToBlog: 'ब्लॉग पर वापस', relatedArticles: 'संबंधित लेख', tableOfContents: 'विषय सूची', heroSubtitle: 'सुरक्षा टिप्स, आपातकालीन तैयारी गाइड और व्यक्तिगत सुरक्षा सलाह।', downloadApp: 'ऐप डाउनलोड करें', readArticles: 'लेख पढ़ें', stayInformed: 'हमारे नवीनतम सुरक्षा गाइड और व्यक्तिगत सुरक्षा टिप्स से अपडेट रहें।' },
    cta: { title: 'One Tap Alert के साथ सुरक्षित रहें', description: 'एक टैप में अपने आपातकालीन संपर्कों को अपनी लाइव लोकेशन से अलर्ट करें। मुफ्त डाउनलोड।', downloadNow: 'अभी डाउनलोड करें', stayProtected: 'जहां भी जाएं सुरक्षित रहें।', getTheApp: 'One Tap Alert प्राप्त करें — आपका व्यक्तिगत सुरक्षा नेटवर्क।' },
    footer: { quickLinks: 'त्वरित लिंक', support: 'सहायता', home: 'होम', about: 'हमारे बारे में', features: 'विशेषताएं', pricing: 'मूल्य', blog: 'ब्लॉग', helpCenter: 'सहायता केंद्र', contactUs: 'संपर्क करें', privacyPolicy: 'गोपनीयता नीति', termsOfService: 'सेवा की शर्तें', allRightsReserved: 'सर्वाधिकार सुरक्षित।', tagline: 'आपका व्यक्तिगत सुरक्षा नेटवर्क।', brandDescription: 'One Tap Alert आपको जरूरत पड़ने पर अपने आपातकालीन संपर्कों को तुरंत अपनी रियल-टाइम लोकेशन भेजने की सुविधा देता है।' },
    meta: { defaultTitle: 'One Tap Alert ब्लॉग — व्यक्तिगत सुरक्षा टिप्स', defaultDescription: 'व्यक्तिगत सुरक्षा, आपातकालीन तैयारी और One Tap Alert के साथ सुरक्षित रहने के बारे में विशेषज्ञ गाइड।', titleTemplate: '%s | One Tap Alert ब्लॉग' },
    language: { name: 'हिन्दी', code: 'हिन्दी' },
  },
  bn: {
    nav: { allPosts: 'সব নিবন্ধ', backToOneTapAlert: 'One Tap Alert-এ ফিরুন', downloadApp: 'অ্যাপ ডাউনলোড করুন', oneTapAlertBlog: 'One Tap Alert ব্লগ' },
    blog: { latestArticles: 'সাম্প্রতিক নিবন্ধ', readMore: 'আরও পড়ুন', minRead: 'মিনিট পড়া', backToBlog: 'ব্লগে ফিরুন', relatedArticles: 'সম্পর্কিত নিবন্ধ', tableOfContents: 'সূচিপত্র', heroSubtitle: 'নিরাপত্তা টিপস, জরুরি প্রস্তুতির গাইড এবং ব্যক্তিগত নিরাপত্তা পরামর্শ।', downloadApp: 'অ্যাপ ডাউনলোড করুন', readArticles: 'নিবন্ধ পড়ুন', stayInformed: 'আমাদের সাম্প্রতিক নিরাপত্তা গাইড দিয়ে আপডেট থাকুন।' },
    cta: { title: 'One Tap Alert দিয়ে নিরাপদ থাকুন', description: 'এক ট্যাপে আপনার জরুরি পরিচিতিদের আপনার লাইভ লোকেশন পাঠান। বিনামূল্যে ডাউনলোড করুন।', downloadNow: 'এখনই ডাউনলোড করুন', stayProtected: 'যেখানেই যান সুরক্ষিত থাকুন।', getTheApp: 'One Tap Alert নিন — আপনার ব্যক্তিগত নিরাপত্তা নেটওয়ার্ক।' },
    footer: { quickLinks: 'দ্রুত লিংক', support: 'সাপোর্ট', home: 'হোম', about: 'সম্পর্কে', features: 'বৈশিষ্ট্য', pricing: 'মূল্য', blog: 'ব্লগ', helpCenter: 'সাহায্য কেন্দ্র', contactUs: 'যোগাযোগ', privacyPolicy: 'গোপনীয়তা নীতি', termsOfService: 'সেবার শর্তাবলী', allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।', tagline: 'আপনার ব্যক্তিগত নিরাপত্তা নেটওয়ার্ক।', brandDescription: 'One Tap Alert আপনাকে সাহায্য প্রয়োজন হলে আপনার জরুরি পরিচিতিদের তাৎক্ষণিকভাবে আপনার রিয়েল-টাইম লোকেশন জানাতে দেয়।' },
    meta: { defaultTitle: 'One Tap Alert ব্লগ — ব্যক্তিগত নিরাপত্তা টিপস', defaultDescription: 'ব্যক্তিগত নিরাপত্তা, জরুরি প্রস্তুতি এবং One Tap Alert দিয়ে নিরাপদ থাকার বিশেষজ্ঞ গাইড।', titleTemplate: '%s | One Tap Alert ব্লগ' },
    language: { name: 'বাংলা', code: 'বাংলা' },
  },
  ur: {
    nav: { allPosts: 'تمام مضامین', backToOneTapAlert: 'One Tap Alert پر واپس', downloadApp: 'ایپ ڈاؤن لوڈ کریں', oneTapAlertBlog: 'One Tap Alert بلاگ' },
    blog: { latestArticles: 'تازہ ترین مضامین', readMore: 'مزید پڑھیں', minRead: 'منٹ پڑھنے', backToBlog: 'بلاگ پر واپس', relatedArticles: 'متعلقہ مضامین', tableOfContents: 'فہرست مضامین', heroSubtitle: 'حفاظتی تجاویز، ہنگامی تیاری کے رہنما اور ذاتی حفاظت کے مشورے۔', downloadApp: 'ایپ ڈاؤن لوڈ کریں', readArticles: 'مضامین پڑھیں', stayInformed: 'ہماری تازہ ترین حفاظتی گائیڈز سے باخبر رہیں۔' },
    cta: { title: 'One Tap Alert کے ساتھ محفوظ رہیں', description: 'ایک ٹیپ سے اپنے ہنگامی رابطوں کو اپنا لائیو مقام بھیجیں۔ مفت ڈاؤن لوڈ۔', downloadNow: 'ابھی ڈاؤن لوڈ کریں', stayProtected: 'جہاں بھی جائیں محفوظ رہیں۔', getTheApp: 'One Tap Alert حاصل کریں — آپ کا ذاتی حفاظتی نیٹ ورک۔' },
    footer: { quickLinks: 'فوری لنکس', support: 'سپورٹ', home: 'ہوم', about: 'ہمارے بارے میں', features: 'خصوصیات', pricing: 'قیمتیں', blog: 'بلاگ', helpCenter: 'مدد مرکز', contactUs: 'ہم سے رابطہ کریں', privacyPolicy: 'رازداری کی پالیسی', termsOfService: 'سروس کی شرائط', allRightsReserved: 'جملہ حقوق محفوظ ہیں۔', tagline: 'آپ کا ذاتی حفاظتی نیٹ ورک۔', brandDescription: 'One Tap Alert آپ کو ضرورت پڑنے پر اپنے ہنگامی رابطوں کو فوری طور پر اپنا ریئل ٹائم مقام بھیجنے دیتا ہے۔' },
    meta: { defaultTitle: 'One Tap Alert بلاگ — ذاتی حفاظت کے مشورے', defaultDescription: 'ذاتی حفاظت، ہنگامی تیاری اور One Tap Alert کے ساتھ محفوظ رہنے کے ماہر رہنما۔', titleTemplate: '%s | One Tap Alert بلاگ' },
    language: { name: 'اردو', code: 'اردو' },
  },
  ar: {
    nav: { allPosts: 'جميع المقالات', backToOneTapAlert: 'العودة إلى One Tap Alert', downloadApp: 'تحميل التطبيق', oneTapAlertBlog: 'مدونة One Tap Alert' },
    blog: { latestArticles: 'أحدث المقالات', readMore: 'اقرأ المزيد', minRead: 'دقائق للقراءة', backToBlog: 'العودة للمدونة', relatedArticles: 'مقالات ذات صلة', tableOfContents: 'جدول المحتويات', heroSubtitle: 'نصائح السلامة وأدلة الاستعداد للطوارئ ونصائح الأمان الشخصي.', downloadApp: 'تحميل التطبيق', readArticles: 'اقرأ المقالات', stayInformed: 'ابق على اطلاع بأحدث أدلة السلامة والنصائح الأمنية.' },
    cta: { title: 'ابق آمنًا مع One Tap Alert', description: 'أبلغ جهات اتصال الطوارئ بموقعك المباشر بنقرة واحدة. مجاني للتحميل.', downloadNow: 'حمل الآن', stayProtected: 'ابق محميًا أينما ذهبت.', getTheApp: 'احصل على One Tap Alert — شبكة أمانك الشخصية.' },
    footer: { quickLinks: 'روابط سريعة', support: 'الدعم', home: 'الرئيسية', about: 'حول', features: 'المميزات', pricing: 'الأسعار', blog: 'المدونة', helpCenter: 'مركز المساعدة', contactUs: 'اتصل بنا', privacyPolicy: 'سياسة الخصوصية', termsOfService: 'شروط الخدمة', allRightsReserved: 'جميع الحقوق محفوظة.', tagline: 'شبكة أمانك الشخصية.', brandDescription: 'يتيح لك One Tap Alert إبلاغ جهات اتصال الطوارئ بموقعك الفعلي فورًا عند الحاجة.' },
    meta: { defaultTitle: 'مدونة One Tap Alert — نصائح الأمان الشخصي', defaultDescription: 'أدلة خبراء حول الأمان الشخصي والاستعداد للطوارئ وكيفية البقاء آمنًا مع One Tap Alert.', titleTemplate: '%s | مدونة One Tap Alert' },
    language: { name: 'العربية', code: 'العربية' },
  },
  so: {
    nav: { allPosts: 'Dhammaan Maqaalada', backToOneTapAlert: 'Ku noqo One Tap Alert', downloadApp: 'Soo deji App-ka', oneTapAlertBlog: 'Blogka One Tap Alert' },
    blog: { latestArticles: 'Maqaaladii ugu dambeeyey', readMore: 'Akhri wax badan', minRead: 'daqiiqo akhriska', backToBlog: 'Ku noqo Blogka', relatedArticles: 'Maqaalada la xiriira', tableOfContents: 'Tusmada', heroSubtitle: 'Talooyin badbaado, hagitaanka degdegga ah iyo talada amniga shakhsiga.', downloadApp: 'Soo deji App-ka', readArticles: 'Akhri Maqaalada', stayInformed: 'La soco hagitaankeena badbaadada ugu dambeeyey.' },
    cta: { title: 'Ku nabad gal One Tap Alert', description: 'Uga dig xiriiryadaada degdegga goobta tooska ah hal taabo. Bilaash soo deji.', downloadNow: 'Hadda soo deji', stayProtected: 'Iska ilaali meel kasta oo aad tagto.', getTheApp: 'Hel One Tap Alert — shabakaddaada badbaadada shakhsiga ah.' },
    footer: { quickLinks: 'Xiriirinta Degdegga', support: 'Taageero', home: 'Bogga Hore', about: 'Ku saabsan', features: 'Astaamaha', pricing: 'Qiimaha', blog: 'Blogka', helpCenter: 'Xarunta Caawimaadda', contactUs: 'Nala soo xiriir', privacyPolicy: 'Siyaasadda Asturnaanta', termsOfService: 'Shuruudaha Adeegga', allRightsReserved: 'Dhammaan xuquuqdu way ilaalsan yihiin.', tagline: 'Shabakaddaada badbaadada shakhsiga ah.', brandDescription: 'One Tap Alert wuxuu kuu oggolaanayaa inaad isla markiiba uga wargeliso xiriiryadaada degdegga goobta tooska ah markaad caawimaad u baahato.' },
    meta: { defaultTitle: 'Blogka One Tap Alert — Talooyin Badbaado Shakhsi', defaultDescription: 'Hagitaanno khubarada ah oo ku saabsan badbaadada shakhsiga, diyaargarowga degdegga ah iyo sida aad ugu nabad galaan One Tap Alert.', titleTemplate: '%s | Blogka One Tap Alert' },
    language: { name: 'Soomaali', code: 'SO' },
  },
  ru: {
    nav: { allPosts: 'Все статьи', backToOneTapAlert: 'Назад к One Tap Alert', downloadApp: 'Скачать приложение', oneTapAlertBlog: 'Блог One Tap Alert' },
    blog: { latestArticles: 'Последние статьи', readMore: 'Читать далее', minRead: 'мин чтения', backToBlog: 'Назад в блог', relatedArticles: 'Похожие статьи', tableOfContents: 'Содержание', heroSubtitle: 'Советы по безопасности, руководства по готовности к чрезвычайным ситуациям и рекомендации по личной безопасности.', downloadApp: 'Скачать приложение', readArticles: 'Читать статьи', stayInformed: 'Будьте в курсе наших последних руководств по безопасности.' },
    cta: { title: 'Будьте в безопасности с One Tap Alert', description: 'Оповестите экстренные контакты с вашим местоположением в одно касание. Бесплатная загрузка.', downloadNow: 'Скачать сейчас', stayProtected: 'Будьте защищены, где бы вы ни были.', getTheApp: 'Скачайте One Tap Alert — вашу персональную сеть безопасности.' },
    footer: { quickLinks: 'Быстрые ссылки', support: 'Поддержка', home: 'Главная', about: 'О нас', features: 'Функции', pricing: 'Цены', blog: 'Блог', helpCenter: 'Центр помощи', contactUs: 'Связаться с нами', privacyPolicy: 'Политика конфиденциальности', termsOfService: 'Условия использования', allRightsReserved: 'Все права защищены.', tagline: 'Ваша персональная сеть безопасности.', brandDescription: 'One Tap Alert позволяет мгновенно уведомить экстренные контакты с вашим местоположением в реальном времени.' },
    meta: { defaultTitle: 'Блог One Tap Alert — Советы по личной безопасности', defaultDescription: 'Экспертные руководства по личной безопасности, готовности к ЧС и безопасности с One Tap Alert.', titleTemplate: '%s | Блог One Tap Alert' },
    language: { name: 'Русский', code: 'RU' },
  },
  pl: {
    nav: { allPosts: 'Wszystkie artykuły', backToOneTapAlert: 'Wróć do One Tap Alert', downloadApp: 'Pobierz aplikację', oneTapAlertBlog: 'Blog One Tap Alert' },
    blog: { latestArticles: 'Najnowsze artykuły', readMore: 'Czytaj więcej', minRead: 'min czytania', backToBlog: 'Wróć do bloga', relatedArticles: 'Powiązane artykuły', tableOfContents: 'Spis treści', heroSubtitle: 'Porady bezpieczeństwa, przewodniki gotowości na sytuacje awaryjne i porady dotyczące bezpieczeństwa osobistego.', downloadApp: 'Pobierz aplikację', readArticles: 'Czytaj artykuły', stayInformed: 'Bądź na bieżąco z naszymi najnowszymi przewodnikami bezpieczeństwa.' },
    cta: { title: 'Bądź bezpieczny z One Tap Alert', description: 'Powiadom kontakty alarmowe swoją lokalizacją na żywo jednym dotknięciem. Pobierz za darmo.', downloadNow: 'Pobierz teraz', stayProtected: 'Bądź chroniony, gdziekolwiek jesteś.', getTheApp: 'Pobierz One Tap Alert — Twoją osobistą sieć bezpieczeństwa.' },
    footer: { quickLinks: 'Szybkie linki', support: 'Wsparcie', home: 'Strona główna', about: 'O nas', features: 'Funkcje', pricing: 'Cennik', blog: 'Blog', helpCenter: 'Centrum pomocy', contactUs: 'Kontakt', privacyPolicy: 'Polityka prywatności', termsOfService: 'Regulamin', allRightsReserved: 'Wszelkie prawa zastrzeżone.', tagline: 'Twoja osobista sieć bezpieczeństwa.', brandDescription: 'One Tap Alert pozwala natychmiast powiadomić kontakty alarmowe z Twoją lokalizacją w czasie rzeczywistym, gdy potrzebujesz pomocy.' },
    meta: { defaultTitle: 'Blog One Tap Alert — Porady Bezpieczeństwa Osobistego', defaultDescription: 'Eksperckie przewodniki o bezpieczeństwie osobistym, gotowości na sytuacje awaryjne i jak być bezpiecznym z One Tap Alert.', titleTemplate: '%s | Blog One Tap Alert' },
    language: { name: 'Polski', code: 'PL' },
  },
  fr: {
    nav: { allPosts: 'Tous les articles', backToOneTapAlert: 'Retour à One Tap Alert', downloadApp: "Télécharger l'app", oneTapAlertBlog: 'Blog One Tap Alert' },
    blog: { latestArticles: 'Derniers articles', readMore: 'Lire la suite', minRead: 'min de lecture', backToBlog: 'Retour au blog', relatedArticles: 'Articles connexes', tableOfContents: 'Table des matières', heroSubtitle: 'Conseils de sécurité, guides de préparation aux urgences et conseils de sécurité personnelle.', downloadApp: "Télécharger l'app", readArticles: 'Lire les articles', stayInformed: 'Restez informé avec nos derniers guides de sécurité.' },
    cta: { title: 'Restez en sécurité avec One Tap Alert', description: "Alertez vos contacts d'urgence avec votre position en direct en un seul tap. Téléchargement gratuit.", downloadNow: 'Télécharger maintenant', stayProtected: 'Restez protégé où que vous alliez.', getTheApp: 'Obtenez One Tap Alert — votre réseau de sécurité personnel.' },
    footer: { quickLinks: 'Liens rapides', support: 'Support', home: 'Accueil', about: 'À propos', features: 'Fonctionnalités', pricing: 'Tarifs', blog: 'Blog', helpCenter: "Centre d'aide", contactUs: 'Contactez-nous', privacyPolicy: 'Politique de confidentialité', termsOfService: "Conditions d'utilisation", allRightsReserved: 'Tous droits réservés.', tagline: 'Votre réseau de sécurité personnel.', brandDescription: "One Tap Alert vous permet d'alerter instantanément vos contacts d'urgence avec votre position en temps réel lorsque vous avez besoin d'aide." },
    meta: { defaultTitle: 'Blog One Tap Alert — Conseils de Sécurité Personnelle', defaultDescription: "Guides experts sur la sécurité personnelle, la préparation aux urgences et comment rester en sécurité avec One Tap Alert.", titleTemplate: '%s | Blog One Tap Alert' },
    language: { name: 'Français', code: 'FR' },
  },
  pt: {
    nav: { allPosts: 'Todos os artigos', backToOneTapAlert: 'Voltar ao One Tap Alert', downloadApp: 'Baixar app', oneTapAlertBlog: 'Blog One Tap Alert' },
    blog: { latestArticles: 'Últimos artigos', readMore: 'Ler mais', minRead: 'min de leitura', backToBlog: 'Voltar ao blog', relatedArticles: 'Artigos relacionados', tableOfContents: 'Índice', heroSubtitle: 'Dicas de segurança, guias de preparação para emergências e conselhos de segurança pessoal.', downloadApp: 'Baixar app', readArticles: 'Ler artigos', stayInformed: 'Fique informado com nossos guias de segurança mais recentes.' },
    cta: { title: 'Fique seguro com One Tap Alert', description: 'Alerte seus contatos de emergência com sua localização ao vivo com um toque. Download gratuito.', downloadNow: 'Baixar agora', stayProtected: 'Fique protegido onde quer que vá.', getTheApp: 'Baixe o One Tap Alert — sua rede de segurança pessoal.' },
    footer: { quickLinks: 'Links rápidos', support: 'Suporte', home: 'Início', about: 'Sobre', features: 'Recursos', pricing: 'Preços', blog: 'Blog', helpCenter: 'Central de ajuda', contactUs: 'Contato', privacyPolicy: 'Política de privacidade', termsOfService: 'Termos de serviço', allRightsReserved: 'Todos os direitos reservados.', tagline: 'Sua rede de segurança pessoal.', brandDescription: 'O One Tap Alert permite notificar instantaneamente seus contatos de emergência com sua localização em tempo real quando precisar de ajuda.' },
    meta: { defaultTitle: 'Blog One Tap Alert — Dicas de Segurança Pessoal', defaultDescription: 'Guias especializados sobre segurança pessoal, preparação para emergências e como ficar seguro com o One Tap Alert.', titleTemplate: '%s | Blog One Tap Alert' },
    language: { name: 'Português', code: 'PT' },
  },
  de: {
    nav: { allPosts: 'Alle Artikel', backToOneTapAlert: 'Zurück zu One Tap Alert', downloadApp: 'App herunterladen', oneTapAlertBlog: 'One Tap Alert Blog' },
    blog: { latestArticles: 'Neueste Artikel', readMore: 'Weiterlesen', minRead: 'Min. Lesezeit', backToBlog: 'Zurück zum Blog', relatedArticles: 'Verwandte Artikel', tableOfContents: 'Inhaltsverzeichnis', heroSubtitle: 'Sicherheitstipps, Notfall-Vorbereitungsanleitungen und persönliche Sicherheitsratschläge.', downloadApp: 'App herunterladen', readArticles: 'Artikel lesen', stayInformed: 'Bleiben Sie mit unseren neuesten Sicherheitsanleitungen informiert.' },
    cta: { title: 'Bleiben Sie sicher mit One Tap Alert', description: 'Benachrichtigen Sie Ihre Notfallkontakte mit Ihrem Live-Standort mit einem Tipp. Kostenlos herunterladen.', downloadNow: 'Jetzt herunterladen', stayProtected: 'Bleiben Sie geschützt, wohin Sie auch gehen.', getTheApp: 'Laden Sie One Tap Alert herunter — Ihr persönliches Sicherheitsnetzwerk.' },
    footer: { quickLinks: 'Schnelllinks', support: 'Support', home: 'Startseite', about: 'Über uns', features: 'Funktionen', pricing: 'Preise', blog: 'Blog', helpCenter: 'Hilfezentrum', contactUs: 'Kontakt', privacyPolicy: 'Datenschutzrichtlinie', termsOfService: 'Nutzungsbedingungen', allRightsReserved: 'Alle Rechte vorbehalten.', tagline: 'Ihr persönliches Sicherheitsnetzwerk.', brandDescription: 'One Tap Alert ermöglicht es Ihnen, Ihre Notfallkontakte sofort mit Ihrem Echtzeit-Standort zu benachrichtigen, wenn Sie Hilfe brauchen.' },
    meta: { defaultTitle: 'One Tap Alert Blog — Persönliche Sicherheitstipps', defaultDescription: 'Expertenanleitungen zu persönlicher Sicherheit, Notfallvorsorge und wie Sie mit One Tap Alert sicher bleiben.', titleTemplate: '%s | One Tap Alert Blog' },
    language: { name: 'Deutsch', code: 'DE' },
  },
  ja: {
    nav: { allPosts: 'すべての記事', backToOneTapAlert: 'One Tap Alertに戻る', downloadApp: 'アプリをダウンロード', oneTapAlertBlog: 'One Tap Alert ブログ' },
    blog: { latestArticles: '最新記事', readMore: '続きを読む', minRead: '分で読めます', backToBlog: 'ブログに戻る', relatedArticles: '関連記事', tableOfContents: '目次', heroSubtitle: '安全のヒント、緊急時の備えガイド、個人の安全に関するアドバイス。', downloadApp: 'アプリをダウンロード', readArticles: '記事を読む', stayInformed: '最新の安全ガイドと個人セキュリティのヒントをチェック。' },
    cta: { title: 'One Tap Alertで安全に', description: 'ワンタップで緊急連絡先にリアルタイムの位置情報を通知。無料ダウンロード。', downloadNow: '今すぐダウンロード', stayProtected: 'どこにいても安全に。', getTheApp: 'One Tap Alertをダウンロード — あなたの個人安全ネットワーク。' },
    footer: { quickLinks: 'クイックリンク', support: 'サポート', home: 'ホーム', about: '概要', features: '機能', pricing: '料金', blog: 'ブログ', helpCenter: 'ヘルプセンター', contactUs: 'お問い合わせ', privacyPolicy: 'プライバシーポリシー', termsOfService: '利用規約', allRightsReserved: '全著作権所有。', tagline: 'あなたの個人安全ネットワーク。', brandDescription: 'One Tap Alertは助けが必要な時に緊急連絡先にリアルタイムの位置情報を即座に通知できます。' },
    meta: { defaultTitle: 'One Tap Alert ブログ — 個人安全のヒント', defaultDescription: '個人の安全、緊急時の備え、One Tap Alertで安全に過ごす方法についての専門ガイド。', titleTemplate: '%s | One Tap Alert ブログ' },
    language: { name: '日本語', code: '日本語' },
  },
  he: {
    nav: { allPosts: 'כל המאמרים', backToOneTapAlert: 'חזרה ל-One Tap Alert', downloadApp: 'הורד את האפליקציה', oneTapAlertBlog: 'בלוג One Tap Alert' },
    blog: { latestArticles: 'מאמרים אחרונים', readMore: 'קרא עוד', minRead: 'דקות קריאה', backToBlog: 'חזרה לבלוג', relatedArticles: 'מאמרים קשורים', tableOfContents: 'תוכן עניינים', heroSubtitle: 'טיפים לבטיחות, מדריכים להיערכות לחירום ועצות לביטחון אישי.', downloadApp: 'הורד את האפליקציה', readArticles: 'קרא מאמרים', stayInformed: 'הישאר מעודכן עם המדריכים האחרונים שלנו לבטיחות.' },
    cta: { title: 'הישאר בטוח עם One Tap Alert', description: 'התריע לאנשי הקשר לחירום שלך עם המיקום החי שלך בנגיעה אחת. הורדה חינם.', downloadNow: 'הורד עכשיו', stayProtected: 'הישאר מוגן לאן שלא תלך.', getTheApp: 'הורד את One Tap Alert — רשת הביטחון האישית שלך.' },
    footer: { quickLinks: 'קישורים מהירים', support: 'תמיכה', home: 'דף הבית', about: 'אודות', features: 'תכונות', pricing: 'תמחור', blog: 'בלוג', helpCenter: 'מרכז עזרה', contactUs: 'צור קשר', privacyPolicy: 'מדיניות פרטיות', termsOfService: 'תנאי שימוש', allRightsReserved: 'כל הזכויות שמורות.', tagline: 'רשת הביטחון האישית שלך.', brandDescription: 'One Tap Alert מאפשר לך להתריע מיידית לאנשי הקשר לחירום שלך עם המיקום בזמן אמת כשאתה צריך עזרה.' },
    meta: { defaultTitle: 'בלוג One Tap Alert — טיפים לביטחון אישי', defaultDescription: 'מדריכים מקצועיים על ביטחון אישי, היערכות לחירום ואיך להישאר בטוח עם One Tap Alert.', titleTemplate: '%s | בלוג One Tap Alert' },
    language: { name: 'עברית', code: 'עברית' },
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const localeNames: Record<Locale, string> = {
  en: 'English', es: 'Español', zh: '中文', tl: 'Tagalog', vi: 'Tiếng Việt',
  ko: '한국어', hi: 'हिन्दी', bn: 'বাংলা', ur: 'اردو', ar: 'العربية',
  so: 'Soomaali', ru: 'Русский', pl: 'Polski', fr: 'Français', pt: 'Português',
  de: 'Deutsch', ja: '日本語', he: 'עברית',
};

export const localeDateFormats: Record<Locale, string> = {
  en: 'en-US', es: 'es-ES', zh: 'zh-CN', tl: 'fil-PH', vi: 'vi-VN',
  ko: 'ko-KR', hi: 'hi-IN', bn: 'bn-BD', ur: 'ur-PK', ar: 'ar-SA',
  so: 'so-SO', ru: 'ru-RU', pl: 'pl-PL', fr: 'fr-FR', pt: 'pt-BR',
  de: 'de-DE', ja: 'ja-JP', he: 'he-IL',
};

export const localeOgMap: Record<Locale, string> = {
  en: 'en_US', es: 'es_ES', zh: 'zh_CN', tl: 'fil_PH', vi: 'vi_VN',
  ko: 'ko_KR', hi: 'hi_IN', bn: 'bn_BD', ur: 'ur_PK', ar: 'ar_SA',
  so: 'so_SO', ru: 'ru_RU', pl: 'pl_PL', fr: 'fr_FR', pt: 'pt_BR',
  de: 'de_DE', ja: 'ja_JP', he: 'he_IL',
};
