// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Plants & Manufacturers Page')
        .id('plantsManufacturersPage')
        .child(
          S.document()
            .schemaType('plantsManufacturersPage')
            .documentId('plantsManufacturersPage'),
        ),
      S.documentTypeListItem('plantLocation').title('Plant Locations'),
      S.divider(),
      S.documentTypeListItem('timeline').title('Timeline'),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('recipe').title('Recipes'),
      S.documentTypeListItem('banner').title('Banners'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'plantsManufacturersPage',
            'plantLocation',
            'timeline',
            'product',
            'recipe',
            'banner',
          ].includes(item.getId()),
      ),
    ])
