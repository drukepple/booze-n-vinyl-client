type Method = 'get' | 'post' | 'patch' | 'delete';



export default function request<T>(method:Method, url:string, body?:T):Promise<T> {
  const opts:RequestInit = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (['post', 'patch'].includes(method)) {
    opts.body = JSON.stringify(body);
  }
  return fetch('http://localhost:5432' + url, opts).then(resp => {
    if (!resp.ok) throw new Error(resp.statusText);
    return resp.json() as Promise<T>;
  });
}

export function get<T> (url:string):Promise<T> {
  return request<T>('get', url);
}
export function post<T>(url: string, body: T): Promise<PostResponse> {
  return request<T>('post', url, body) as unknown as Promise<PostResponse>;
}
export function patch<T> (url:string, body:T):Promise<T> {
  return request<T>('patch', url, body);
}
export function deleet<T> (url:string):Promise<T> {
  return request<T>('delete', url);
}
