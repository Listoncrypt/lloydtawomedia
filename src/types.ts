export type ProjectCategory =
  | 'brand'
  | 'travel'
  | 'corporate'
  | 'podcast'
  | 'montage'
  | 'narrative'
  | 'documentary'
  | 'music'
  | 'commercial';

export interface ProjectVideo {
  url: string;
  title?: string;
  poster?: string;
  description?: string;
  orientation?: 'landscape' | 'portrait';
  position: 'before-stills' | 'after-stills';
  revealStills?: string[];
}

export interface Project {
  id: string;
  title: string;
  year: number | string;
  category: ProjectCategory;
  categoryLabel: string;
  format?: string;
  director?: string;
  producer?: string;
  writer?: string;
  client?: string;
  productionCompany?: string;
  camera: string;
  lenses: string;
  aspectRatio: string;
  description: string;
  synopsis?: string;
  awards?: string[];
  thumbnail: string;
  thumbnailPosition?: string;
  videoUrl?: string;
  previewVideo?: string;
  heroOrientation?: 'landscape' | 'portrait';
  previewLoop?: string;
  additionalVideos?: ProjectVideo[];
  embedId?: string;
  stills: string[];
  portraitStills?: string[];
  featured?: boolean;
  tags: string[];
  colorPalette?: string[];
  laurels?: string[];
  itemNumber?: string;
}

export interface AwardItem {
  id: string;
  year: number;
  festival: string;
  award: string;
  project: string;
  status: 'Winner' | 'Gold' | 'Silver' | 'Bronze' | 'Nominee';
  note?: string;
}

export interface GearCategory {
  category: string;
  description?: string;
  items: {
    name: string;
    description?: string;
    keySpecs?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  model?: string;
}

export interface GeneratedImageRecord {
  id: string;
  url: string;
  prompt: string;
  originalPrompt?: string;
  imageSize?: string;
  aspectRatio?: string;
  filmLook?: string;
  camera?: string;
  lens?: string;
  timestamp: string;
  model?: string;
}
