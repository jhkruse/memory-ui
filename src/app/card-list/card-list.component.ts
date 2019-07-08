import { Component, OnInit } from '@angular/core';
// import { CARDS } from '../mock-cards';
import {
  ImageService,
  MemoryImage,
} from '../image.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  private cards: MemoryImage[];

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService
      .getShuffledMemoryImages()
      .subscribe(
        (data: MemoryImage[]) => {
          this.cards = data;
        },
        err => console.log(err)
      );
  }

}
