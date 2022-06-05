import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";

export function useLoadable<T>(state: RecoilValueReadOnly<T>) {
  const loadable = useRecoilValueLoadable(state);
  // console.log('Use loadable: ', loadable.state);
  // console.log(loadable.contents);
  return {
    loading: loadable.state === 'loading',
    error: loadable.state === 'hasError' ? loadable.contents : undefined,
    data: loadable.state === 'hasValue' ? loadable.contents : undefined,
  };
}