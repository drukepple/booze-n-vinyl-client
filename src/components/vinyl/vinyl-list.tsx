import { useLoadable } from '../../store/use-loadable';
import { vinyl as vinylSelector } from '../../store/vinyl';

export default function VinylList() {
  const vinyl = useLoadable(vinylSelector);
  return (
    <div>
      <h2>Library</h2>
      <div>
        Filters: Show All | Show in Library | Show Makeble
      </div>
      <div>
        {vinyl.data?.map(v => <li>{v.album}</li>)}
      </div>
    </div>
  );
}