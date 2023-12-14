// thematic-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldsService } from '@geonetwork-ui/feature/search';

@Component({
  selector: 'datahub-thematic-list',
  templateUrl: './thematic-list.component.html',
  styleUrls: ['./thematic-list.component.css']
})
export class ThematicListComponent implements OnInit {
  themes: {
    name: string;
    label: string;
    datasetCount: number;
  }[] = [];

  ngOnInit() {
    this.getTopicsWithDatasetCount();
  }

  constructor(
    private router: Router,
    private fieldsService: FieldsService
  ) {}

  navigateToSearch(tag: string): void {
    this.router.navigate(['/search'], { queryParams: { tag: tag } });
  }

  getTopicsWithDatasetCount(): void {
    const thematicField = 'tag';
    const themes_hdf = [
      'ADMINISTRATION', 'AMENAGEMENT', 'ECONOMIE',
      'EMPLOI', 'ENVIRONNEMENT', 'FORMATION',
      'REFERENTIEL', 'SOCIETE', 'TRANSPORT',
    ];
  
    this.fieldsService.getAvailableValues(thematicField).subscribe(themesAvailable => {
      for (const theme of themesAvailable) {
        const match = theme.label.match(/\((\d+)\)/);
        const datasetCount = match ? parseInt(match[1], 10) : 0;
        const name = theme.value.toString();
        const label = theme.label.replace(/\s*\(\d+\)\s*/, '');

        if (themes_hdf.includes(name)) {
          this.themes.push({
            name: name,
            label: label.trim() || 'Pas de thématique',
            datasetCount: datasetCount
          });
        }
      }
    });
  }

  getIconContent(themeName: string): string {
    switch (themeName) {
      case 'AMENAGEMENT':
        return '&#xe92c;';
      case 'FORMATION':
        return '&#xe97f;';
      case 'REFERENTIEL':
        return '&#xe929;';
      case 'ECONOMIE':
        return '&#xe922;';
      case 'ENVIRONNEMENT':
        return '&#xe932;';
      case 'TRANSPORT':
        return '&#xe93e;';
      case 'ADMINISTRATION':
        return '&#xe92a;';
      case 'SOCIETE':
        return '&#xe964;';
      case 'EMPLOI':
        return '&#xe90c;'
      default:
        return '&#xe985;';
    }
  }

}