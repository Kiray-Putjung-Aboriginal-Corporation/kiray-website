import type {StructureResolver} from "sanity/structure";

export const eventStructure: StructureResolver = (S) =>
  S.list()
    .title("Kiray Website")
    .items([
      S.listItem()
        .title("Upcoming events")
        .schemaType("event")
        .child(
          S.documentList()
            .title("Upcoming events")
            .schemaType("event")
            .filter('_type == "event" && endDate >= now()')
            .defaultOrdering([{field: "startDate", direction: "asc"}]),
        ),
      S.listItem()
        .title("Previous events")
        .schemaType("event")
        .child(
          S.documentList()
            .title("Previous events")
            .schemaType("event")
            .filter('_type == "event" && endDate < now()')
            .defaultOrdering([{field: "startDate", direction: "desc"}]),
        ),
      S.documentTypeListItem("event").title("All events"),
    ]);
