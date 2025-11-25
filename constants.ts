
export const SALON_NAME = "استودیو زیبایی هوشمند Gemini";

export const PRESETS: { id: string; name: string; description: string; prompt: string; icon: string }[] = [
  {
    id: 'natural_glow',
    name: 'درخشش طبیعی',
    description: 'پوستی شفاف، رژ گونه ملایم و مژه‌های مشخص بدون سنگینی.',
    prompt: 'Apply a "Natural Glow" makeup look. Enhance skin texture to look dewy and hydrated. Add subtle peach blush, clear brow gel, and a tinted lip balm effect. Keep it extremely natural.',
    icon: '✨'
  },
  {
    id: 'clean_girl',
    name: 'کلین گرل',
    description: 'میکاپ مینیمال، ابروهای لیفت شده و برق لب.',
    prompt: 'Apply "Clean Girl" aesthetic makeup. Fluffy brushed-up brows, minimal concealer, glossy cheekbones, and clear lip gloss. Fresh and effortless look.',
    icon: '🧖‍♀️'
  },
  {
    id: 'glam_night',
    name: 'گلم شبانه',
    description: 'آرایش کامل مناسب مهمانی با رژ قرمز کلاسیک و خط چشم.',
    prompt: 'Apply a "Hollywood Glam" makeup style. Classic red matte lipstick, winged black eyeliner, sculpted contouring, and defined eyebrows. High coverage foundation finish.',
    icon: '🌙'
  },
  {
    id: 'soft_smokey',
    name: 'اسموکی لایت',
    description: 'تمرکز روی چشم‌ها با سایه‌های دودی ملایم و نود.',
    prompt: 'Apply a soft smokey eye makeup look using brown and taupe shades. Pair with a nude matte lipstick and soft bronzer. Sophisticated and modern.',
    icon: '👁️'
  },
  {
    id: 'editorial_avant',
    name: 'ادیتوریال',
    description: 'آرایش هنری و خاص، مناسب عکاسی مدلینگ.',
    prompt: 'Apply an "Editorial Avant-Garde" makeup look. Graphic white eyeliner, bleached eyebrows effect, and glossy eyelids. High fashion photography style.',
    icon: '📸'
  },
  {
    id: 'k_pop',
    name: 'استایل کره‌ای',
    description: 'پوست شیشه‌ای، لب‌های گرادینت و سایه اکلیلی.',
    prompt: 'Apply K-Beauty style makeup. "Glass skin" effect foundation, gradient "bitten" lips in strawberry pink, straight eyebrows, and subtle glitter on the lower lash line.',
    icon: '🎀'
  },
  {
    id: 'bronzed',
    name: 'برنزه تابستانی',
    description: 'گرم، آفتاب‌گرفته و جذاب.',
    prompt: 'Apply a "Sun-kissed" makeup look. Heavy focus on warm bronzer, gold highlighter on cheekbones, glossy nude lips, and warm brown eyeshadow.',
    icon: '☀️'
  },
  {
    id: 'cyberpunk',
    name: 'سایبرپانک',
    description: 'خط چشم نئونی و هایلایت‌های رنگی.',
    prompt: 'Apply a futuristic "Cyberpunk" makeup look. Neon graphical eyeliner, holographic highlighter on cheekbones, and cool-toned lips. Edgy and modern.',
    icon: '🤖'
  },
  {
    id: 'latte_makeup',
    name: 'لاته میکاپ',
    description: 'توناژهای قهوه‌ای گرم و کاراملی تک‌رنگ.',
    prompt: 'Apply "Latte Makeup" trend. Monochromatic caramel and coffee tones on eyes, cheeks, and lips. Matte bronzer and smudged brown eyeliner.',
    icon: '☕'
  }
];

export const FACE_AREAS: { id: string; name: string; styles: string[] }[] = [
  { id: 'lips', name: 'لب‌ها', styles: ['Matte', 'Glossy', 'Satin', 'Gradient', 'Velvet', 'Sheer'] },
  { id: 'cheeks', name: 'گونه‌ها', styles: ['High Draping', 'Apple of Cheeks', 'Sun-kissed', 'Contoured', 'Glazed'] },
  { id: 'eyeshadow', name: 'سایه چشم', styles: ['Smokey', 'Cut Crease', 'Natural Wash', 'Glitter', 'Halo', 'Fox Eye'] },
  { id: 'eyeliner', name: 'خط چشم', styles: ['Winged', 'Tightline', 'Puppy Eye', 'Graphic', 'Foxy', 'Smudged'] },
  { id: 'skin', name: 'پوست', styles: ['Matte', 'Dewy', 'Satin', 'Natural', 'Glass', 'Cloud Skin'] },
];

export const COLOR_PALETTE: string[] = [
  '#FFC0CB', '#FF69B4', '#E91E63', '#C2185B', // Pinks
  '#FFCDD2', '#EF9A9A', '#E57373', '#F44336', // Reds
  '#D7CCC8', '#A1887F', '#795548', '#5D4037', // Browns/Nudes
  '#E1BEE7', '#BA68C8', '#9C27B0', '#6A1B9A', // Purples
  '#CFD8DC', '#90A4AE', '#607D8B', '#263238', // Cool/Dark
  '#FFF9C4', '#FFECB3', '#FFCC80', '#FFAB91', // Warm/Highlights
  '#000000', '#FFFFFF', '#1A237E', '#1B5E20'  // Bold
];