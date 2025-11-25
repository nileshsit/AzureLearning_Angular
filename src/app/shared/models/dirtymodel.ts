import { Observable } from 'rxjs';

export declare interface DirtyModelComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}