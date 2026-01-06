import { blockContentType } from './blockContentType';
import { postType } from './postType';
import { timelineType } from './timelineType';
import { productType } from './productType';

export const schema = {
  types: [blockContentType, timelineType, postType, productType],
};
