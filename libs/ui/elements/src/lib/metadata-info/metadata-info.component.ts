import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  DatasetRecord,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'
import { getTemporalRangeUnion } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataInfoComponent {
  @Input() metadata: Partial<DatasetRecord>
  @Input() incomplete: boolean
  @Output() keyword = new EventEmitter<Keyword>()
  @Output() otherKeyword = new EventEmitter<string>()
  @Output() placeKeyword = new EventEmitter<string>()
  @Output() themeSIG = new EventEmitter<string>()
  updatedTimes: number

  get hasUsage() {
    return (
      this.metadata.extras?.isOpenData === true ||
      (this.metadata.legalConstraints?.length > 0 &&
        this.legalConstraints.length > 0) ||
      (this.metadata.otherConstraints?.length > 0 &&
        this.otherConstraints.length > 0) ||
      (this.metadata.licenses?.length > 0 && this.licenses.length > 0)
    )
  }

  get legalConstraints() {
    let array = []
    if (this.metadata.legalConstraints?.length) {
      array = array.concat(
        this.metadata.legalConstraints.filter((c) => c.text).map((c) => c.text)
      )
    }
    return array
  }

  get otherConstraints() {
    let array = []
    if (this.metadata.otherConstraints?.length) {
      array = array.concat(
        this.metadata.otherConstraints.filter((c) => c.text).map((c) => c.text)
      )
    }
    return array
  }

  get licenses(): { text: string; url: string }[] {
    let array = []
    if (this.metadata.licenses?.length) {
      array = array.concat(
        this.metadata.licenses
          .filter((c) => c.text)
          .map((c) => ({ text: c.text, url: c.url }))
      )
    }
    return array
  }

  get updateFrequency(): string {
    if (this.metadata.updateFrequency instanceof Object) {
      this.updatedTimes = this.metadata.updateFrequency.updatedTimes
      return `domain.record.updateFrequency.${this.metadata.updateFrequency.per}`
    } else if (typeof this.metadata.updateFrequency === 'string') {
      return `domain.record.updateFrequency.${this.metadata.updateFrequency}`
    } else {
      return undefined
    }
  }

  get temporalExtent(): { start: string; end: string } {
    const temporalExtents = this.metadata.temporalExtents
    return getTemporalRangeUnion(temporalExtents)
  }

  get shownOrganization() {
    return this.metadata.ownerOrganization
  }

  get resourceContact() {
    return this.metadata.contactsForResource?.[0]
  }

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }

  onKeywordClick(keyword: Keyword) {
    this.keyword.emit(keyword)
  }
  
  onPlaceKeywordClick(keyword: string) {
    this.placeKeyword.emit(keyword);
  }

  onOtherKeywordClick(keyword: string) {
    this.otherKeyword.emit(keyword)
  }

  onThemeSIGClick(theme: string) {
    this.themeSIG.emit(theme)
  }

  private isLessOneMonth(date: Date) {
    const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date().getTime();
    const recordCreatedDate = date?.getTime() || 0;
    const difference = currentDate - recordCreatedDate;
    return difference < oneMonthInMillis;
  }

  get isNew(): boolean {
    return this.isLessOneMonth(this.metadata.recordCreated);
  }

  get isUpdated(): boolean {
    return this.isLessOneMonth(this.metadata.resourceUpdated);
  }
}
