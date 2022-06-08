import { selector, selectorFamily } from "recoil";
import { getAllBooze } from "../services/booze";
import { getCategories, getCategory } from "../services/category";


export const categories = selector({
  key: "booze/categories",
  get: async () => {
    console.log('categories selector');
    return await getCategories();
  },
});

export const booze = selector({
  key: "booze/all",
  get: async () => {
    console.log('booze selector');
    return await getAllBooze();
  }
})

export const boozeFromIds = selectorFamily({
  key: "booze/from-id",
  get: (ids:string[]) => async ({get}) => {
    const boozeMap = get(boozeById);
    return ids.map(id => boozeMap[id]);
  }
})

function toMap<T>(array:MongoId[]):Record<string, T> {
  return array.reduce((acc: Record<string, MongoId>, item:MongoId) => {
    acc[item._id] = item;
    return acc;
  }, {}) as unknown as Record<string, T>
}
// function toMap<T>(array:T[]):Record<string, T> {
//   return array.reduce((acc: Record<string, T>, item:T) => {
//     const itemId = item as MongoId;
//     acc[itemId._id] = item;
//     return acc;
//   }, {})
// }


export const boozeById = selector<Record<string, MongoBooze>>({
  key: "booze/map",
  get: async({get}) => {
    const boozes = get(booze);
    return toMap<MongoBooze>(boozes)
  }
})

export const categoriesById = selector({
  key: "booze/categories/map",
  get: async({get}) => {
    const cats = get(categories);
    const catsById = cats.reduce((acc: Record<string, Category>, cat) => {
      acc[cat._id] = cat;
      return acc;
    }, {});
    return catsById;
  }
})

export const categoryById = selectorFamily({
  key: "booze/categories/id",
  get: (id:string) => async ({get}) => {
    const catsById = get(categoriesById);
    // const cats = get(categories);
    // const catsById = cats.reduce((acc:Record<string, Category>, cat) => {
    //   acc[cat._id] = cat;
    //   return acc;
    // }, {});
    if (catsById[id]) { return catsById[id]; }

    const cat = await getCategory(id);
    return cat;
  }
})