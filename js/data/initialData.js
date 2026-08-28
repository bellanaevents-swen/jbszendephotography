export const fashionPhotoBgImage = "/images/fashion_photo_bg_1787752513248.jpg";
export const heroBgImage = "/images/camera_hero_bg_1786090450899.jpg";
export const macroBgImage = "/images/camera_macro_bg_1786090472295.jpg";
export const fashionBgImage = "/images/fashion_photo_bg_1787752513248.jpg";
export const INITIAL_SITE_SETTINGS = {
  photographerName: "JB Szende",
  photographerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  title: {
    en: "JB Szende Photography",
    ro: "JB Szende Fotografie",
    hu: "JB Szende Fot\xF3m\u0171v\xE9szet"
  },
  heroHeadline: {
    en: "Capturing Raw Emotion, Timeless Landscapes & Authentic Moments",
    ro: "Captur\xE2nd emo\u021Bii autentice, peisaje atemporale \u0219i momente reale",
    hu: "Nyers \xE9rzelmek, id\u0151tlen t\xE1jak \xE9s autentikus pillanatok meg\xF6r\xF6k\xEDt\xE9se"
  },
  heroSubheadline: {
    en: "Professional Photography based in Odorheiu Secuiesc, specializing in portraits, family stories, outdoor action, and cinematic event coverage.",
    ro: "Fotografie profesional\u0103 cu sediul \xEEn Odorheiu Secuiesc, specializat\u0103 \xEEn portrete, pove\u0219ti de familie, ac\u021Biune \xEEn aer liber \u0219i evenimente cinematografice.",
    hu: "Professzion\xE1lis fot\xF3m\u0171v\xE9szet Sz\xE9kelyudvarhelyen \u2013 portr\xE9k, csal\xE1di t\xF6rt\xE9netek, szabadt\xE9ri akci\xF3k \xE9s \xE9lm\xE9nyd\xFAs esem\xE9nyek m\u0171v\xE9szi meg\xF6r\xF6k\xEDt\xE9se."
  },
  bioText: {
    en: "With over a decade behind the lens, JB Szende brings a subtle light-driven perspective to every shoot. From snow-covered peaks to intimate family smiles, every photograph tells a story of genuine connection and enduring artistry.",
    ro: "Cu peste zece ani \xEEn spatele obiectivului, JB Szende aduce o perspectiv\u0103 subtil\u0103 ghidat\u0103 de lumin\u0103 \xEEn fiecare \u0219edin\u021B\u0103 foto. De la v\xE2rfuri \xEEnz\u0103pezite la z\xE2mbete calde de familie, fiecare fotografie spune o poveste despre conexiune veritabil\u0103.",
    hu: "T\xF6bb mint egy \xE9vtizedes tapasztalattal a kamera m\xF6g\xF6tt, JB Szende a f\xE9ny \xE9s a term\xE9szet ihlette egyedi l\xE1t\xE1sm\xF3ddal dolgozik. A havas hegycs\xFAcsokt\xF3l a meghitt csal\xE1di pillanatokig minden fot\xF3 egy igazi t\xF6rt\xE9netet mes\xE9l el."
  },
  contactEmail: "contact@szendephotography.com",
  contactPhone: "+40 740 123 456",
  location: "Odorheiu Secuiesc, Harghita, Romania",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  copyrightText: "\xA9 2026 SwenTech. All rights reserved.",
  activeBackground: fashionPhotoBgImage,
  adminEmail: "baraszende89@gmail.com",
  adminPassword: "Ajtofelfa1234"
};
export const INITIAL_FEEDBACKS = [
  {
    id: "fb-1",
    clientName: "Anca & Mihai Popa",
    rating: 5,
    sessionType: "Family & Portrait Session",
    comment: "JB Szende captured our family photos in Harghita with such emotional warmth! Every frame felt completely natural and the lighting was magical.",
    date: "2026-02-14",
    approved: true
  },
  {
    id: "fb-2",
    clientName: "Kov\xE1cs Ferenc",
    rating: 5,
    sessionType: "Outdoor Mountain Photography",
    comment: "Fantasztikus l\xE1t\xE1sm\xF3d \xE9s profi munka! Sz\xE9kelyudvarhely k\xF6rny\xE9ki t\xE1jk\xE9pek \xE9s portr\xE9k cs\xFAcsmin\u0151s\xE9gben. Sz\xEDvb\u0151l aj\xE1nlom mindenkinek.",
    date: "2026-01-28",
    approved: true
  },
  {
    id: "fb-3",
    clientName: "Elena Dumitrescu",
    rating: 5,
    sessionType: "Event & Personal Branding",
    comment: "High contrast aesthetic, prompt delivery, and exceptional attention to detail. Working with JB Szende was a breeze!",
    date: "2026-01-05",
    approved: true
  }
];
export const INITIAL_ALBUMS = [
  {
    id: "nature",
    slug: "nature-mountains",
    name: {
      en: "Mountains & Nature",
      ro: "Mun\u021Bi \u0219i Natur\u0103",
      hu: "Hegyek \xE9s Term\xE9szet"
    },
    description: {
      en: "Majestic mountain peaks, winter landscapes, and dramatic outdoor horizons.",
      ro: "V\xE2rfuri montane maiestuoase, peisaje de iarn\u0103 \u0219i orizonturi spectaculoase.",
      hu: "Fens\xE9ges hegycs\xFAcsok, t\xE9li t\xE1jak \xE9s dr\xE1mai szabadt\xE9ri horizontok."
    },
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-10"
  },
  {
    id: "portraits",
    slug: "portraits-lifestyle",
    name: {
      en: "Portraits & Expressions",
      ro: "Portrete \u0219i Expresii",
      hu: "Portr\xE9k \xE9s Kifejez\xE9sek"
    },
    description: {
      en: "Intimate, natural lighting portraits reflecting genuine personality and character.",
      ro: "Portrete intime cu lumin\u0103 natural\u0103 ce reflect\u0103 personalitatea veritabil\u0103.",
      hu: "Meghitt, term\xE9szetes f\xE9nyben k\xE9sz\xFClt portr\xE9k a szem\xE9lyis\xE9g tiszta t\xFCkr\xE9ben."
    },
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-15"
  },
  {
    id: "family",
    slug: "family-children",
    name: {
      en: "Family & Childhood",
      ro: "Familie \u0219i Copil\u0103rie",
      hu: "Csal\xE1d \xE9s Gyermekkor"
    },
    description: {
      en: "Warm moments, joyful innocence, and cherished family milestones.",
      ro: "Momente calde, inocen\u021B\u0103 plin\u0103 de bucurie \u0219i repere de nepre\u021Buit \xEEn familie.",
      hu: "Meleg pillanatok, \xF6r\xF6mteli \xE1rtatlans\xE1g \xE9s \xE9rt\xE9kes csal\xE1di eml\xE9kek."
    },
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-02-01"
  },
  {
    id: "action",
    slug: "action-sports",
    name: {
      en: "Action & Athleticism",
      ro: "Ac\u021Biune \u0219i Atletism",
      hu: "Akci\xF3 \xE9s Sport"
    },
    description: {
      en: "High-energy outdoor sports, fitness achievements, and dynamic movement.",
      ro: "Sporturi de exterior pline de energie, performan\u021B\u0103 fizic\u0103 \u0219i mi\u0219care dinamic\u0103.",
      hu: "Lend\xFCletes szabadt\xE9ri sportok, fitnesz teljes\xEDtm\xE9nyek \xE9s dinamikus mozg\xE1s."
    },
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-02-10"
  },
  {
    id: "events",
    slug: "events-culture",
    name: {
      en: "Events & Culture",
      ro: "Evenimente \u0219i Cultur\u0103",
      hu: "Esem\xE9nyek \xE9s Kult\xFAra"
    },
    description: {
      en: "Vibrant carnivals, street festivities, and unforgettable cultural celebrations.",
      ro: "Carnavaluri vibrante, festivit\u0103\u021Bi stradale \u0219i celebrari culturale memorabile.",
      hu: "Lend\xFCletes karnev\xE1lok, utcai fesztiv\xE1lok \xE9s felejthetetlen kultur\xE1lis \xFCnnepek."
    },
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-02-14"
  },
  {
    id: "fashion",
    slug: "fashion-editorial",
    name: {
      en: "Fashion & Editorial",
      ro: "Mod\u0103 \u0219i Editorial",
      hu: "Divat \xE9s Szerkeszt\u0151s\xE9gi"
    },
    description: {
      en: "High-end haute couture studio sessions, dramatic lighting, and editorial concept photography.",
      ro: "\u0218edin\u021Be foto de \xEEnalt\u0103 mod\u0103 \xEEn studio, lumini dramatice \u0219i concepte editoriale.",
      hu: "Pr\xE9mium haute couture st\xFAdi\xF3 fot\xF3z\xE1sok, dr\xE1mai vil\xE1g\xEDt\xE1s \xE9s szerkeszt\u0151s\xE9gi m\u0171v\xE9szi koncepci\xF3k."
    },
    coverImage: "/images/fashion_photo_bg.jpg",
    createdAt: "2026-02-20"
  }
];
export const INITIAL_PHOTOS = [
  {
    id: "photo-fashion-1",
    albumId: "fashion",
    src: "/images/fashion_photo_bg.jpg",
    title: {
      en: "Haute Couture Studio Silhouette",
      ro: "Siluet\u0103 Haute Couture \xEEn Studio",
      hu: "Haute Couture St\xFAdi\xF3 Sziluett"
    },
    description: {
      en: "High-contrast editorial fashion photography captured in studio with warm amber key lighting and deep violet fill.",
      ro: "Fotografie de mod\u0103 editorial\u0103 cu contrast ridicat realizat\u0103 \xEEn studio cu iluminare cald\u0103 \u0219i reflexii violet.",
      hu: "Nagy kontraszt\xFA szerkeszt\u0151s\xE9gi divatfot\xF3 st\xFAdi\xF3ban, meleg arany f\xE9nyekkel \xE9s lila h\xE1tt\xE9r\xE1rnyalatokkal."
    },
    exif: {
      camera: "Nikon Z8",
      lens: "NIKKOR Z 85mm f/1.2 S",
      aperture: "f/1.4",
      shutterSpeed: "1/250s",
      iso: "ISO 64",
      focalLength: "85mm",
      location: "Fashion Studio, Odorheiu Secuiesc"
    },
    date: "2026-02-22",
    featured: true,
    tags: ["Fashion", "Editorial", "Studio", "Lighting", "High-End"]
  },
  {
    id: "photo-1",
    albumId: "nature",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Winter Cross at Sunset",
      ro: "Cruce de Iarn\u0103 la Apus",
      hu: "T\xE9li Kereszt Naplementekor"
    },
    description: {
      en: "Snowy mountain ridge with a carved wooden cross illuminated by golden evening sun rays.",
      ro: "Creast\u0103 montan\u0103 \xEEnz\u0103pezit\u0103 cu o cruce sculptat\u0103 de lemn luminat\u0103 de apus.",
      hu: "Havas hegyi gerinc faragott fa kereszttel az aranyl\xF3 esti napf\xE9nyben."
    },
    exif: {
      camera: "Nikon D850",
      lens: "AF-S NIKKOR 24-120mm f/4G ED VR",
      aperture: "f/8.0",
      shutterSpeed: "1/500s",
      iso: "ISO 200",
      focalLength: "24mm",
      location: "Bucegi Mountains, Romania"
    },
    date: "2026-01-12",
    featured: true,
    tags: ["Mountains", "Winter", "Snow", "Sunset", "Landscapes"]
  },
  {
    id: "photo-2",
    albumId: "nature",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Swans & Birds in Flight",
      ro: "Lebede \u0219i P\u0103s\u0103ri \xEEn Zbor",
      hu: "Hatty\xFAk \xE9s Madarak Sz\xE1rnyal\xE1sa"
    },
    description: {
      en: "Silhouetted flock of birds taking flight over serene waters as swans gather along the shore.",
      ro: "C\xE2rd de p\u0103s\u0103ri \xEEn zbor peste ape lini\u0219tite \xEEn timp ce lebedele se str\xE2ng la mal.",
      hu: "Mad\xE1rraj sz\xE1rnyal\xE1sa a t\xF3 felett, m\xEDg hatty\xFAk gy\xFClekeznek a v\xEDzparton."
    },
    exif: {
      camera: "Nikon D750",
      lens: "70-200mm f/2.8",
      aperture: "f/5.6",
      shutterSpeed: "1/1250s",
      iso: "ISO 400",
      focalLength: "135mm",
      location: "Hyde Park Lake, UK"
    },
    date: "2026-01-18",
    featured: true,
    tags: ["Birds", "Swans", "Lake", "Wildlife", "Silhouettes"]
  },
  {
    id: "photo-3",
    albumId: "family",
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Joy of Motherhood",
      ro: "Bucuria Maternit\u0103\u021Bii",
      hu: "A M anyas\xE1g \xD6r\xF6me"
    },
    description: {
      en: "A tender moment holding baby up high in warm indoor light framed by the word DREAM.",
      ro: "Un moment tandru ridic\xE2nd bebelu\u0219ul \xEEn lumin\u0103 cald\u0103 de interior.",
      hu: "Meghitt pillanat a kisbab\xE1t magasba emelve a meleg belt\xE9ri f\xE9nyben."
    },
    exif: {
      camera: "Nikon D750",
      lens: "50mm f/1.8G",
      aperture: "f/2.2",
      shutterSpeed: "1/200s",
      iso: "ISO 640",
      focalLength: "50mm",
      location: "Odorheiu Secuiesc Studio"
    },
    date: "2026-02-02",
    featured: true,
    tags: ["Family", "Baby", "Motherhood", "Indoor", "Love"]
  },
  {
    id: "photo-4",
    albumId: "action",
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Forest Challenge Grit",
      ro: "Perseveren\u021B\u0103 \xEEn P\u0103dure",
      hu: "K\xFCzdelem az Erd\u0151ben"
    },
    description: {
      en: "Young athlete smiling with determination while carrying a heavy bucket through pine woods.",
      ro: "T\xE2n\u0103r\u0103 atlet\u0103 z\xE2mbind cu determinare \xEEn timp ce transport\u0103 o g\u0103leat\u0103 grea prin p\u0103dure.",
      hu: "Fiatal sportol\xF3 mosolyogva halad a fenyvesben a neh\xE9z v\xF6d\xF6rrel."
    },
    exif: {
      camera: "Nikon D850",
      lens: "24-70mm f/2.8",
      aperture: "f/3.2",
      shutterSpeed: "1/800s",
      iso: "ISO 500",
      focalLength: "60mm",
      location: "Harghita Mountain Trails"
    },
    date: "2026-02-05",
    featured: false,
    tags: ["Spartan", "Fitness", "Forest", "Strength", "Action"]
  },
  {
    id: "photo-5",
    albumId: "action",
    src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "One-Arm Handstand Balance",
      ro: "Echilibru pe o M\xE2n\u0103",
      hu: "Egykaros K\xE9zen\xE1ll\xE1s"
    },
    description: {
      en: "Mastery of body control showcased in a one-arm handstand in an outdoor athletic park.",
      ro: "M\u0103iestrie \xEEn controlul corpului demonstrat \xEEntr-un stand pe o m\xE2n\u0103 \xEEn parc.",
      hu: "A test feletti t\xF6k\xE9letes uralom egykaros k\xE9zen\xE1ll\xE1sban a szabadt\xE9ri edz\u0151parkban."
    },
    exif: {
      camera: "Nikon D850",
      lens: "35mm f/1.4G",
      aperture: "f/2.8",
      shutterSpeed: "1/1000s",
      iso: "ISO 320",
      focalLength: "35mm",
      location: "Central Park Athletics"
    },
    date: "2026-02-08",
    featured: true,
    tags: ["Calisthenics", "Balance", "Fitness", "Strength", "Urban"]
  },
  {
    id: "photo-6",
    albumId: "family",
    src: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Superhero Bond",
      ro: "Leg\u0103tura Supereroilor",
      hu: "Szuperh\u0151s K\xF6tel\xE9k"
    },
    description: {
      en: "Playful costume session with a Wonder Woman mother embracing her Superman baby.",
      ro: "\u0218edin\u021B\u0103 foto de poveste cu mam\u0103 Wonder Woman \u0219i bebelu\u0219 Superman.",
      hu: "J\xE1t\xE9kos koszt\xFCm\xF6s fot\xF3z\xE1s: Wonder Woman \xE9desanya \xE9s Superman kisbab\xE1ja."
    },
    exif: {
      camera: "Nikon D750",
      lens: "50mm f/1.8",
      aperture: "f/2.8",
      shutterSpeed: "1/250s",
      iso: "ISO 400",
      focalLength: "50mm"
    },
    date: "2026-02-12",
    featured: false,
    tags: ["Family", "Playful", "Costumes", "Children", "Joy"]
  },
  {
    id: "photo-7",
    albumId: "portraits",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Autumn City Elegance",
      ro: "Elegan\u021B\u0103 Urban\u0103 de Toamn\u0103",
      hu: "\u0150szi V\xE1rosi Elegancia"
    },
    description: {
      en: "Smiling portrait leaning against a rich brick wall along an autumn residential avenue.",
      ro: "Portret z\xE2mbitor sprijinit de un zid de c\u0103r\u0103mid\u0103 pe o strad\u0103 de toamn\u0103.",
      hu: "Mosolyg\xF3s portr\xE9 egy t\xE9glafalnak t\xE1maszkodva a hangulatos \u0151szi utc\xE1n."
    },
    exif: {
      camera: "Nikon D850",
      lens: "85mm f/1.4G",
      aperture: "f/2.0",
      shutterSpeed: "1/640s",
      iso: "ISO 100",
      focalLength: "85mm",
      location: "London Street Portrait"
    },
    date: "2026-01-20",
    featured: true,
    tags: ["Portrait", "Autumn", "Fashion", "Smile", "Urban"]
  },
  {
    id: "photo-8",
    albumId: "action",
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Stadium Sprint Motion",
      ro: "Sprint de Stadion",
      hu: "Stadion Sprint"
    },
    description: {
      en: "Dynamic motion blur capture of an athlete in mid-stride during a stadium race.",
      ro: "Captur\u0103 dinamic\u0103 cu estompare de mi\u0219care a unui atlet \xEEn plin sprint pe stadion.",
      hu: "Dinamikus mozg\xE1si elmos\xF3d\xE1s egy sprinterr\u0151l a stadion fut\xF3p\xE1ly\xE1j\xE1n."
    },
    exif: {
      camera: "Nikon D850",
      lens: "70-200mm f/2.8",
      aperture: "f/4.0",
      shutterSpeed: "1/160s",
      iso: "ISO 800",
      focalLength: "120mm"
    },
    date: "2026-01-25",
    featured: false,
    tags: ["Runner", "Sprint", "Motion", "Stadium", "Athletic"]
  },
  {
    id: "photo-9",
    albumId: "family",
    src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Grandfather Lift",
      ro: "Ridicarea Bunicului",
      hu: "A Nagypapa \xD6lel\xE9se"
    },
    description: {
      en: "Heartwarming generation connection as a grandfather holds his laughing toddler high.",
      ro: "Conexiune emo\u021Bionant\u0103 \xEEntre genera\u021Bii c\xE2nd bunicul \xEE\u0219i ridic\u0103 nepo\u021Bica r\xE2z\xE2nd.",
      hu: "Meghat\xF3 gener\xE1ci\xF3s k\xF6tel\xE9k: a nagypapa magasba emeli nevet\u0151 unok\xE1j\xE1t."
    },
    exif: {
      camera: "Nikon D750",
      lens: "35mm f/1.8",
      aperture: "f/2.5",
      shutterSpeed: "1/320s",
      iso: "ISO 400",
      focalLength: "35mm"
    },
    date: "2026-02-03",
    featured: false,
    tags: ["Generations", "Grandfather", "Laughter", "Family"]
  },
  {
    id: "photo-10",
    albumId: "events",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Carnival Headdress Splendor",
      ro: "Splendoarea Coifului de Carnaval",
      hu: "Karnev\xE1li D\xEDszf\xE9ny"
    },
    description: {
      en: "Intricate feathered and jeweled headpiece portrait at the vibrant street carnival.",
      ro: "Portret cu ornament spectaculos din pene la un carnaval stradal plin de via\u021B\u0103.",
      hu: "L\xE1tv\xE1nyos tollas fejdiszbe \xF6lt\xF6z\xF6tt el\u0151ad\xF3 a ny\xFCzsg\u0151 utcai karnev\xE1lon."
    },
    exif: {
      camera: "Nikon D850",
      lens: "85mm f/1.8G",
      aperture: "f/2.2",
      shutterSpeed: "1/500s",
      iso: "ISO 250",
      focalLength: "85mm",
      location: "Notting Hill Carnival"
    },
    date: "2026-02-14",
    featured: true,
    tags: ["Carnival", "Culture", "Feathers", "Color", "Event"]
  },
  {
    id: "photo-11",
    albumId: "nature",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Sunset Step Stones",
      ro: "Pa\u0219i pe Apus de Soare",
      hu: "L\xE9ptek a Naplement\xE9ben"
    },
    description: {
      en: "Silhouetted couple playfully jumping along wooden tide posts into the vibrant sunset water.",
      ro: "Cuplu juc\u0103u\u0219 s\u0103rind pe piloni de lemn \xEEn apa luminat\u0103 de un apus vibrant.",
      hu: "J\xE1t\xE9kos p\xE1r l\xE9pked a fa c\xF6l\xF6p\xF6k\xF6n a tengerparti naplemente ragyog\xE1s\xE1ban."
    },
    exif: {
      camera: "Nikon D850",
      lens: "24-70mm f/2.8",
      aperture: "f/5.6",
      shutterSpeed: "1/1000s",
      iso: "ISO 160",
      focalLength: "45mm",
      location: "North Sea Coast"
    },
    date: "2026-02-18",
    featured: true,
    tags: ["Sunset", "Ocean", "Couple", "Silhouettes", "Beach"]
  },
  {
    id: "photo-12",
    albumId: "nature",
    src: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Safari Roof Guests",
      ro: "Oaspe\u021Bi pe Plafonul Safari",
      hu: "Szafari Vend\xE9gek az Aut\xF3tet\u0151n"
    },
    description: {
      en: "Curious baboons resting on a safari car roof against a bright cloudy sky.",
      ro: "Babuin curios odihnindu-se pe plafonul ma\u0219inii \xEEn timpul unui safari.",
      hu: "K\xEDv\xE1ncsi pav\xE1nok pihennek a szafari aut\xF3 tetej\xE9n a felh\u0151s \xE9gbolt alatt."
    },
    exif: {
      camera: "Nikon D750",
      lens: "70-200mm f/4G",
      aperture: "f/6.3",
      shutterSpeed: "1/800s",
      iso: "ISO 320",
      focalLength: "150mm",
      location: "Knowsley Safari"
    },
    date: "2026-02-20",
    featured: false,
    tags: ["Wildlife", "Animals", "Baboons", "Safari"]
  },
  {
    id: "photo-13",
    albumId: "portraits",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Vivacious Pink Portrait",
      ro: "Portret \xEEn Roz Vibrant",
      hu: "Vibr\xE1l\xF3 R\xF3zsasz\xEDn Portr\xE9"
    },
    description: {
      en: "Radiant smile and natural flowing hair framed against soft urban background light.",
      ro: "Z\xE2mbet radiant \u0219i p\u0103r ondulat natural \xEEncadrat de lumin\u0103 urban\u0103 fin\u0103.",
      hu: "Ragyog\xF3 mosoly \xE9s l\xE1gyan hull\xE1mz\xF3 haj a finom v\xE1rosi h\xE1tt\xE9rf\xE9nyben."
    },
    exif: {
      camera: "Nikon D850",
      lens: "85mm f/1.4G",
      aperture: "f/1.8",
      shutterSpeed: "1/500s",
      iso: "ISO 100",
      focalLength: "85mm"
    },
    date: "2026-02-22",
    featured: true,
    tags: ["Portrait", "Smile", "Natural Light", "Expression"]
  },
  {
    id: "photo-14",
    albumId: "family",
    src: "https://images.unsplash.com/photo-1506836467174-27f1042aa48c?auto=format&fit=crop&w=1600&q=85",
    title: {
      en: "Castle Grounds Family Walk",
      ro: "Plimbare de Familie la Castel",
      hu: "Csal\xE1di S\xE9ta a Kast\xE9lykertben"
    },
    description: {
      en: "A family posing happily in front of a white fairytale castle tower.",
      ro: "O familie poz\xE2nd fericit\u0103 \xEEn fa\u021Ba unui turn alb de castel din pove\u0219ti.",
      hu: "Csal\xE1di portr\xE9 a mesei feh\xE9r kast\xE9lytorony l\xE1b\xE1n\xE1l a naps\xFCt\xE9ses kertben."
    },
    exif: {
      camera: "Nikon D850",
      lens: "24-70mm f/2.8",
      aperture: "f/4.0",
      shutterSpeed: "1/640s",
      iso: "ISO 200",
      focalLength: "35mm",
      location: "Lichtenstein Grounds"
    },
    date: "2026-02-25",
    featured: true,
    tags: ["Family", "Castle", "Children", "Travel"]
  }
];
export const DEFAULT_TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_gallery: "Gallery & Albums",
    nav_about: "About JB Szende",
    nav_feedback: "Client Reviews",
    nav_contact: "Book a Session",
    nav_cms: "CMS & Translations",
    select_language: "Select Language",
    location_header: "Odorheiu Secuiesc, Harghita",
    hero_badge: "Portfolio & Fine Art Photography",
    hero_cta_gallery: "Explore Portfolio",
    hero_cta_contact: "Book Session",
    hero_stat_exp: "Years Exp",
    hero_stat_photos: "Master Shots",
    hero_stat_albums: "Photo Albums",
    hero_stat_satisfaction: "Client Smiles",
    about_badge: "About Photographer",
    about_title: "Framing Life's Purest Light & Unspoken Stories",
    about_role: "Photographer",
    about_feature1_title: "Cinematic Quality",
    about_feature1_desc: "High-resolution prime lenses and calibrated sensor profiles delivering fine art clarity.",
    about_feature2_title: "Authentic Connection",
    about_feature2_desc: "Creating relaxed, unprompted environments where raw family and portrait emotion shines.",
    about_feature3_title: "Tailored Direction",
    about_feature3_desc: "Personalized concept planning for outdoor adventure, studio lighting, or cultural events.",
    about_feature4_title: "Full Rights Delivery",
    about_feature4_desc: "Private digital galleries with full-resolution downloads and print licensing included.",
    gallery_title: "Photography Portfolio",
    gallery_subtitle: "Explore curated albums, individual shots, and timeless collections.",
    gallery_all_photos: "Photos",
    gallery_albums: "Albums",
    gallery_add_photo: "Add Photo",
    gallery_add_album: "Create New Album",
    gallery_search_placeholder: "Search by title, location, camera, or tags...",
    gallery_filter_all: "All Work",
    gallery_clear_search: "Clear",
    gallery_live_notice: "All added photos appear live in this gallery.",
    gallery_no_photos: "No photographs found matching your criteria.",
    gallery_view_photos: "View Photos",
    gallery_photo_count: "photos",
    feedback_badge: "Client Experiences & Reviews",
    feedback_title: "Client Words & Feedback",
    feedback_subtitle: "Authentic stories and reviews from photo sessions across Harghita, Transylvania, and abroad.",
    feedback_btn_leave: "Leave a Feedback",
    feedback_btn_close: "Close Review Form",
    feedback_share_title: "Share Your Experience",
    feedback_submitted_title: "Thank You for Your Feedback!",
    feedback_submitted_desc: "Your review has been saved and published live on the gallery.",
    feedback_your_name: "Your Name",
    feedback_session_type: "Session Type",
    feedback_rating: "Rating",
    feedback_stars: "Stars",
    feedback_your_review: "Your Feedback / Review",
    feedback_cancel: "Cancel",
    feedback_submit: "Submit Feedback",
    album_modal_title: "Album Details",
    album_create_title: "Create New Album",
    album_modal_subtitle: "Organize your photography collection across English, Romanian, and Hungarian.",
    album_name_label: "Album Name (English)",
    album_name_ro_label: "Album Name (Romanian)",
    album_name_hu_label: "Album Name (Hungarian)",
    album_desc_label: "Description (English)",
    album_cover_label: "Cover Image URL",
    album_save_btn: "Save Album",
    album_cancel: "Cancel",
    lightbox_details: "Technical Details & EXIF",
    lightbox_camera: "Camera",
    lightbox_lens: "Lens",
    lightbox_settings: "Settings",
    lightbox_location: "Location",
    lightbox_date: "Date",
    lightbox_download: "Download High-Res",
    lightbox_share: "Share Photo",
    lightbox_link_copied: "Link Copied!",
    lightbox_hide_details: "Hide Details",
    lightbox_view_exif: "View EXIF",
    contact_title: "Get In Touch & Bookings",
    contact_subtitle: "Interested in portraits, family sessions, or event photography? Send a direct inquiry below.",
    contact_guarantee_title: "Response Guarantee",
    contact_guarantee_desc: "All booking messages receive a response within 24 hours with package details and availability calendar.",
    contact_inquiry_received: "Inquiry Received!",
    contact_direct_email: "Direct Email",
    contact_phone_whatsapp: "Phone & WhatsApp",
    contact_location_label: "Location",
    contact_name: "Your Full Name",
    contact_email: "Email Address",
    contact_phone: "Phone Number",
    contact_event_type: "Session Type",
    contact_date: "Preferred Date",
    contact_message: "Tell me about your session ideas...",
    contact_send: "Send Inquiry",
    contact_success: "Thank you! Your message has been sent to JB Szende Photography.",
    type_portrait: "Portrait & Headshots",
    type_family: "Family & Newborn",
    type_action: "Action & Fitness",
    type_event: "Events & Celebrations",
    type_nature: "Nature & Landscape",
    photo_modal_title: "Upload / Add New Picture",
    photo_modal_subtitle: "Add a new photograph to JB Szende Photography gallery.",
    photo_success_msg: "Success! Photograph added to portfolio. Updating gallery view...",
    photo_step_image: "1. Photo Image File or Web URL",
    photo_choose_file: "Choose Image File",
    photo_or_url: "Or paste direct image URL (https://...)",
    photo_title_label: "Photo Title",
    photo_assign_album: "Assign to Album",
    photo_desc_label: "Description",
    photo_camera_label: "Camera Model",
    photo_lens_label: "Lens",
    photo_location_label: "Location",
    photo_tags_label: "Tags (comma separated)",
    photo_add_btn: "Add Photograph",
    cms_title: "CMS & Multi-Language Dashboard",
    cms_subtitle: "Manage site text, English/Romanian/Hungarian translations, albums, and SEO-friendly links.",
    cms_tab_translations: "Translations",
    cms_tab_albums: "Album Manager",
    cms_tab_photos: "Photo Manager",
    cms_tab_settings: "Site Content & SEO",
    cms_add_translation_key: "Add Translation Key",
    cms_rtl_toggle: "RTL Mode Preview (Right to Left)",
    cms_key_header: "Key / String Identifier",
    cms_save_all: "Save Changes",
    cms_reset: "Reset to Defaults",
    cms_add_photo: "Upload / Add Photo",
    footer_tagline: "Capturing timeless moments, family stories, and raw landscapes across Odorheiu Secuiesc, Harghita, and Europe.",
    footer_back_to_top: "Back to Top",
    footer_copyright: "\xA9 2026 SwenTech. All rights reserved.",
    footer_created_by: "Created by SwenTech",
    footer_seo_urls: "SEO Language Links"
  },
  ro: {
    nav_home: "Acas\u0103",
    nav_gallery: "Galerie \u0219i Albume",
    nav_about: "Despre JB Szende",
    nav_feedback: "Recenzii Clien\u021Bi",
    nav_contact: "Rezerv\u0103 o \u0218edin\u021B\u0103",
    nav_cms: "CMS & Traduceri",
    select_language: "Selecteaz\u0103 Limba",
    location_header: "Odorheiu Secuiesc, Harghita",
    hero_badge: "Portofoliu \u0219i Fotografie M\u0103iestrit\u0103",
    hero_cta_gallery: "Exploreaz\u0103 Portofoliul",
    hero_cta_contact: "Rezerv\u0103 \u0218edin\u021B\u0103",
    hero_stat_exp: "Ani de Experien\u021B\u0103",
    hero_stat_photos: "Cadre Principale",
    hero_stat_albums: "Albume Foto",
    hero_stat_satisfaction: "Satisfac\u021Bie Clien\u021Bi",
    about_badge: "Despre Fotograf",
    about_title: "Captur\xE2nd lumina pur\u0103 a vie\u021Bii \u0219i pove\u0219ti nespuse",
    about_role: "Fotograf",
    about_feature1_title: "Calitate Cinematografic\u0103",
    about_feature1_desc: "Obiective de \xEEnalt\u0103 rezolu\u021Bie \u0219i senzori calibra\u021Bi pentru o claritate de excep\u021Bie.",
    about_feature2_title: "Conexiune Autentic\u0103",
    about_feature2_desc: "Crearea unui mediu relaxat \xEEn care emo\u021Bia natural\u0103 de familie \u0219i portret str\u0103luce\u0219te.",
    about_feature3_title: "Orientare Personalizat\u0103",
    about_feature3_desc: "Planificare conceptual\u0103 personalizat\u0103 pentru aventuri \xEEn aer liber, studio sau evenimente.",
    about_feature4_title: "Livrare cu Drepturi Depline",
    about_feature4_desc: "Galerii digitale private cu desc\u0103rcare la rezolu\u021Bie maxim\u0103 \u0219i licen\u021B\u0103 de imprimare.",
    gallery_title: "Portofoliu Fotografic",
    gallery_subtitle: "Exploreaz\u0103 albume tematice, cadre individuale \u0219i colec\u021Bii atemporale.",
    gallery_all_photos: "Fotografii",
    gallery_albums: "Albume",
    gallery_add_photo: "Adaug\u0103 Fotografie",
    gallery_add_album: "Creeaz\u0103 Album Nou",
    gallery_search_placeholder: "Caut\u0103 dup\u0103 titlu, loca\u021Bie, aparat sau etichete...",
    gallery_filter_all: "Toate Lucr\u0103rile",
    gallery_clear_search: "\u0218terge",
    gallery_live_notice: "Toate fotografiile ad\u0103ugate apar \xEEn direct \xEEn galerie.",
    gallery_no_photos: "Nu s-au g\u0103sit fotografii care s\u0103 corespund\u0103 criteriilor.",
    gallery_view_photos: "Vezi Fotografii",
    gallery_photo_count: "fotografii",
    feedback_badge: "Experien\u021Be & Recenzii Clien\u021Bi",
    feedback_title: "G\xE2ndurile Clien\u021Bilor \u0219i Recenzii",
    feedback_subtitle: "Pove\u0219ti reale \u0219i recenzii de la \u0219edin\u021Bele foto din Hargita, Transilvania \u0219i din str\u0103in\u0103tate.",
    feedback_btn_leave: "Las\u0103 o Recenzie",
    feedback_btn_close: "\xCEnchide Formularul",
    feedback_share_title: "\xCEmp\u0103rt\u0103\u0219e\u0219te Experien\u021Ba Ta",
    feedback_submitted_title: "V\u0103 mul\u021Bumim pentru recenzie!",
    feedback_submitted_desc: "Recenzia dumneavoastr\u0103 a fost salvat\u0103 \u0219i publicat\u0103 \xEEn galerie.",
    feedback_your_name: "Numele T\u0103u",
    feedback_session_type: "Tipul \u0218edin\u021Bei",
    feedback_rating: "Evaluare",
    feedback_stars: "Stele",
    feedback_your_review: "Recenzia Ta",
    feedback_cancel: "Anuleaz\u0103",
    feedback_submit: "Trimite Recenzia",
    album_modal_title: "Detalii Album",
    album_create_title: "Creeaz\u0103 Album Nou",
    album_modal_subtitle: "Organizeaz\u0103 colec\u021Bia ta foto \xEEn englez\u0103, rom\xE2n\u0103 \u0219i maghiar\u0103.",
    album_name_label: "Nume Album (Englez\u0103)",
    album_name_ro_label: "Nume Album (Rom\xE2n\u0103)",
    album_name_hu_label: "Nume Album (Maghiar\u0103)",
    album_desc_label: "Descriere (Englez\u0103)",
    album_cover_label: "URL Imagine Copert\u0103",
    album_save_btn: "Salveaz\u0103 Albumul",
    album_cancel: "Anuleaz\u0103",
    lightbox_details: "Detalii Tehnice \u0219i EXIF",
    lightbox_camera: "Aparat Foto",
    lightbox_lens: "Obiectiv",
    lightbox_settings: "Set\u0103ri",
    lightbox_location: "Loca\u021Bie",
    lightbox_date: "Data",
    lightbox_download: "Descarc\u0103 Rezolu\u021Bie Mare",
    lightbox_share: "Distribuie Fotografia",
    lightbox_link_copied: "Link Copiat!",
    lightbox_hide_details: "Ascunde Detaliile",
    lightbox_view_exif: "Vezi EXIF",
    contact_title: "Contact \u0219i Rezerv\u0103ri",
    contact_subtitle: "Dori\u021Bi o \u0219edin\u021B\u0103 foto de portret, familie sau acoperire de eveniment? Trimite\u021Bi un mesaj direct.",
    contact_guarantee_title: "Garan\u021Bia R\u0103spunsului",
    contact_guarantee_desc: "Toate mesajele primite primesc un r\u0103spuns \xEEn termen de 24 de ore cu detalii \u0219i pachete foto.",
    contact_inquiry_received: "Mesaj Primit!",
    contact_direct_email: "Email Direct",
    contact_phone_whatsapp: "Telefon & WhatsApp",
    contact_location_label: "Loca\u021Bie",
    contact_name: "Numele Dumneavoastr\u0103",
    contact_email: "Adres\u0103 de Email",
    contact_phone: "Num\u0103r de Telefon",
    contact_event_type: "Tipul \u0218edin\u021Bei",
    contact_date: "Data Preferat\u0103",
    contact_message: "Descrie\u021Bi ideile dumneavoastr\u0103...",
    contact_send: "Trimite Mesajul",
    contact_success: "V\u0103 mul\u021Bumim! Mesajul a fost trimis c\u0103tre JB Szende Photography.",
    type_portrait: "Portret & Headshot",
    type_family: "Familie & Nou-n\u0103scu\u021Bi",
    type_action: "Ac\u021Biune & Sport",
    type_event: "Evenimente & Celebr\u0103ri",
    type_nature: "Natur\u0103 & Peisaj",
    photo_modal_title: "Adaug\u0103 o Fotografie Nou\u0103",
    photo_modal_subtitle: "Adaug\u0103 o fotografie nou\u0103 \xEEn galeria JB Szende Photography.",
    photo_success_msg: "Succes! Fotografia a fost ad\u0103ugat\u0103 \xEEn portofoliu. Se actualizeaz\u0103 galeria...",
    photo_step_image: "1. Fi\u0219ier Imagine sau URL Web",
    photo_choose_file: "Alege Fi\u0219ier Imagine",
    photo_or_url: "Sau lipi\u021Bi URL-ul imaginii (https://...)",
    photo_title_label: "Titlu Fotografie",
    photo_assign_album: "Atribuie Albumului",
    photo_desc_label: "Descriere",
    photo_camera_label: "Model Aparat",
    photo_lens_label: "Obiectiv",
    photo_location_label: "Loca\u021Bie",
    photo_tags_label: "Etichete (separate prin virgul\u0103)",
    photo_add_btn: "Adaug\u0103 Fotografia",
    cms_title: "Panou CMS & Traduceri Multilingve",
    cms_subtitle: "Administra\u021Bi textele, traducerile \xEEn Englez\u0103/Rom\xE2n\u0103/Maghiar\u0103, albumele \u0219i linkurile SEO.",
    cms_tab_translations: "Traduceri",
    cms_tab_albums: "Manager Albume",
    cms_tab_photos: "Manager Fotografii",
    cms_tab_settings: "Con\u021Binut Site & SEO",
    cms_add_translation_key: "Adaug\u0103 Cheie de Traducere",
    cms_rtl_toggle: "Previzualizare Mod RTL (Dreapta la St\xE2nga)",
    cms_key_header: "Identificator Cheie",
    cms_save_all: "Salveaz\u0103 Modific\u0103rile",
    cms_reset: "Reseteaz\u0103 la Set\u0103rile Ini\u021Biale",
    cms_add_photo: "Adaug\u0103 Fotografie",
    footer_tagline: "Captur\xE2nd momente atemporale, pove\u0219ti de familie \u0219i peisaje spectaculoase din Odorheiu Secuiesc, Hargita \u0219i Europa.",
    footer_back_to_top: "\xCEnapoi Sus",
    footer_copyright: "\xA9 2026 SwenTech. Toate drepturile rezervate.",
    footer_created_by: "Creat de SwenTech",
    footer_seo_urls: "Linkuri Limbi SEO"
  },
  hu: {
    nav_home: "F\u0151oldal",
    nav_gallery: "Gal\xE9ria \xE9s Albumok",
    nav_about: "JB Szende-r\u0151l",
    nav_feedback: "\xDCgyf\xE9l V\xE9lem\xE9nyek",
    nav_contact: "Id\u0151pontfoglal\xE1s",
    nav_cms: "CMS \xE9s Ford\xEDt\xE1sok",
    select_language: "Nyelv V\xE1laszt\xE1sa",
    location_header: "Sz\xE9kelyudvarhely, Hargita",
    hero_badge: "Portf\xF3li\xF3 \xE9s M\u0171v\xE9szi Fot\xF3z\xE1s",
    hero_cta_gallery: "Portf\xF3li\xF3 Felfedez\xE9se",
    hero_cta_contact: "Id\u0151pontfoglal\xE1s",
    hero_stat_exp: "\xC9v Tapasztalat",
    hero_stat_photos: "Mesterk\xE9pek",
    hero_stat_albums: "Fot\xF3albumok",
    hero_stat_satisfaction: "\xDCgyf\xE9lel\xE9gedetts\xE9g",
    about_badge: "A Fot\xF3sr\xF3l",
    about_title: "A \xE9let tiszta f\xE9ny\xE9nek \xE9s el nem mondott t\xF6rt\xE9neteinek meg\xF6r\xF6k\xEDt\xE9se",
    about_role: "Fot\xF3s",
    about_feature1_title: "M\u0171v\xE9szi Min\u0151s\xE9g",
    about_feature1_desc: "Nagy felbont\xE1s\xFA fix objekt\xEDvek \xE9s kalibr\xE1lt szenzorok a m\u0171v\xE9szi tisztas\xE1g\xE9rt.",
    about_feature2_title: "Autentikus Kapcsolat",
    about_feature2_desc: "K\xF6tetlen, term\xE9szetes l\xE9gk\xF6r megteremt\xE9se a csal\xE1di \xE9s portr\xE9 pillanatokhoz.",
    about_feature3_title: "Szem\xE9lyre Szabott Tervez\xE9s",
    about_feature3_desc: "Egy\xE9ni koncepci\xF3tervez\xE9s szabadt\xE9ri fot\xF3z\xE1shoz, st\xFAdi\xF3hoz vagy rendezv\xE9nyekhez.",
    about_feature4_title: "Teljes Jog\xFA \xC1tad\xE1s",
    about_feature4_desc: "Priv\xE1t digit\xE1lis gal\xE9ri\xE1k teljes felbont\xE1s\xFA let\xF6lt\xE9ssel \xE9s nyomtat\xE1si enged\xE9llyel.",
    gallery_title: "Fotogr\xE1fiai Portf\xF3li\xF3",
    gallery_subtitle: "B\xF6ng\xE9sszen a t\xE9m\xE1k szerint rendezett albumok, egyedi k\xE9pek \xE9s gy\u0171jtem\xE9nyek k\xF6z\xF6tt.",
    gallery_all_photos: "Fot\xF3k",
    gallery_albums: "Albumok",
    gallery_add_photo: "Fot\xF3 Hozz\xE1ad\xE1sa",
    gallery_add_album: "\xDAj Album L\xE9trehoz\xE1sa",
    gallery_search_placeholder: "Keres\xE9s c\xEDm, helysz\xEDn, kamera vagy c\xEDmke alapj\xE1n...",
    gallery_filter_all: "Minden Munk\xE1m",
    gallery_clear_search: "T\xF6rl\xE9s",
    gallery_live_notice: "Minden hozz\xE1adott fot\xF3 azonnal megjelenik a gal\xE9ri\xE1ban.",
    gallery_no_photos: "Nem tal\xE1lhat\xF3 a keres\xE9si felt\xE9teleknek megfelel\u0151 fot\xF3.",
    gallery_view_photos: "Fot\xF3k Megtekint\xE9se",
    gallery_photo_count: "k\xE9p",
    feedback_badge: "\xDCgyf\xE9l\xE9lm\xE9nyek \xE9s V\xE9lem\xE9nyek",
    feedback_title: "\xDCgyfeleink V\xE9lem\xE9nye",
    feedback_subtitle: "Hiteles t\xF6rt\xE9netek \xE9s \xE9rt\xE9kel\xE9sek sz\xE9kelyf\xF6ldi \xE9s k\xFClf\xF6ldi fot\xF3z\xE1sokr\xF3l.",
    feedback_btn_leave: "V\xE9lem\xE9ny \xCDr\xE1sa",
    feedback_btn_close: "\u0170rlap Bez\xE1r\xE1sa",
    feedback_share_title: "Oszd Meg a Tapasztalatodat",
    feedback_submitted_title: "K\xF6sz\xF6nj\xFCk az \xC9rt\xE9kel\xE9st!",
    feedback_submitted_desc: "\xC9rt\xE9kel\xE9s\xE9t elmentett\xFCk \xE9s megjelentett\xFCk a gal\xE9ri\xE1ban.",
    feedback_your_name: "Az \xD6n Neve",
    feedback_session_type: "Fot\xF3z\xE1s T\xEDpusa",
    feedback_rating: "\xC9rt\xE9kel\xE9s",
    feedback_stars: "Csillag",
    feedback_your_review: "Az \xD6n \xC9rt\xE9kel\xE9se",
    feedback_cancel: "M\xE9gse",
    feedback_submit: "V\xE9lem\xE9ny Bek\xFCld\xE9se",
    album_modal_title: "Album R\xE9szletei",
    album_create_title: "\xDAj Album L\xE9trehoz\xE1sa",
    album_modal_subtitle: "Rendszerezze fot\xF3gy\u0171jtem\xE9ny\xE9t angol, rom\xE1n \xE9s magyar nyelven.",
    album_name_label: "Album Neve (Angol)",
    album_name_ro_label: "Album Neve (Rom\xE1n)",
    album_name_hu_label: "Album Neve (Magyar)",
    album_desc_label: "Le\xEDr\xE1s (Angol)",
    album_cover_label: "Bor\xEDt\xF3k\xE9p URL",
    album_save_btn: "Album Ment\xE9se",
    album_cancel: "M\xE9gse",
    lightbox_details: "Technikai R\xE9szletek \xE9s EXIF",
    lightbox_camera: "Kamera",
    lightbox_lens: "Objekt\xEDv",
    lightbox_settings: "Be\xE1ll\xEDt\xE1sok",
    lightbox_location: "Helysz\xEDn",
    lightbox_date: "D\xE1tum",
    lightbox_download: "Nagy Felbont\xE1s Let\xF6lt\xE9se",
    lightbox_share: "K\xE9p Megoszt\xE1sa",
    lightbox_link_copied: "Hivatkoz\xE1s M\xE1solva!",
    lightbox_hide_details: "R\xE9szletek Elrejt\xE9se",
    lightbox_view_exif: "EXIF Megtekint\xE9se",
    contact_title: "Kapcsolat \xE9s Foglal\xE1s",
    contact_subtitle: "Portr\xE9, csal\xE1di fot\xF3z\xE1s vagy rendezv\xE9nyfot\xF3z\xE1s ir\xE1nt \xE9rdekl\u0151dik? K\xFCldj\xF6n \xFCzenetet!",
    contact_guarantee_title: "V\xE1laszad\xE1si Garancia",
    contact_guarantee_desc: "Minden megkeres\xE9sre 24 \xF3r\xE1n bel\xFCl v\xE1laszolunk a r\xE9szletekkel \xE9s szabad id\u0151pontokkal.",
    contact_inquiry_received: "Megkeres\xE9s \xC9rkezett!",
    contact_direct_email: "K\xF6zvetlen E-mail",
    contact_phone_whatsapp: "Telefon \xE9s WhatsApp",
    contact_location_label: "Helysz\xEDn",
    contact_name: "Teljes N\xE9v",
    contact_email: "E-mail C\xEDm",
    contact_phone: "Telefonsz\xE1m",
    contact_event_type: "Fot\xF3z\xE1s T\xEDpusa",
    contact_date: "K\xEDv\xE1nt D\xE1tum",
    contact_message: "Milyen fot\xF3z\xE1si elk\xE9pzel\xE9se van?...",
    contact_send: "\xDCzenet K\xFCld\xE9se",
    contact_success: "K\xF6sz\xF6nj\xFCk! \xDCzenet\xE9t sikeresen elk\xFCldt\xFCk JB Szende Photography r\xE9sz\xE9re.",
    type_portrait: "Portr\xE9 \xE9s Headshot",
    type_family: "Csal\xE1d \xE9s Kisbaba",
    type_action: "Akci\xF3 \xE9s Sport",
    type_event: "Rendezv\xE9ny \xE9s \xDCnnep",
    type_nature: "Term\xE9szet \xE9s T\xE1j",
    photo_modal_title: "\xDAj K\xE9p Felt\xF6lt\xE9se / Hozz\xE1ad\xE1sa",
    photo_modal_subtitle: "\xDAj fot\xF3 hozz\xE1ad\xE1sa a JB Szende Photography gal\xE9ri\xE1j\xE1hoz.",
    photo_success_msg: "Siker! A fot\xF3 hozz\xE1adva a portf\xF3li\xF3hoz. Gal\xE9ria friss\xEDt\xE9se...",
    photo_step_image: "1. K\xE9p F\xE1jl vagy Webes URL",
    photo_choose_file: "K\xE9p F\xE1jl Kiv\xE1laszt\xE1sa",
    photo_or_url: "Vagy illessze be a k\xE9p k\xF6zvetlen URL-j\xE9t (https://...)",
    photo_title_label: "Fot\xF3 C\xEDme",
    photo_assign_album: "Hozz\xE1rendel\xE9s Albumhoz",
    photo_desc_label: "Le\xEDr\xE1s",
    photo_camera_label: "Kamera Modell",
    photo_lens_label: "Objekt\xEDv",
    photo_location_label: "Helysz\xEDn",
    photo_tags_label: "C\xEDmk\xE9k (vessz\u0151vel elv\xE1lasztva)",
    photo_add_btn: "Fot\xF3 Hozz\xE1ad\xE1sa",
    cms_title: "CMS \xE9s T\xF6bbnyelv\u0171 Kezel\u0151fel\xFClet",
    cms_subtitle: "Kezelje a sz\xF6vegeket, az Angol/Rom\xE1n/Magyar ford\xEDt\xE1sokat, az albumokat \xE9s a nyelvspecifikus SEO linkeket.",
    cms_tab_translations: "Ford\xEDt\xE1sok",
    cms_tab_albums: "Album Kezel\u0151",
    cms_tab_photos: "Fot\xF3 Kezel\u0151",
    cms_tab_settings: "Tartalom \xE9s SEO",
    cms_add_translation_key: "Ford\xEDt\xE1si Kulcs Hozz\xE1ad\xE1sa",
    cms_rtl_toggle: "RTL M\xF3d El\u0151n\xE9zet (Jobbr\xF3l Balra)",
    cms_key_header: "Kulcs Azonos\xEDt\xF3",
    cms_save_all: "M\xF3dos\xEDt\xE1sok Ment\xE9se",
    cms_reset: "Vissza\xE1ll\xEDt\xE1s Alap\xE9rtelmezettre",
    cms_add_photo: "Fot\xF3 Hozz\xE1ad\xE1sa",
    footer_tagline: "M\xFAlhatatlan pillanatok, csal\xE1di t\xF6rt\xE9netek \xE9s l\xE9legzetel\xE1ll\xEDt\xF3 t\xE1jak meg\xF6r\xF6k\xEDt\xE9se Sz\xE9kelyudvarhelyen, Hargit\xE1ban \xE9s Eur\xF3pa-szerte.",
    footer_back_to_top: "Vissza a Tetej\xE9re",
    footer_copyright: "\xA9 2026 SwenTech. Minden jog fenntartva.",
    footer_created_by: "K\xE9sz\xEDtette: SwenTech",
    footer_seo_urls: "SEO Nyelvi Hivatkoz\xE1sok"
  }
};
