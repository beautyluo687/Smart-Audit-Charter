export interface SlideItem {
  textZh: string;
  textEn: string;
  isHeading?: boolean;
}

export interface SlideSection {
  id: string;
  number: string;
  titleZh: string;
  titleEn: string;
  icon: string;
  phase: 'Pre' | 'During' | 'Post';
  timelineZh: string;
  timelineEn: string;
  items: SlideItem[];
  color: string;
  subBlock?: {
    titleZh: string;
    titleEn: string;
    icon: string;
    timelineZh: string;
    timelineEn: string;
    items: SlideItem[];
  };
}

export interface KpiCard {
  titleZh: string;
  titleEn: string;
  valueZh: string;
  valueEn: string;
  icon: string;
  color: string;
}

export interface RoadmapMilestone {
  period: string;
  titleZh: string;
  titleEn: string;
  items: string[];
  subItems?: string[];
  color: string;
}

export interface TimelineData {
  period: string;
  titleZh: string;
  titleEn: string;
  itemsZh: string[];
  itemsEn: string[];
}
