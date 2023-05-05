import { useContext } from 'react';
import { RouteContext } from '../contexts';
import { STATE_KEY_SHOW_MODAL } from '../const';
import { usePopout } from './hooks';

export interface ActiveVkuiLocationObject {
  root?: string;
  view?: string;
  panel?: string;
  modal?: string;
  hasOverlay?: boolean;
  panelsHistory?: string[];
}

export function useActiveVkuiLocation(): ActiveVkuiLocationObject {
  const routeContext = useContext(RouteContext);
  const popout = usePopout();
  const { match, state, panelsHistory } = routeContext;
  const route = match?.route;
  const modal = state.location.state?.[STATE_KEY_SHOW_MODAL] ?? (route && 'modal' in route ? route.modal : undefined);
  return {
    root: route && 'root' in route ? route.root : undefined,
    view: route?.view,
    panel: route?.panel,
    modal,
    hasOverlay: Boolean(modal || popout),
    panelsHistory,
  };
}