import { SortByField } from './search.model'

export const SortByEnum: Record<string, SortByField> = {
  CHANGE_DATE: ['desc', 'changeDate'],
  CHANGE_DATE_ASC: ['asc', 'changeDate'],
  CREATE_DATE: ['desc', 'createDate'],
  CREATE_DATE_ASC: ['asc', 'createDate'],
  POPULARITY: ['desc', 'userSavedCount'],
  POPULARITY_ASC: ['asc', 'userSavedCount'],
  VUE: ['desc', 'popularity'],
  VUE_ASC: ['asc', 'popularity'],
  QUALITY_SCORE: ['desc', 'qualityScore'],
  QUALITY_SCORE_ASC: ['asc', 'qualityScore'],
  RELEVANCY: ['desc', '_score'],
  TITLE: ['desc', 'resourceTitleObject.default.keyword'],
  TITLE_ASC: ['asc', 'resourceTitleObject.default.keyword'],
}
