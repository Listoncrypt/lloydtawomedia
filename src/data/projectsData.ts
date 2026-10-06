import { Project, AwardItem, GearCategory, ProjectCategory } from '../types';

export const CATEGORY_ORDER: ProjectCategory[] = [
  'montage',
  'brand',
  'travel',
  'corporate',
  'podcast',
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  montage: 'MONTAGE',
  brand: 'BRAND',
  travel: 'TRAVEL',
  corporate: 'CORPORATE',
  podcast: 'PODCAST',
  narrative: 'NARRATIVE',
  documentary: 'DOCUMENTARY',
  music: 'MUSIC',
  commercial: 'COMMERCIAL',
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'selected-work-montage',
    itemNumber: '01',
    format: 'MONTAGE',
    title: 'SELECTED WORK (MONTAGE)',
    year: 2026,
    category: 'montage',
    categoryLabel: 'Selected Work / Montage',
    director: 'Lloyd Tawo',
    productionCompany: 'Tawo Media',
    camera: 'Various',
    lenses: 'Various',
    aspectRatio: '16:9',
    description: `A multi-format content production created for Tyrone across Ghana. The project brought together podcast production, travel content, commercial work and behind-the-scenes production, giving me the opportunity to work across different visual styles and formats for the same client.

I was involved throughout the production process — from setting up the podcast studio and developing the visual environment, to cinematography, location production and post-production. This montage brings those different projects together to show the range of work delivered across the engagement.`,
    awards: [],
    thumbnail: '/assets/selected_work_montage_poster.webp',
    previewVideo: '/assets/selected_work_montage.mp4',
    previewLoop: '/assets/selected_work_montage.loop.mp4',
    stills: [],
    featured: true,
    tags: ['Montage', 'Showreel'],
    colorPalette: ['#000000', '#333333', '#ffffff']
  },
  {
    id: 'brand-ad',
    itemNumber: '02',
    format: 'COMMERCIAL',
    title: 'BRAND AD',
    year: 2026,
    category: 'brand',
    categoryLabel: 'Brand Ad',
    director: 'Lloyd Tawo',
    productionCompany: 'Tawo Media',
    camera: '',
    lenses: '',
    aspectRatio: '16:9',
    description: `A commercial piece created for Fufua, Tyrone’s fashion brand in Ghana. The concept was built around turning the brand’s products into part of the visual story rather than simply presenting them. I handled the cinematography and post-production, using movement, styling and visual transitions to create a polished fashion-focused piece.`,
    awards: [],
    thumbnail: '/assets/1.webp',
    previewVideo: '/assets/FUFUA_portfolio.mp4',
    previewLoop: '/assets/FUFUA_portfolio.loop.mp4',
    videoUrl: '',
    embedId: '',
    additionalVideos: [
      {
        url: '/assets/FUFUA_collection_full.mp4',
        title: 'FUFUA COLLECTION — FULL VIDEO',
        poster: '/assets/FUFUA_collection_full_poster.webp',
        description: `A commercial piece created for Fufua, Tyrone’s fashion brand in Ghana. The concept was built around turning the brand’s products into part of the visual story rather than simply presenting them. I handled the cinematography and post-production, using movement, styling and visual transitions to create a polished fashion-focused piece.`,
        revealStills: [
          '/assets/Still013.webp',
          '/assets/Still014.webp',
          '/assets/Still017.webp'
        ],
        position: 'before-stills'
      },
      {
        url: '/assets/diopter_video.mp4',
        title: 'DIOPTER VIDEO',
        poster: '/assets/diopter_poster.webp',
        description: `A self-directed product film created to demonstrate the creative possibilities of a lens diopter. Rather than simply explaining the accessory, I used the piece to show how it changes the way a camera can capture a subject, bringing attention to close-up details, depth and focus.`,
        orientation: 'portrait',
        position: 'after-stills'
      }
    ],
    stills: [],
    featured: true,
    tags: ['Brand', 'Commercial'],
    colorPalette: ['#000000', '#333333', '#ffffff']
  },
  {
    id: 'travel',
    itemNumber: '03',
    format: 'TRAVEL',
    title: 'TRAVEL',
    year: '2025-2026',
    category: 'travel',
    categoryLabel: 'Travel',
    director: 'Lloyd Tawo',
    productionCompany: 'Tawo Media',
    camera: '',
    lenses: '',
    aspectRatio: '16:9',
    description: `A travel film created for Tyrone as part of his Ghana travel series, focused on showcasing Akosombo beyond the usual Accra experience. I handled the cinematography and post-production, shaping the footage into a visually driven story that balanced the destination’s landscapes, atmosphere and Tyrone’s on-camera narrative.

This piece was about making Akosombo feel like more than just another destination. I approached the cinematography around atmosphere, landscapes and the quieter moments of the trip, then built the edit around Tyrone’s commentary to create a strong sense of place.`,
    awards: [],
    thumbnail: '/assets/travel_akoso.webp',
    previewVideo: '/assets/travel_akoso.mp4',
    previewLoop: '/assets/travel_akoso.loop.mp4',
    additionalVideos: [
      {
        url: '/assets/travel_cape_coast.mp4',
        title: 'CAPE COAST',
        poster: '/assets/travel_cape_coast_poster.webp',
        description: `A documentary-style travel film for Tyrone’s Ghana series, exploring Cape Coast and its historical significance to Ghana and the African diaspora. I handled the cinematography and post-production, combining location footage, interviews and visual storytelling to support the historical narrative.

For this episode, the challenge was balancing a visually engaging travel film with a subject carrying significant historical weight. I used the cinematography and edit to let the location speak for itself while giving Tyrone’s reflections room to carry the story.`,
        position: 'before-stills'
      },
      {
        url: '/assets/travel_wli_falls.mp4',
        title: 'WLI FALLS',
        poster: '/assets/travel_wli_falls.webp',
        description: `Part of Tyrone’s Ghana travel series, this film documents his visit to Wli Falls in the Volta Region. I handled the cinematography and post-production, capturing both the journey to the location and the experience of the destination while maintaining the visual style of the wider series.

This was a location-driven piece, with much of the storytelling coming from the journey itself and the scale of Wli Falls. I focused on capturing the movement, environment and progression of the experience, giving the edit a natural sense of build-up before arriving at the falls.`,
        position: 'before-stills'
      },
      {
        url: '/assets/travel_kano.mp4',
        title: 'KANO',
        poster: '/assets/travel_kano_poster.webp',
        description: `A travel film produced for Mary documenting her exploration of Kano and its cultural and historical landmarks, including the ancient dye pits and Emir’s Palace. I handled the cinematography and post-production, shaping the location footage into a cohesive visual story.

Kano presented a very different storytelling challenge: a city with layers of history, culture and visual detail. I brought together locations including the dye pits and Emir’s Palace into one cohesive film, using the edit to connect the different experiences rather than treating them as separate stops.`,
        position: 'before-stills'
      },
      {
        url: '/assets/travel_bauchi.mp4',
        title: 'BAUCHI',
        poster: '/assets/travel_bauchi_poster.webp',
        description: `A travel film produced for Mary as part of her Nigeria travel content. I handled the cinematography and post-production, using a combination of location coverage, environmental shots and narrative-driven editing to build the final piece.

Working in a game reserve meant approaching the edit differently — allowing the environment, wildlife and quieter moments to breathe. The film relies heavily on observational footage and natural atmosphere to make the viewer feel present within the experience.`,
        position: 'before-stills'
      }
    ],
    stills: [],
    featured: true,
    tags: ['Travel'],
    colorPalette: ['#000000', '#333333', '#ffffff']
  },
  {
    id: 'podcast',
    itemNumber: '04',
    format: 'PODCAST',
    title: 'PODCAST / TALKING HEAD',
    year: '2025-2026',
    category: 'podcast',
    categoryLabel: 'Podcast / Talking Head',
    director: 'Lloyd Tawo',
    productionCompany: 'Tawo Media',
    camera: '',
    lenses: '',
    aspectRatio: '16:9',
    description: `A long-form podcast and talking-head series created for Tyrone, focused on helping members of the African diaspora understand life, business and opportunities in Ghana. Episodes cover everything from investment and relocation to cultural differences, business experiences and the realities of building a life in Ghana.

I handled the production from the ground up — including studio setup, lighting, camera operation, audio and post-production. The edit was built to keep long-form conversations engaging while maintaining a clean, consistent visual style across the series.`,
    awards: [],
    heroOrientation: 'portrait',
    thumbnail: '/assets/podcast_tyrone.webp',
    thumbnailPosition: '50% 12%',
    previewVideo: '/assets/podcast_tyrone_tim_swain.mp4',
    previewLoop: '/assets/podcast_tyrone_tim_swain.loop.mp4',
    additionalVideos: [
      {
        url: '/assets/podcast_synced_sequence.mp4',
        poster: '/assets/podcast_synced_sequence.webp',
        description: `A long-form podcast and talking-head series created for Tyrone, focused on helping members of the African diaspora understand life, business and opportunities in Ghana. Episodes cover everything from investment and relocation to cultural differences, business experiences and the realities of building a life in Ghana.

I handled the production from the ground up — including studio setup, lighting, camera operation, audio and post-production. The edit was built to keep long-form conversations engaging while maintaining a clean, consistent visual style across the series.`,
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_dela_pod.mp4',
        poster: '/assets/podcast_dela_pod_poster.webp',
        description: `A long-form podcast and talking-head series created for Tyrone, focused on helping members of the African diaspora understand life, business and opportunities in Ghana. Episodes cover everything from investment and relocation to cultural differences, business experiences and the realities of building a life in Ghana.

I handled the production from the ground up — including studio setup, lighting, camera operation, audio and post-production. The edit was built to keep long-form conversations engaging while maintaining a clean, consistent visual style across the series.`,
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_dela_port.mp4',
        poster: '/assets/podcast_dela_port_poster.webp',
        description: `A long-form podcast and talking-head series created for Tyrone, focused on helping members of the African diaspora understand life, business and opportunities in Ghana. Episodes cover everything from investment and relocation to cultural differences, business experiences and the realities of building a life in Ghana.

I handled the production from the ground up — including studio setup, lighting, camera operation, audio and post-production. The edit was built to keep long-form conversations engaging while maintaining a clean, consistent visual style across the series.`,
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_relocate_g.mp4',
        poster: '/assets/podcast_relocate_g_poster.webp',
        description: `A long-form podcast and talking-head series created for Tyrone, focused on helping members of the African diaspora understand life, business and opportunities in Ghana. Episodes cover everything from investment and relocation to cultural differences, business experiences and the realities of building a life in Ghana.

I handled the production from the ground up — including studio setup, lighting, camera operation, audio and post-production. The edit was built to keep long-form conversations engaging while maintaining a clean, consistent visual style across the series.`,
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_ghana.mp4',
        title: 'HOW TO MOVE SMART IN GHANA — TRAILER',
        poster: '/assets/podcast_ghana.webp',
        description: `A long-form podcast and talking-head series created for Tyrone, focused on helping members of the African diaspora understand life, business and opportunities in Ghana. Episodes cover everything from investment and relocation to cultural differences, business experiences and the realities of building a life in Ghana.

I handled the production from the ground up — including studio setup, lighting, camera operation, audio and post-production. The edit was built to keep long-form conversations engaging while maintaining a clean, consistent visual style across the series.`,
        orientation: 'portrait',
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_inspiredbyirene.mp4',
        title: 'INSPIRED BY IRENE — INTRO',
        poster: '/assets/podcast_inspiredbyirene_poster.webp',
        description: `An educational content series created for Inspired by Irene, covering topics around teaching, parenting, schools and the development of young people. The content explores the responsibilities of teachers and parents while offering practical perspectives on creating better learning environments.

I handled the production and post-production, shaping the talking-head content into short, accessible videos designed for social platforms while keeping the presentation clear, engaging and consistent across the series.`,
        orientation: 'portrait',
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_shape_light.mp4',
        title: 'SHAPE LIGHT',
        poster: '/assets/podcast_shape_light_poster.webp',
        description: `A practical cinematography piece exploring how natural light can be shaped and controlled to create a more intentional image. I used a simple location and available light to demonstrate how changes in direction, positioning and control can transform the look and feel of a shot.`,
        orientation: 'portrait',
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_ep57.mp4',
        title: 'EPISODE 57',
        poster: '/assets/podcast_ep57_poster.webp',
        description: `An educational content series created for Inspired by Irene, covering topics around teaching, parenting, schools and the development of young people. The content explores the responsibilities of teachers and parents while offering practical perspectives on creating better learning environments.

I handled the production and post-production, shaping the talking-head content into short, accessible videos designed for social platforms while keeping the presentation clear, engaging and consistent across the series.`,
        orientation: 'portrait',
        position: 'before-stills'
      },
      {
        url: '/assets/podcast_ep61.mp4',
        title: 'EPISODE 61',
        poster: '/assets/podcast_ep61_poster.webp',
        description: `An educational content series created for Inspired by Irene, covering topics around teaching, parenting, schools and the development of young people. The content explores the responsibilities of teachers and parents while offering practical perspectives on creating better learning environments.

I handled the production and post-production, shaping the talking-head content into short, accessible videos designed for social platforms while keeping the presentation clear, engaging and consistent across the series.`,
        orientation: 'portrait',
        position: 'before-stills'
      }
    ],
    stills: [],
    featured: true,
    tags: ['Podcast', 'Talking Head', 'Interview'],
    colorPalette: ['#000000', '#333333', '#ffffff']
  },
  {
    id: 'corporate',
    itemNumber: '05',
    format: 'CORPORATE',
    title: 'CORPORATE',
    year: '',
    category: 'corporate',
    categoryLabel: 'Corporate',
    director: 'Lloyd Tawo',
    productionCompany: 'Tawo Media',
    camera: '',
    lenses: '',
    aspectRatio: '16:9',
    description: `Corporate documentation for the Bureau of Public Procurement, covering an off-site engagement where our production team was brought in to document the event and its proceedings. The work focused on capturing the people, environment and key moments of the engagement through a curated set of still images.`,
    awards: [],
    heroOrientation: 'portrait',
    thumbnail: '/assets/corporate_africa.webp',
    thumbnailPosition: '50% 0%',
    stills: [
      '/assets/corporate_aro_1.webp',
      '/assets/corporate_aro_2.webp',
      '/assets/corporate_aro_3.webp',
      '/assets/corporate_ulti_1.webp',
      '/assets/corporate_ulti_2.webp',
      '/assets/corporate_ulti_3.webp'
    ],
    featured: true,
    tags: ['Corporate'],
    colorPalette: ['#000000', '#333333', '#ffffff']
  }
];

export const AWARDS_DATA: AwardItem[] = [];

export const GEAR_DATA: GearCategory[] = [];
