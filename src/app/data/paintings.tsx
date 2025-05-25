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
  paintingSizeX: number;
  paintingSizeY: number;

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
    imageUrl: string,
    paintingSizeX: number,
    paintingSizeY: number
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
    this.paintingSizeX = paintingSizeX;
    this.paintingSizeY = paintingSizeY;
  }
}

export const painting = [
  new PaintingClass(
    "Iiro Partanen",
    "2024",
    "Suomi",
    "Finland",
    "Red bird",
    210,
    295,

    "10/02/2024",
    "akryyli",
    "acrylic",
    "red.jpeg",
    160,
    225
  ),
  new PaintingClass(
    "Iiro Partanen",
    "2024",
    "Suomi",
    "Finland",
    "blue bird",
    180,
    240,

    "14/02/2024",
    "akryyli",
    "acrylic",
    "blue.jpg",
    140,
    193
  ),
  new PaintingClass(
    "Iiro Partanen",
    "2025",
    "Suomi",
    "Finland",
    "three birds",
    210,
    295,

    "27/11/2025",
    "linoleum",
    "linoleum",
    "three.jpg",
    160,
    225
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
    "duck.jpg",
    120,
    120
  ),
  new PaintingClass(
    "Iiro Partanen",
    "2025",
    "Suomi",
    "Finland",
    "jungle",
    295,
    420,

    "25/05/2025",
    "akryyli",
    "acrylic",
    "jungle2.jpeg",
    232,
    330
  ),
  new PaintingClass(
    "Iiro Partanen",
    "2025",
    "Suomi",
    "Finland",
    "palm",
    150,
    210,

    "18/05/2025",
    "akryyli",
    "acrylic",
    "palm.jpeg",
    118,
    165
  ),
];
