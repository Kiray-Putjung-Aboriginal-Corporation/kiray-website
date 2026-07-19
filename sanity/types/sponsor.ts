export interface SponsorLogo {
  alt?: string;
  asset?: {
    _id?: string;
    url?: string;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SponsorTier {
  _id: string;
  name: string;
  description?: string;
  sortOrder: number;
}

export interface Sponsor {
  _id: string;
  name: string;
  logo?: SponsorLogo;
  websiteUrl?: string;
  tier?: SponsorTier;
  sortOrder: number;
  showOnSponsorsPage?: boolean;
}
