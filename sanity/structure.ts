import type { StructureResolver } from 'sanity/structure'

/**
 * Studio navigation.
 *
 * Two things get explicit panes rather than the default flat document list.
 *
 * Leads are a worklist: new enquiries first, because that is the only view
 * anyone opens in a hurry.
 *
 * The blog is a publication: drafts and scheduled-but-unpublished posts are
 * invisible in a list sorted by date, and a post that has quietly fallen out of
 * the index (`indexable: false`) is invisible everywhere. Both get their own
 * pane so neither can rot unnoticed.
 *
 * `blogSettings` is a singleton — pinned as a single editable document so a
 * second one can never be created and leave two people editing different hubs.
 *
 * https://www.sanity.io/docs/structure-builder-cheat-sheet
 */

const HANDLED_TYPES = ['lead', 'outboundClick', 'post', 'author', 'category', 'blogSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('All posts')
                .child(
                  S.documentTypeList('post')
                    .title('All posts')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Hidden from search')
                .child(
                  S.documentTypeList('post')
                    .title('Posts serving noindex')
                    .filter('_type == "post" && indexable == false')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
              S.divider(),
              S.listItem()
                .title('Categories')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem().title('Authors').child(S.documentTypeList('author').title('Authors')),
              S.divider(),
              S.listItem()
                .title('Hub page settings')
                .id('blogSettings')
                .child(S.document().schemaType('blogSettings').documentId('blogSettings')),
            ]),
        ),

      S.divider(),

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
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('All leads')
                .child(
                  S.documentTypeList('lead')
                    .title('All leads')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
                ),
            ]),
        ),

      // Contact signals, kept out of the Leads worklist on purpose.
      //
      // A click is not an enquiry: nobody has given us their details and nobody
      // is waiting for a reply. Filed next to Leads because it answers the same
      // question from the other side — Leads is who to call back, this is which
      // button got them there.
      S.listItem()
        .title('Outbound clicks')
        .child(
          S.list()
            .title('Outbound clicks')
            .items([
              S.listItem()
                .title('Recent — all channels')
                .child(
                  S.documentTypeList('outboundClick')
                    .title('Recent clicks')
                    .defaultOrdering([{ field: 'occurredAt', direction: 'desc' }]),
                ),
              S.divider(),
              S.listItem()
                .title('WhatsApp')
                .child(
                  S.documentTypeList('outboundClick')
                    .title('WhatsApp clicks')
                    .filter('_type == "outboundClick" && channel == "whatsapp"')
                    .defaultOrdering([{ field: 'occurredAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Etsy')
                .child(
                  S.documentTypeList('outboundClick')
                    .title('Etsy clicks')
                    .filter('_type == "outboundClick" && channel == "etsy"')
                    .defaultOrdering([{ field: 'occurredAt', direction: 'desc' }]),
                ),
              S.divider(),
              S.listItem()
                .title('Grouped by CTA')
                .child(
                  S.documentTypeList('outboundClick')
                    .title('By which button')
                    .defaultOrdering([
                      { field: 'source', direction: 'asc' },
                      { field: 'occurredAt', direction: 'desc' },
                    ]),
                ),
              S.listItem()
                .title('Grouped by page')
                .child(
                  S.documentTypeList('outboundClick')
                    .title('By page')
                    .defaultOrdering([
                      { field: 'pagePath', direction: 'asc' },
                      { field: 'occurredAt', direction: 'desc' },
                    ]),
                ),
              S.listItem()
                .title('Links missing a label')
                .child(
                  S.documentTypeList('outboundClick')
                    .title('Clicks on unlabelled links')
                    .filter('_type == "outboundClick" && source == "unlabelled-link"')
                    .defaultOrdering([{ field: 'occurredAt', direction: 'desc' }]),
                ),
            ]),
        ),

      ...S.documentTypeListItems().filter((item) => !HANDLED_TYPES.includes(item.getId() ?? '')),
    ])
