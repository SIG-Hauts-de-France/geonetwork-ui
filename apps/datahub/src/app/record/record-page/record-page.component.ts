import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPageComponent implements OnDestroy {
  constructor(public mdViewFacade: MdViewFacade) {
    document.body.classList.add('record-page-active')
  }
  ngOnDestroy() {
    document.body.classList.remove('record-page-active')
  }
}
