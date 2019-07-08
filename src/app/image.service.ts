import { Injectable } from '@angular/core';

const BASE_URL = 'https://picsum.photos';
const LIST_URL = `${BASE_URL}/v2/list`;

interface PicsumImage {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  async createRandomImageUrls(imageSize: number = 200, imageAmount: number = 5) {
    const result = await fetch(`${LIST_URL}?limit=${imageAmount}`);
    const images: Array<PicsumImage> = await result.json();
    return images.map(image => `${BASE_URL}/id/${image.id}/${imageSize}`);
  }
}
