import { Component, EventEmitter, Input, Output } from '@angular/core'
import * as basicLightbox from 'basiclightbox'
import { FitOptions } from '../thumbnail/thumbnail.component'

@Component({
  selector: 'gn-ui-image-overlay-preview',
  templateUrl: './image-overlay-preview.component.html',
  styleUrls: ['./image-overlay-preview.component.css'],
})
export class ImageOverlayPreviewComponent {
  @Input() imageUrl: string
  @Input() fit:FitOptions = "cover"
  @Output() isPlaceholderShown = new EventEmitter<boolean>()
  openLightbox(src: string) {
    basicLightbox.create(`<img src="${src}"/>`).show()
  }
}
