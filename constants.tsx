
import { WordItem, Furniture } from './types';

export const WORD_LIST: WordItem[] = [
  { 
    id: '1', en: 'neighbourhood', cn: '鄰近地區', emoji: '🏘️', phonetic: '/ˈneɪbəhʊd/',
    syllables: 'neigh-bour-hood (3)',
    breakdown: 'neigh (near) + bour (dweller) + hood (state)',
    etymology: '來自古英語 "neahgebur"，意思是住在附近的人。',
    funFact: '你的鄰居可能就是你最好的朋友！',
    realityScanner: '城市是由許多小社區組成的，每個社區都有自己的特色。'
  },
  { 
    id: '2', en: 'post office', cn: '郵政局', emoji: '📯', phonetic: '/pəʊst ˈɒfɪs/',
    syllables: 'post of-fice (3)',
    breakdown: 'post (mail) + office (workplace)',
    etymology: 'Post 來自拉丁語 "posita"，意為「放置的地方」。',
    funFact: '世界上最古老的郵局已經開了超過300年了！',
    realityScanner: '除了寄信，現代郵局還能處理護照和保險。'
  },
  { 
    id: '3', en: 'post a parcel', cn: '寄包裹', emoji: '📦', phonetic: '/pəʊst ə ˈpɑːsl/',
    syllables: 'post a par-cel (4)',
    breakdown: 'post (send) + parcel (small part)',
    etymology: 'Parcel 源自拉丁語 "particula"，意思是小部分。',
    funFact: '以前有人甚至試過通過郵件「寄」小孩子（這現在是禁止的！）',
    realityScanner: '包裹通常會通過飛機或貨車運送到世界各地。'
  },
  { 
    id: '4', en: 'post a letter', cn: '寄信', emoji: '✉️', phonetic: '/pəʊst ə ˈletə/',
    syllables: 'post a let-ter (4)',
    breakdown: 'post (mail) + letter (written message)',
    etymology: 'Letter 來自法語 "lettre"，意思是寫好的符號。',
    funFact: '在1840年之前，寄信的人是不付錢的，而是收信的人付錢！',
    realityScanner: '雖然現在有電子郵件，但收到手寫信件還是很溫馨。'
  },
  { 
    id: '5', en: 'bank', cn: '銀行', emoji: '🏦', phonetic: '/bæŋk/',
    syllables: 'bank (1)',
    breakdown: 'bank (a counter for money)',
    etymology: '來自意大利語 "banca"，意思是長凳或櫃檯。',
    funFact: '豬仔錢罌（Piggy Bank）最早其實是用一種叫 "pygg" 的橙色粘土做的。',
    realityScanner: '銀行現在大多使用電腦管理，你還可以用手機銀行轉賬。'
  },
  { 
    id: '6', en: 'bakery', cn: '麵包店', emoji: '🍞', phonetic: '/ˈbeɪkəri/',
    syllables: 'bak-er-y (3)',
    breakdown: 'bake (cook with dry heat) + ery (place)',
    etymology: 'Bake 來自古英語 "bacan"。',
    funFact: '古埃及人是世界上最早發明專業烤爐和烘烤麵包的人。',
    realityScanner: '麵包店不僅賣麵包，還有甜點和生日蛋糕。'
  },
  { 
    id: '7', en: 'jewellery shop', cn: '珠寶店', emoji: '💎', phonetic: '/ˈdʒuːəlri ʃɒp/',
    syllables: 'jew-el-ler-y shop (4)',
    breakdown: 'jewel (gem) + lery (collection)',
    etymology: '來自古法語 "jouel"，意為玩具或遊戲。',
    funFact: '鑽石其實是純碳在高壓下形成的，和鉛筆芯的成份一樣！',
    realityScanner: '珠寶店通常有非常嚴密的防盜系統。'
  },
  { 
    id: '8', en: 'clinic', cn: '診所', emoji: '🏥', phonetic: '/ˈklɪnɪk/',
    syllables: 'clin-ic (2)',
    breakdown: 'clin (slope/bed) + ic (pertaining to)',
    etymology: '源自希臘語 "klinike"，意思是「床邊的醫療」。',
    funFact: '以前的診所醫生會騎馬去病人家中。',
    realityScanner: '診所是當你感到輕微不適時第一個要去的地方。'
  },
  { 
    id: '9', en: 'department store', cn: '百貨公司', emoji: '🏬', phonetic: '/dɪˈpɑːtmənt stɔː/',
    syllables: 'de-part-ment store (4)',
    breakdown: 'de (away) + part (section) + ment (state)',
    etymology: 'Department 意思是一個整體的各個部分。',
    funFact: '第一家現代百貨公司是在19世紀中期的法國巴黎開業的。',
    realityScanner: '百貨公司裡什麼都有，從化妝品到廚具。'
  },
  { 
    id: '10', en: 'buy furniture', cn: '買傢俬', emoji: '🪑', phonetic: '/baɪ ˈfɜːnɪtʃə/',
    syllables: 'buy fur-ni-ture (4)',
    breakdown: 'buy (get for money) + furnish (equip)',
    etymology: 'Furniture 來自法語 "fournir"，意為供應。',
    funFact: '世界上最古老的椅子大約有4500年的歷史！',
    realityScanner: '現代傢俬設計非常講究符合人體工學，讓你坐得更舒服。'
  },
  { 
    id: '11', en: 'sports centre', cn: '體育館', emoji: '🏀', phonetic: '/spɔːt ˈsentə/',
    syllables: 'sports cen-tre (3)',
    breakdown: 'sports (games) + centre (middle/place)',
    etymology: 'Sport 是 "disport" 的縮寫，意思是消遣。',
    funFact: '有些體育館的草皮是可以像抽屜一樣推出去曬太陽的！',
    realityScanner: '體育館內通常有羽毛球場、籃球場和游泳池。'
  },
  { 
    id: '12', en: 'supermarket', cn: '超級市場', emoji: '🛒', phonetic: '/ˈsuːpəmɑːkɪt/',
    syllables: 'su-per-mar-ket (4)',
    breakdown: 'super (big/great) + market (trade place)',
    etymology: 'Market 來自拉丁語 "mercatus"，意為貿易。',
    funFact: '超市購物車的設計是為了讓你買更多的東西！',
    realityScanner: '超市通常會把必需品放在店鋪最深處，讓你走過更多貨架。'
  },
  { 
    id: '13', en: 'buy groceries', cn: '購買食品雜貨', emoji: '🍏', phonetic: '/baɪ ˈɡrəʊsəriz/',
    syllables: 'buy gro-cer-ies (4)',
    breakdown: 'grocer (one who sells by gross) + ies (plural)',
    etymology: 'Grocer 來自古法語 "grossier"，意思是批發商。',
    funFact: '以前的雜貨商會親自送貨到你家門口。',
    realityScanner: '食品雜貨包括新鮮蔬菜、肉類和日常用品。'
  },
  { 
    id: '14', en: 'train station', cn: '火車站', emoji: '🚉', phonetic: '/treɪn ˈsteɪʃən/',
    syllables: 'train sta-tion (3)',
    breakdown: 'train (connected cars) + station (standing place)',
    etymology: 'Station 來自拉丁語 "statio"，意思是站立。',
    funFact: '世界上最繁忙的火車站在日本新宿，每天有幾百萬人經過。',
    realityScanner: '火車站不僅是交通樞紐，裡面還有很多商店和餐廳。'
  },
  { 
    id: '15', en: 'health and beauty store', cn: '健康美容用品店', emoji: '💄', phonetic: '/helθ ənd ˈbjuːti stɔː/',
    syllables: 'health and beau-ty store (5)',
    breakdown: 'health (well-being) + beauty (appearance)',
    etymology: 'Beauty 來自拉丁語 "bellus"，意為美麗。',
    funFact: '古代人會用鉛和水銀來化妝，這對身體非常有害！',
    realityScanner: '這種商店賣藥品、洗髮水、化妝品和護膚品。'
  },
  { 
    id: '16', en: 'learning centre', cn: '學習中心', emoji: '🏫', phonetic: '/ˈlɜːnɪŋ ˈsentə/',
    syllables: 'learn-ing cen-tre (4)',
    breakdown: 'learn (gain skill) + centre (place)',
    etymology: 'Learn 來自古英語 "leornian"。',
    funFact: '大腦在你學習新事物時會建立新的神經連接！',
    realityScanner: '學習中心提供各種課程，如藝術、樂器和學術補習。'
  },
  { 
    id: '17', en: 'take a course', cn: '修讀一個課程', emoji: '📜', phonetic: '/teɪk ə kɔːs/',
    syllables: 'take a course (3)',
    breakdown: 'take (participate) + course (running track)',
    etymology: 'Course 來自拉丁語 "cursus"，意為奔跑的路徑。',
    funFact: '現在你可以在網絡上學習哈佛大學的免費課程！',
    realityScanner: '修讀課程可以讓你學會一項新的技能。'
  },
  { 
    id: '18', en: 'convenience store', cn: '便利店', emoji: '🏪', phonetic: '/kənˈviːniəns stɔː/',
    syllables: 'con-ven-ience store (4)',
    breakdown: 'con (together) + venire (come) + store',
    etymology: 'Convenience 意思是「來到一起」，非常方便。',
    funFact: '第一家 7-Eleven 是在1927年的美國達拉斯開業的。',
    realityScanner: '便利店通常24小時營業，方便你隨時買零食。'
  },
  { 
    id: '19', en: 'hospital', cn: '醫院', emoji: '🏥', phonetic: '/ˈhɒspɪtl/',
    syllables: 'hos-pi-tal (3)',
    breakdown: 'host (guest) + pital (place)',
    etymology: '來自拉丁語 "hospitalis"，原本是招待客人的地方（飯店也是同根詞）。',
    funFact: '有些醫院裡會有專門的「醫院小丑」來逗生病的小朋友開心。',
    realityScanner: '醫院擁有專業的醫療團隊和先進的救命儀器。'
  },
  { 
    id: '20', en: 'walk straight ahead', cn: '直走', emoji: '➡️', phonetic: '',
    syllables: 'walk straight a-head (4)',
    breakdown: 'walk (move on foot) + straight (linear) + ahead (in front)',
    etymology: 'Ahead 意思是在你的頭部前面。',
    funFact: '如果你在森林裡蒙住眼睛走，你其實會走成一個圓圈！',
    realityScanner: '導航系統最常用的指令就是「直行」。'
  },
  { 
    id: '21', en: 'turn', cn: '轉', emoji: '↩️', phonetic: '',
    syllables: 'turn (1)',
    breakdown: 'turn (rotate)',
    etymology: '來自拉丁語 "tornare"，意思是旋轉車床。',
    funFact: '有些動物如鴨子，能在睡眠中只轉動一半的大腦！',
    realityScanner: '迷路時最重要的一步就是及時掉頭或轉彎。'
  },
  { 
    id: '22', en: 'opposite', cn: '在…… 對面', emoji: '↔️', phonetic: '',
    syllables: 'op-po-site (3)',
    breakdown: 'ob (against) + ponere (set/place)',
    etymology: '意思是放在對面的位置。',
    funFact: '鏡子裡看到的你，就是你的 "opposite" 鏡像。',
    realityScanner: '問路時，人們常說「就在銀行對面」。'
  },
  { 
    id: '23', en: 'nearest', cn: '最近的', emoji: '📍', phonetic: '',
    syllables: 'near-est (2)',
    breakdown: 'near (close) + est (most)',
    etymology: '來自古英語 "neah"。',
    funFact: '月球是離地球最近（nearest）的天然星球！',
    realityScanner: '在緊急情況下，你應該找最近的警察局。'
  },
  { 
    id: '24', en: 'fantastic', cn: '好棒', emoji: '✨', phonetic: '',
    syllables: 'fan-tas-tic (3)',
    breakdown: 'fantasy (imagination) + ic (suffix)',
    etymology: '來自希臘語 "phantastikos"，意思是想像力豐富。',
    funFact: '以前 "fantastic" 意思是指不真實或奇怪的東西，現在是讚美。',
    realityScanner: '當你完成所有遊戲時，你的表現就是 Fantastic！'
  },
  { 
    id: '25', en: 'nearby', cn: '附近', emoji: '🗺️', phonetic: '',
    syllables: 'near-by (2)',
    breakdown: 'near (close) + by (side)',
    etymology: '意思是就在身邊。',
    funFact: '你身邊隨時都有幾百萬隻肉眼看不見的微生物！',
    realityScanner: '附近的便利店是鄰居們常去的地方。'
  },
];

export const FURNITURE_LIST: Furniture[] = [
  { id: 'f1', name: 'Sofa', emoji: '🛋️', unlocked: false },
  { id: 'f2', name: 'TV', emoji: '📺', unlocked: false },
  { id: 'f3', name: 'Lamp', emoji: '💡', unlocked: false },
  { id: 'f4', name: 'Rug', emoji: '🧶', unlocked: false },
  { id: 'f5', name: 'Plant', emoji: '🪴', unlocked: false },
  { id: 'f6', name: 'Desk', emoji: '📖', unlocked: false },
  { id: 'f7', name: 'Bed', emoji: '🛏️', unlocked: false },
  { id: 'f8', name: 'Clock', emoji: '⏰', unlocked: false },
  { id: 'f9', name: 'Painting', emoji: '🖼️', unlocked: false },
  { id: 'f10', name: 'Cat Tree', emoji: '🐱', unlocked: false },
  { id: 'f11', name: 'Bookshelf', emoji: '📚', unlocked: false },
  { id: 'f12', name: 'Mirror', emoji: '🪞', unlocked: false },
  { id: 'f13', name: 'Table', emoji: '🍽️', unlocked: false },
  { id: 'f14', name: 'Armchair', emoji: '🪑', unlocked: false },
  { id: 'f15', name: 'Robot Vacuum', emoji: '🤖', unlocked: false },
  { id: 'f16', name: 'Guitar', emoji: '🎸', unlocked: false },
  { id: 'f17', name: 'Curtains', emoji: '🪟', unlocked: false },
  { id: 'f18', name: 'Wardrobe', emoji: '👗', unlocked: false },
];

export const POKEMON_SPRITES = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const POKEMON_IDS = {
  Pikachu: 25,
  Bulbasaur: 1,
  Charmander: 4,
  Squirtle: 7,
  Eevee: 133,
  Mew: 151,
  Jigglypuff: 39,
  Snorlax: 143,
  Lucario: 448,
  Gengar: 94,
  Psyduck: 54,
  Meowth: 52,
};
