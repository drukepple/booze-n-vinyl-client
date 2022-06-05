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
  ingredients: Booze[],
}

type MongoId = {
  _id: string,
}
type MongoCategory = Category & MongoId;
type MongoBooze = Booze & MongoId;



type PostResponse = {
  acknowledged: boolean,
  insertId: string,
}