type Category = {
  name: string,
}
type Booze = {
  name: string,
  onHand: boolean,
  category: string,
}
type Vinyl = {
  artist: string,
  album: string,
  onHand: boolean,
  genre: string,
  page: number,
  year: number,
  ingredientsA: string[],
  ingredientsB: string[],
}

type MongoId = {
  _id: string,
}
type MongoCategory = Category & MongoId;
type MongoBooze = Booze & MongoId;
type MongoVinyl = Vinyl & MongoId;



type PostResponse = {
  acknowledged: boolean,
  insertId: string,
}