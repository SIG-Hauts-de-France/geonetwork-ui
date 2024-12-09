import { Component, ChangeDetectionStrategy } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('approach.headers.presentation')
marker('approach.headers.documents')
marker('approach.headers.legal')
marker('approach.headers.contact')
marker('approach.headers.geo2france')

@Component({
  selector: 'datahub-navigation-approach',
  templateUrl: './navigation-approach.component.html',
  styleUrls: ['./navigation-approach.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationApproachComponent {

  displayMobileMenu = false
  anchorLinks = [
    {
      anchor: 'presentation',
      label: 'approach.headers.presentation',
    },
    {
      anchor: 'documents',
      label: 'approach.headers.documents',
    },
    {
      anchor: 'legal',
      label: 'approach.headers.legal',
    },
    {
      anchor: 'contact',
      label: 'approach.headers.contact',
    },
    {
      anchor: 'geo2france',
      label: 'approach.headers.geo2france',
    },
  ]
  activeLabel = this.anchorLinks[0].label
  setActiveLabel(el: HTMLElement) {
    const disabledClass = el.getAttribute('gnUiAnchorLinkDisabledClass')
    const disabled = new RegExp(disabledClass).test(el.className)
    if (!disabled) this.activeLabel = el.textContent
  }
  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }
}
