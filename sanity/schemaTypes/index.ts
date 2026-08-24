import { type SchemaTypeDefinition } from 'sanity'

import { lead } from './lead'
import { outboundClick } from './outbound-click'
import { author } from './blog/author'
import { blogSettings } from './blog/blogSettings'
import { category } from './blog/category'
import {
  blogBody,
  blogCallout,
  blogCta,
  blogImage,
  blogQuote,
  blogTable,
} from './blog/objects'
import { post } from './blog/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Enquiries and contact signals.
    lead,
    outboundClick,
    // Blog documents.
    post,
    author,
    category,
    blogSettings,
    // Blog body blocks. Registered as named types so they show up with real
    // labels in the Studio's "Add item" menu rather than as "Object".
    blogBody,
    blogImage,
    blogCallout,
    blogTable,
    blogQuote,
    blogCta,
  ],
}
