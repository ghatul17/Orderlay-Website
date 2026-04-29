import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'orderlay-blog',
  title: 'Orderlay Blog',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(
                S.list()
                  .title('Blog Posts')
                  .items([
                    S.listItem()
                      .title('All Posts')
                      .child(S.documentTypeList('post').title('All Posts')),
                    S.listItem()
                      .title('Featured Posts')
                      .child(
                        S.documentTypeList('post')
                          .title('Featured Posts')
                          .filter('_type == "post" && featured == true')
                      ),
                    S.listItem()
                      .title('Drafts')
                      .child(
                        S.documentTypeList('post')
                          .title('Draft Posts')
                          .filter('_type == "post" && !defined(publishedAt)')
                      ),
                  ])
              ),
            S.documentTypeListItem('author').title('Authors'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
