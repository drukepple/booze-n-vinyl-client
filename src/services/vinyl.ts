import { get, post, patch, deleet } from './request';

export const getAllVinyl = async (): Promise<MongoVinyl[]> => {
  return await get<MongoVinyl[]>('/vinyl');
}

export const getVinyl = (id: string): Promise<MongoVinyl> => {
  return get<MongoVinyl>('/vinyl/' + id);
}

export const postVinyl = (vinyl: Vinyl): Promise<PostResponse> => {
  return post<Vinyl>('/vinyl', vinyl);
}

export const patchVinyl = (id: string, vinyl: Vinyl): Promise<Vinyl> => {
  return patch<Vinyl>('/vinyl/' + id, vinyl);
}

export const deleteVinyl = (id: string): Promise<Vinyl> => {
  return deleet<Vinyl>('/vinyl/' + id);
}
