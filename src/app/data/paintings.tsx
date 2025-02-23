export class PaintingClass {
  author: string;
  year: string;
  countryFin: string;
  countryEng: string;
  name: string;
  sizeX: number;
  sizeY: number;
  date: string;
  typeFin: string;
  typeEng: string;
  imageUrl: string;

  constructor(
    author: string,
    year: string,
    countryFin: string,
    countryEng: string,
    name: string,
    sizeX: number,
    sizeY: number,
    date: string,
    typeFin: string,
    typeEng: string,
    imageUrl: string
  ) {
    this.author = author;
    this.year = year;
    this.countryFin = countryFin;
    this.countryEng = countryEng;
    this.name = name;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.date = date;
    this.typeFin = typeFin;
    this.typeEng = typeEng;
    this.imageUrl = imageUrl;
  }
}

export const painting = [
  new PaintingClass(
    "Iiro Partanen",
    "2024",
    "Suomi",
    "Finland",
    "Red bird",
    295,
    210,
    "10/02/2024",
    "akryyli",
    "acrylic",
    "red.jpeg"
  ),
  new PaintingClass(
    "Iiro Partanen",
    "2024",
    "Suomi",
    "Finland",
    "blue bird",
    240,
    180,
    "14/02/2024",
    "akryyli",
    "acrylic",
    "blue.jpg"
  ),
  new PaintingClass(
    "Iiro Partanen",
    "2025",
    "Suomi",
    "Finland",
    "three birds",
    295,
    210,
    "27/11/2025",
    "linoleum",
    "linoleum",
    "three.jpg"
  ),
  new PaintingClass(
    "Iiro Partanen",
    "2024",
    "Suomi",
    "Finland",
    "duck",
    150,
    150,
    "15/09/2024",
    "akryyli",
    "acrylic",
    "duck.jpg"
  ),
];
