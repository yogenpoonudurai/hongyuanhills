import type { Hall } from "./types";

export const halls: Hall[] = [
  {
    slug: "zizai-pavilion",
    name: { zh: "自在阁", en: "Zizai Pavilion" },
    tagline: {
      zh: "冷气骨灰殿 · 自在菩萨",
      en: "Air-conditioned columbarium · Zizai Bodhisattva",
    },
    summary: {
      zh: "一处真正让思念「安住」的清净殿堂。金色心经与蓝色涟漪两种面板，配以汉白玉双莲透灯设计。",
      en: "A tranquil hall where remembrance can truly rest, with Gold Heart Sutra and Blue Ripple panels and illuminated white-marble lotuses.",
    },
    intro: {
      zh: "自在阁冷气骨灰殿，是宏缘宝地为追求高品质、庄严与心灵安宁的家庭精心打造的安奉殿堂。环境清凉洁净、肃穆宁静，让先人得以安住，也让后人能在平静中寄托思念。",
      en: "Zizai Pavilion is a premium air-conditioned columbarium created for families who seek dignity, quality and spiritual peace. Its cool, clean and serene environment offers a resting place for ancestors and a comforting setting for remembrance.",
    },
    image: {
      src: "/images/hall-zizai",
      alt: {
        zh: "自在阁冷气骨灰殿内部",
        en: "Interior of Zizai Pavilion columbarium",
      },
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: "/images/halls/zizai-hero",
      alt: {
        zh: "自在阁冷气骨灰殿殿堂",
        en: "Zizai Pavilion columbarium hall",
      },
      width: 1600,
      height: 900,
    },
    accent: "#C9A227",
    deity: {
      name: { zh: "自在菩萨", en: "Zizai Bodhisattva" },
      body: {
        zh: "自在阁中央主殿安奉自在菩萨，象征慈悲守护、智慧引渡、离苦得乐、得大自在。菩萨镇殿居中，守护殿堂的清净能量，接引先人，也抚慰后人的心灵。",
        en: "At the heart of Zizai Pavilion stands Zizai Bodhisattva, symbolising compassionate protection, guidance through wisdom, liberation from suffering and spiritual freedom. The Bodhisattva blesses the hall with serenity, guiding the departed and comforting the living.",
      },
    },
    panelDetails: [
      {
        name: {
          zh: "金色心经 · 佛教尊贵款",
          en: "Golden Heart Sutra · Buddhist series",
        },
        body: {
          zh: "以整面金色《心经》经文为底，庄严肃穆，象征般若智慧、破除烦恼、离苦得乐。金色象征光明、功德与圆满。",
          en: "A full panel of golden Heart Sutra text creates a dignified atmosphere, symbolising prajna wisdom, freedom from distress and liberation from suffering. Gold represents light, merit and fulfilment.",
        },
      },
      {
        name: {
          zh: "蓝色涟漪 · 无宗教友好款",
          en: "Blue Ripple · Universal series",
        },
        body: {
          zh: "以「宁静、简约、尊重」为设计核心。水纹象征人生归途的圆满回归，涟漪代表思念的延续与爱的回响。蓝色象征宁静、安心与无牵挂。",
          en: "The design centres on serenity, simplicity and respect. The water pattern symbolises the completion of life’s journey, while ripples represent enduring memories and the echoes of love. Blue evokes tranquillity and freedom from worldly worries.",
        },
      },
      {
        name: {
          zh: "汉白玉双莲 · 透灯祝福",
          en: "Double white-marble lotus · illuminated blessing",
        },
        body: {
          zh: "每一面板连接两朵汉白玉精雕莲花，设有透灯点亮设计。点灯后，莲花柔光绽放，象征莲开净土、光明接引、福慧圆满。",
          en: "Each panel is adorned with two finely carved white-marble lotuses with integrated illumination. When lit, the lotuses glow softly, symbolising the blossoming of the lotus in the Pure Land and the fulfilment of blessings and wisdom.",
        },
      },
    ],
    amenities: {
      zh: [
        "冷气骨灰殿",
        "中央自在菩萨",
        "金色心经 / 蓝色涟漪面板",
        "汉白玉双莲透灯",
      ],
      en: [
        "Air-conditioned hall",
        "Central Zizai Bodhisattva",
        "Gold Heart Sutra / Blue Ripple panels",
        "Illuminated white-marble lotuses",
      ],
    },
    gallery: [
      {
        src: "/images/halls/zizai-1",
        alt: {
          zh: "自在阁骨灰殿内部",
          en: "Interior of Zizai Pavilion",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/zizai-2",
        alt: {
          zh: "自在阁骨灰位与莲花设计",
          en: "Niches and lotus details at Zizai Pavilion",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/zizai-3",
        alt: {
          zh: "自在阁殿堂一景",
          en: "A view inside Zizai Pavilion",
        },
        width: 1200,
        height: 900,
      },
    ],
    video: {
      poster: {
        src: "/images/halls/zizai-1",
        alt: {
          zh: "自在阁导览影片封面",
          en: "Zizai Pavilion tour poster",
        },
        width: 1200,
        height: 900,
      },
      title: { zh: "自在阁导览", en: "Zizai Pavilion tour" },
    },
    locationNote: {
      zh: "位于宏缘宝地园区内；预约后由顾问陪同参观。",
      en: "Located within Hong Yuan Hills memorial park. Visits are accompanied by a consultant.",
    },
  },
  {
    slug: "benyuan-pavilion",
    name: { zh: "本愿阁", en: "Benyuan Pavilion" },
    tagline: {
      zh: "地藏王菩萨 · 净土殿堂",
      en: "Ksitigarbha Bodhisattva · Pure Land hall",
    },
    summary: {
      zh: "「地狱不空，誓不成佛。」本愿阁恭奉地藏王菩萨，以西方极乐世界为核心意象，承载愿力、福德与超度功德。",
      en: "Named after Ksitigarbha Bodhisattva’s great vow, Benyuan Pavilion enshrines the Bodhisattva and is inspired by the Western Pure Land.",
    },
    intro: {
      zh: "「本愿阁」之名，源自地藏王菩萨的大愿——「地狱不空，誓不成佛」，取自《地藏王本愿经》的「本愿」二字。本殿中央恭奉地藏王菩萨圣像，整体规划以西方极乐世界为核心意象，象征先人往生净土、离苦得乐，亦寓意子孙后代福泽延绵、家运昌隆。",
      en: "The name Benyuan Pavilion comes from the great vow of Ksitigarbha Bodhisattva — “Until the hells are empty, I vow not to attain Buddhahood” — and from the “Fundamental Vows” of the Ksitigarbha Sutra. The hall enshrines Ksitigarbha Bodhisattva, with the Western Pure Land as its central inspiration.",
    },
    image: {
      src: "/images/hall-benyuan",
      alt: {
        zh: "本愿阁地藏王菩萨圣像",
        en: "Ksitigarbha Bodhisattva at Benyuan Pavilion",
      },
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: "/images/halls/benyuan-hero",
      alt: {
        zh: "本愿阁净土殿堂",
        en: "Benyuan Pavilion Pure Land hall",
      },
      width: 1600,
      height: 900,
    },
    accent: "#A66B3A",
    deity: {
      name: { zh: "地藏王菩萨", en: "Ksitigarbha Bodhisattva" },
      body: {
        zh: "本殿中央恭奉地藏王菩萨圣像，以愿力护佑先灵，引领离苦得度，安然往生。整体规划以西方极乐世界为核心意象，象征先人往生净土，亦寓意子孙后代福泽延绵。",
        en: "At the centre of the hall enshrines Ksitigarbha Bodhisattva, whose vow protects the departed, guides them beyond suffering and leads them to peace. The Western Pure Land is the hall’s central inspiration, symbolising rebirth in the Pure Land and continuing blessings for future generations.",
      },
    },
    panelDetails: [
      {
        name: {
          zh: "地藏王菩萨圣像",
          en: "Ksitigarbha Bodhisattva",
        },
        body: {
          zh: "地藏王菩萨以大愿力护佑先灵，引领离苦得度，让家属在追思中感到安稳与慰藉。",
          en: "Ksitigarbha Bodhisattva protects the departed through the power of his vow, guiding them beyond suffering and offering families comfort in remembrance.",
        },
      },
      {
        name: {
          zh: "西方极乐世界意象",
          en: "Western Pure Land imagery",
        },
        body: {
          zh: "整体规划以西方极乐世界为核心意象，象征先人往生净土、离苦得乐，亦寓意子孙后代福泽延绵、家运昌隆。",
          en: "The hall is inspired by the Western Pure Land, symbolising rebirth in the Pure Land and the continuation of blessings, prosperity and harmony for future generations.",
        },
      },
      {
        name: {
          zh: "愿力与超度功德",
          en: "Vows, merit and blessings",
        },
        body: {
          zh: "本愿阁不仅是一处安奉之所，更是一座承载愿力、福德与超度功德的净土殿堂。",
          en: "Benyuan Pavilion is not merely a place of memorial, but a Pure Land hall carrying compassion, merit and spiritual transcendence.",
        },
      },
    ],
    amenities: {
      zh: [
        "地藏王菩萨圣殿",
        "西方极乐世界主题",
        "愿力与超度功德",
        "短片导览",
      ],
      en: [
        "Ksitigarbha Bodhisattva hall",
        "Western Pure Land theme",
        "Vows, merit and blessings",
        "Short video tour",
      ],
    },
    gallery: [
      {
        src: "/images/halls/benyuan-1",
        alt: {
          zh: "本愿阁地藏王菩萨圣像",
          en: "Ksitigarbha Bodhisattva at Benyuan Pavilion",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/benyuan-2",
        alt: {
          zh: "本愿阁殿堂内部",
          en: "Interior of Benyuan Pavilion",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/benyuan-3",
        alt: {
          zh: "本愿阁净土意象",
          en: "Pure Land imagery at Benyuan Pavilion",
        },
        width: 1200,
        height: 900,
      },
    ],
    video: {
      poster: {
        src: "/images/halls/benyuan-1",
        alt: {
          zh: "本愿阁导览影片封面",
          en: "Benyuan Pavilion tour poster",
        },
        width: 1200,
        height: 900,
      },
      title: { zh: "本愿阁导览", en: "Benyuan Pavilion tour" },
    },
    locationNote: {
      zh: "位于宏缘宝地园区内；预约后由顾问陪同参观。",
      en: "Located within Hong Yuan Hills memorial park. Visits are accompanied by a consultant.",
    },
  },
  {
    slug: "sanyuan-hall",
    name: { zh: "三缘殿", en: "Sanyuan Hall" },
    tagline: {
      zh: "冷气骨灰殿 · 三圣像安奉位",
      en: "Air-conditioned columbarium · Three Buddha niches",
    },
    summary: {
      zh: "阿弥陀佛、观音菩萨与弥勒佛安奉于水晶玻璃之内。三种安奉格位，以「缘」为名，让先人安住，也让家人心安。",
      en: "Amitabha, Guanyin and Maitreya are enshrined behind crystal glass. Three niche types, named for karmic connection, offer a calm resting place.",
    },
    intro: {
      zh: "三缘殿是一处以「缘」为名的清净之所。在庄严佛像的守护下，空间不喧不扰，让先人安住其中，也让家人心得安宁。精雕细琢的阿弥陀佛、观音菩萨与弥勒佛，如同佛教三宝，恭候于水晶玻璃之内。",
      en: "Sanyuan Hall is a serene space named for karmic connection. Under the guardianship of its Buddha images, the hall is quiet and undisturbed, offering a resting place for ancestors and peace for families. Finely crafted Amitabha, Guanyin and Maitreya are enshrined behind crystal glass.",
    },
    image: {
      src: "/images/hall-sanyuan",
      alt: {
        zh: "三缘殿阿弥陀佛圣像",
        en: "Amitabha Buddha at Sanyuan Hall",
      },
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: "/images/halls/sanyuan-hero",
      alt: {
        zh: "三缘殿冷气骨灰殿",
        en: "Sanyuan Hall columbarium",
      },
      width: 1600,
      height: 900,
    },
    accent: "#6E8B7B",
    deity: {
      name: {
        zh: "阿弥陀佛 · 观音菩萨 · 弥勒佛",
        en: "Amitabha · Guanyin · Maitreya",
      },
      body: {
        zh: "三缘殿以三圣像为守护。阿弥陀佛的大光明包容一切，观音菩萨以慈悲抚平烦恼，弥勒佛以欢笑带来欢喜与安宁。",
        en: "Sanyuan Hall is guarded by three Buddha images. Amitabha’s boundless light embraces all, Guanyin’s compassion soothes sorrow, and Maitreya’s joyful smile brings peace and happiness.",
      },
    },
    panelDetails: [
      {
        name: {
          zh: "观音菩萨安奉位",
          en: "Guanyin Bodhisattva niches",
        },
        body: {
          zh: "观音菩萨温柔而绵长的目光穿越人世的尘埃，将悲苦与困惑化为缕缕轻风，以如水般柔和的慈悲抚平烦恼哀伤。",
          en: "Guanyin Bodhisattva’s gentle, enduring gaze reaches beyond the troubles of the world, transforming suffering and uncertainty into a soft breeze and soothing sorrow with compassion as gentle as water.",
        },
      },
      {
        name: {
          zh: "阿弥陀佛安奉位",
          en: "Amitabha Buddha niches",
        },
        body: {
          zh: "阿弥陀佛的大光明将包容一切，使灵魂在他的怀抱中得以安息，并接引它们朝向平静而安详的彼岸。",
          en: "Amitabha Buddha’s boundless light embraces all beings, offering souls rest in his compassionate care and guiding them towards a peaceful and tranquil shore.",
        },
      },
      {
        name: {
          zh: "弥勒佛安奉位",
          en: "Maitreya Buddha niches",
        },
        body: {
          zh: "弥勒佛的欢笑使忧愁与疲惫一扫而空，让每一个渴望幸福的心灵都能在他的怀抱中找到最真切的欢愉与安宁。",
          en: "Maitreya Buddha’s joyful smile dispels worry and weariness, inviting every heart seeking happiness to find genuine joy and peace in his embrace.",
        },
      },
    ],
    amenities: {
      zh: [
        "冷气骨灰殿",
        "阿弥陀佛 · 观音菩萨 · 弥勒佛",
        "水晶玻璃安奉位",
        "短片导览",
      ],
      en: [
        "Air-conditioned hall",
        "Amitabha · Guanyin · Maitreya",
        "Crystal-glass niches",
        "Short video tour",
      ],
    },
    gallery: [
      {
        src: "/images/halls/sanyuan-1",
        alt: {
          zh: "三缘殿阿弥陀佛圣像",
          en: "Amitabha Buddha at Sanyuan Hall",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/sanyuan-2",
        alt: {
          zh: "三缘殿观音菩萨圣像",
          en: "Guanyin Bodhisattva at Sanyuan Hall",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/sanyuan-3",
        alt: {
          zh: "三缘殿弥勒佛圣像",
          en: "Maitreya Buddha at Sanyuan Hall",
        },
        width: 1200,
        height: 900,
      },
    ],
    video: {
      poster: {
        src: "/images/halls/sanyuan-1",
        alt: {
          zh: "三缘殿导览影片封面",
          en: "Sanyuan Hall tour poster",
        },
        width: 1200,
        height: 900,
      },
      title: { zh: "三缘殿导览", en: "Sanyuan Hall tour" },
    },
    locationNote: {
      zh: "位于宏缘宝地园区内；预约后由顾问陪同参观。",
      en: "Located within Hong Yuan Hills memorial park. Visits are accompanied by a consultant.",
    },
  },
  {
    slug: "danxiang-pavilion",
    name: { zh: "丹香阁", en: "Danxiang Pavilion" },
    tagline: {
      zh: "冷气骨灰殿 · 汉白玉牡丹面板",
      en: "Air-conditioned columbarium · white-marble peony panels",
    },
    summary: {
      zh: "丹香，淡而不散。粉色与蓝色汉白玉粉铸面板如春日牡丹，中心水晶钻圆环捕捉每一份记忆的光芒。",
      en: "A gentle, enduring remembrance. Pink and blue white-marble panels resemble spring peonies, with a crystal-studded centre that catches each memory.",
    },
    intro: {
      zh: "丹香，淡而不散，是一份温柔而恒久的思念。丹香阁冷气骨灰殿以柔和粉色调结合温润石材纹理，空间明亮而肃静，在光影流转之间，营造安然、典雅的安奉环境。每一块汉白玉粉铸面板，都如同春日最鲜艳的牡丹。",
      en: "Danxiang is a gentle, enduring remembrance. The air-conditioned hall combines soft pink tones with warm stone textures, creating a bright, quiet and elegant setting. Each white-marble powder cast panel resembles a vibrant spring peony.",
    },
    image: {
      src: "/images/hall-danxiang",
      alt: {
        zh: "丹香阁汉白玉牡丹面板",
        en: "White-marble peony panels at Danxiang Pavilion",
      },
      width: 1200,
      height: 900,
    },
    heroImage: {
      src: "/images/halls/danxiang-hero",
      alt: {
        zh: "丹香阁冷气骨灰殿",
        en: "Danxiang Pavilion columbarium",
      },
      width: 1600,
      height: 900,
    },
    accent: "#C98A95",
    panelDetails: [
      {
        name: {
          zh: "汉白玉粉铸面板",
          en: "White-marble powder cast panels",
        },
        body: {
          zh: "每一块汉白玉粉铸面板都经过细致制作，以温润石材纹理呈现典雅、庄重的质感。",
          en: "Each white-marble powder cast panel is carefully made, with warm stone textures that convey an elegant and dignified character.",
        },
      },
      {
        name: {
          zh: "粉蓝牡丹意象",
          en: "Pink and blue peony motifs",
        },
        body: {
          zh: "粉色与蓝色娓娓道来生命的温柔与尊贵，如春日牡丹经历风霜而愈发璀璨。",
          en: "Pink and blue express the tenderness and dignity of life, like spring peonies that grow more radiant through the seasons.",
        },
      },
      {
        name: {
          zh: "水晶钻圆环 · 记忆之光",
          en: "Crystal-studded ring · light of memory",
        },
        body: {
          zh: "中心镶嵌的水晶钻圆环如璀璨星辰，捕捉每一份记忆的光芒，让爱永存心间。",
          en: "A crystal-studded circular centre catches the light like a brilliant star, holding the glow of each treasured memory.",
        },
      },
    ],
    amenities: {
      zh: [
        "冷气骨灰殿",
        "汉白玉粉铸面板",
        "粉蓝牡丹设计",
        "水晶钻圆环",
        "短片导览",
      ],
      en: [
        "Air-conditioned hall",
        "White-marble powder cast panels",
        "Pink and blue peony design",
        "Crystal-studded ring",
        "Short video tour",
      ],
    },
    gallery: [
      {
        src: "/images/halls/danxiang-1",
        alt: {
          zh: "丹香阁汉白玉牡丹面板",
          en: "White-marble peony panels at Danxiang Pavilion",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/danxiang-2",
        alt: {
          zh: "丹香阁粉蓝面板设计",
          en: "Pink and blue panel design at Danxiang Pavilion",
        },
        width: 1200,
        height: 900,
      },
      {
        src: "/images/halls/danxiang-3",
        alt: {
          zh: "丹香阁水晶钻圆环面板",
          en: "Crystal-studded panel at Danxiang Pavilion",
        },
        width: 1200,
        height: 900,
      },
    ],
    video: {
      poster: {
        src: "/images/halls/danxiang-1",
        alt: {
          zh: "丹香阁导览影片封面",
          en: "Danxiang Pavilion tour poster",
        },
        width: 1200,
        height: 900,
      },
      title: { zh: "丹香阁导览", en: "Danxiang Pavilion tour" },
    },
    locationNote: {
      zh: "位于宏缘宝地园区内；预约后由顾问陪同参观。",
      en: "Located within Hong Yuan Hills memorial park. Visits are accompanied by a consultant.",
    },
  },
];

export function getHall(slug: string): Hall | undefined {
  return halls.find((hall) => hall.slug === slug);
}
