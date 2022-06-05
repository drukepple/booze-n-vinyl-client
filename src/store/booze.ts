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