import { get, post, patch, deleet } from './request';

export const getAllBooze = async ():Promise<MongoBooze[]> => {
  return await get<MongoBooze[]>('/booze');
}

export const getBooze = (id:string):Promise<MongoBooze> => {
  return get<MongoBooze>('/booze/' + id);
}

export const postBooze = (booze:Booze): Promise<PostResponse> => {
  return post<Booze>('/booze', booze);
}

export const patchBooze = (id:string, booze: Booze): Promise<Booze> => {
  return patch<Booze>('/booze/' + id, booze);
}

export const deleteBooze = (id:string):Promise<Booze> => {
  return deleet<Booze>('/booze/' + id);
}
