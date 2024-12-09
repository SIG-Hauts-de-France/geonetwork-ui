import { ChangeDetectionStrategy, Component } from '@angular/core'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { startWith } from 'rxjs/operators'

@Component({
  selector: 'datahub-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent {
  getContactMail(): string {
    return getGlobalConfig().CONTACT_EMAIL
  }
  recordsCount$ = this.catalogRecords.recordsCount$.pipe(startWith('-'))

  constructor(
    private catalogRecords: RecordsService
  ) {}
}
