export const eventCardProjection = `
  _id,
  title,
  "slug": slug.current,
  summary,
  category,
  startDate,
  endDate,
  timezone,
  eventStatus,
  statusMessage,
  mainImage {
    ...,
    asset->
  },
  featured,
  locationType,
  venueName,
  address
`;

export const upcomingEventsQuery = `
  *[
    _type == "event" &&
    defined(slug.current) &&
    endDate >= $now
  ] | order(startDate asc) [0...12] {
    ${eventCardProjection}
  }
`;

export const previousEventsQuery = `
  *[
    _type == "event" &&
    defined(slug.current) &&
    endDate < $now &&
    (
      $search == "" ||
      title match $search ||
      summary match $search ||
      venueName match $search ||
      address match $search
    ) &&
    (
      $yearStart == "" ||
      (startDate >= $yearStart && startDate < $yearEnd)
    )
  ] | order(startDate desc) [$start...$end] {
    ${eventCardProjection}
  }
`;

export const previousEventCountQuery = `
  count(*[
    _type == "event" &&
    defined(slug.current) &&
    endDate < $now &&
    (
      $search == "" ||
      title match $search ||
      summary match $search ||
      venueName match $search ||
      address match $search
    ) &&
    (
      $yearStart == "" ||
      (startDate >= $yearStart && startDate < $yearEnd)
    )
  ])
`;

export const previousEventDatesQuery = `
  *[_type == "event" && endDate < $now] {
    startDate
  }
`;

export const eventBySlugQuery = `
  *[
    _type == "event" &&
    slug.current == $slug
  ][0] {
    ${eventCardProjection},
    body,
    mapUrl,
    onlineUrl,
    registrationEnabled,
    registrationClosingDate,
    registrationLinks,
    recap,
    gallery[] {
      ...,
      asset->
    }
  }
`;
