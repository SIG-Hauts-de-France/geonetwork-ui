import { Component, Input, OnInit } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  SortByEnum,
  SortByField,
} from '@geonetwork-ui/common/domain/model/search'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { filter, map } from 'rxjs/operators'

interface SortChoice {
  label: string
  value: string
}

@Component({
  selector: 'gn-ui-sort-by',
  templateUrl: './sort-by.component.html',
})
export class SortByComponent implements OnInit {
  @Input() isQualitySortable: boolean
  choices: SortChoice[] = [
    {
      label: marker('results.sortBy.relevancy'),
      value: SortByEnum.RELEVANCY.join(','),
    },
    {
      label: marker('results.sortBy.dateStamp'),
      value: SortByEnum.CREATE_DATE.join(','),
    },
    {
      label: marker('results.sortBy.dateStampAsc'),
      value: SortByEnum.CREATE_DATE_ASC.join(','),
    },
    {
      label: marker('results.sortBy.dateChange'),
      value: SortByEnum.CHANGE_DATE.join(','),
    },
    {
      label: marker('results.sortBy.dateChangeAsc'),
      value: SortByEnum.CHANGE_DATE_ASC.join(','),
    },
    {
      label: marker('results.sortBy.titleAsc'),
      value: SortByEnum.TITLE_ASC.join(','),
    },
    {
      label: marker('results.sortBy.title'),
      value: SortByEnum.TITLE.join(','),
    },
    {
      label: marker('results.sortBy.vue'),
      value: SortByEnum.VUE.join(','),
    },
    {
      label: marker('results.sortBy.vueAsc'),
      value: SortByEnum.VUE_ASC.join(','),
    },
    {
      label: marker('results.sortBy.popularity'),
      value: SortByEnum.POPULARITY.join(','),
    },
    {
      label: marker('results.sortBy.popularityAsc'),
      value: SortByEnum.POPULARITY_ASC.join(','),
    },
    // {
    //   label: marker('results.sortBy.qualityScore'),
    //   value: SortByEnum.QUALITY_SCORE.join(','),
    // },
    // {
    //   label: marker('results.sortBy.qualityScoreAsc'),
    //   value: SortByEnum.QUALITY_SCORE_ASC.join(','),
    // },
  ]
  currentSortBy$ = this.facade.sortBy$.pipe(
    filter((sortBy) => !!sortBy),
    map((sortBy) => sortBy.join(','))
  )

  constructor(
    private facade: SearchFacade,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (this.isQualitySortable) {
      this.choices.push({
        label: marker('results.sortBy.qualityScore'),
        value: SortByEnum.QUALITY_SCORE.join(','),
      })
    }
  }

  changeSortBy(criteriaAsString: string) {
    this.searchService.setSortBy(criteriaAsString.split(',') as SortByField)
  }
}
