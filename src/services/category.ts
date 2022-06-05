import { get, post, patch, deleet } from './request';


export const getCategories = async (): Promise<MongoCategory[]> => {
  return await get<MongoCategory[]>('/category');
}

export const getCategory = (id: string): Promise<MongoCategory> => {
  return get<MongoCategory>('/category/' + id);
}

export const postCategory = (name: string): Promise<PostResponse> => {
  return post<Category>('/category', { name });
}

export const patchCategory = (id:string, name: string): Promise<Category> => {
  return patch<Category>('/category/' + id, { name });
}

export const deleteCategory = (id: string): Promise<Category> => {
  return deleet<Category>('/category/' + id);
}

// const opts = createCrud<Category>('category', 'categories', '/category');
// function createCrud<T>(singular:string, plural:string, basePath:string) {
//   return {
//     // [`get${plural}`](): Promise<T[]> {
//     //   return get<T[]>(basePath);
//     // },
//     // [`get${singular}`](id: string): Promise<T> {
//     //   return get<T>(basePath + '/' + id);
//     // },
//     // [`post${singular}`](obj:T): Promise<T> {
//     //   return post<T>(basePath, obj);
//     // },
//     [`delete${singular}`](id: string): Promise<T> {
//       return deleet<T>(basePath + '/' + id);
//     },

//   }
// }

// export {getCategory, getCategories, postCategory}