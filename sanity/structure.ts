import type {StructureResolver} from 'sanity/structure'

/**
 * Studio navigation.
 *
 * Leads are a worklist rather than a content library, so they get explicit panes
 * instead of the default flat document list: new enquiries first, because that is
 * the only view anyone opens in a hurry.
 *
 * https://www.sanity.io/docs/structure-builder-cheat-sheet
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Leads')
        .child(
          S.list()
            .title('Leads')
            .items([
              S.listItem()
                .title('New')
                .child(
                  S.documentTypeList('lead')
                    .title('New leads')
                    .filter('_type == "lead" && status == "new"')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('All leads')
                .child(
                  S.documentTypeList('lead')
                    .title('All leads')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'lead'),
    ])
