import { blockContentType } from './blockContentType';
import { postType } from './postType';
import { timelineType } from './timelineType';
import { productType } from './productType';
import { recipeType } from './reciepeType';

export const schema = {
  types: [blockContentType, timelineType, postType, productType, recipeType],
};
