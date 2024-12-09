import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  ROUTER_ROUTE_SEARCH,
  RouterFacade,
} from '@geonetwork-ui/feature/router'
import { map } from 'rxjs/operators'
import {
  ROUTER_ROUTE_NEWS,
} from '../../router/constants'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'

marker('datahub.header.news')
marker('datahub.header.datasets')
marker('datahub.header.organisations')

@Component({
  selector: 'datahub-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMenuComponent {
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  open = ''
  displayMobileMenu = false
  tabLinks = [
    {
      link: `${ROUTER_ROUTE_NEWS}`,
      label: 'datahub.header.news',
    },
    {
      link: `${ROUTER_ROUTE_SEARCH}`,
      label: 'datahub.header.datasets',
    },
    {
      children: [
        {
          link: 'https://sig.hautsdefrance.fr/ext/opendata/web/presentation.html',
          label: 'datahub.header.presentation',
        },
        {
          link: 'https://sig.hautsdefrance.fr/ext/opendata/web/documents-cadres.html',
          label: 'datahub.header.documentsCadres',
        },
        {
          link:'https://sig.hautsdefrance.fr/ext/opendata/web/mentions-legales.html',
          label:'datahub.header.mentionsLegales',
        },
        {
          link: 'https://sig.hautsdefrance.fr/ext/opendata/web/contact.html',
          label: 'datahub.header.contact',
        },
        {
          link:'https://sig.hautsdefrance.fr/ext/opendata/web/datahub-regional.html',
          label:'datahub.header.datahubRegional',
        }
      ],
      label: 'datahub.header.approach',
    }
  ]

  activeLink$ = this.routerFacade.currentRoute$.pipe(
    map(
      (route) =>
        this.tabLinks.find((tab) => tab.link === route.url[0].path) || {
          link: '',
          label: '',
        }
    )
  )

  constructor(private routerFacade: RouterFacade) {}

  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }

}
