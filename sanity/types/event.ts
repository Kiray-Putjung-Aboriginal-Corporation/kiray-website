import type {PortableTextBlock} from "@portabletext/types";
import type {Sponsor} from "@/sanity/types/sponsor";

export interface EventImage {
  _key?: string;
  alt?: string;
  caption?: string;
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

export interface EventRegistrationLink {
  _key: string;
  label: string;
  url: string;
}

export type EventStatus = "scheduled" | "postponed" | "cancelled";
export type EventLocationType = "venue" | "online" | "tba";

export interface KirayEvent {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  body?: PortableTextBlock[];
  category?: string;
  startDate: string;
  endDate: string;
  timezone?: string;
  eventStatus: EventStatus;
  statusMessage?: string;
  mainImage?: EventImage;
  featured?: boolean;
  locationType: EventLocationType;
  venueName?: string;
  address?: string;
  mapUrl?: string;
  onlineUrl?: string;
  registrationEnabled?: boolean;
  registrationClosingDate?: string;
  registrationLinks?: EventRegistrationLink[];
  sponsorAcknowledgementEnabled?: boolean;
  useCurrentSponsors?: boolean;
  sponsorAcknowledgement?: PortableTextBlock[];
  eventSponsors?: Sponsor[];
  recap?: PortableTextBlock[];
  gallery?: EventImage[];
}

export interface EventArchiveResult {
  events: KirayEvent[];
  total: number;
  page: number;
  totalPages: number;
}
