// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('timeline').title('Timeline'),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('recipe').title('Recipes'),
      S.documentTypeListItem('banner').title('Banners'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['timeline', 'product', 'recipe', 'banner'].includes(item.getId()),
      ),
    ])
