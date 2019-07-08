import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
// import { CARDS } from '../mock-cards';
import {
  ImageService,
  MemoryImage,
} from '../image.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy {
  private cards: MemoryImage[];

  private imagesSubscription: Subscription;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imagesSubscription = this.imageService
      .getShuffledMemoryImages()
      .subscribe(
        (data: MemoryImage[]) => {
          this.cards = [...data];
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }
}
