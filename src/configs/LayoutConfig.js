export const layoutDefault = {
  settings: {
    hasHeaders: true,
    constrainDragToContainer: true,
    reorderEnabled: true,
    selectionEnabled: false,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: true,
    showMaximiseIcon: true,
    showCloseIcon: false,
  },
  dimensions: {
    borderWidth: 8,
    minItemWidth: 400,
    minItemHeight: 250,
    headerHeight: 20,
    dragProxyWidth: 250,
    dragProxyHeight: 150,
  },
  labels: {
    close: 'close',
    maximise: 'maximise',
    minimise: 'minimise',
    popout: 'open in new window',
  },
  content: [],
};

export const render = {
  delay: 500,
};
export const calendar = {
  minWidth: 415,
  className: 'scrollCalendar',
};
export const nameSaveStateDefault = 'test2';

export const resolution = {
  MIN_SIZE: 1280,
  SMALL_SIZE: 1920,
  MEDIUM_SIZE: 2560,
  MAX_SIZE: 3840,
};

export const minSizeComponent = {
  MIN_SIZE: {
    minItemWidth: 300,
    minItemHeight: 180,
  },
  SMALL_SIZE: {
    minItemWidth: 400,
    minItemHeight: 250,
  },
  MEDIUM_SIZE: {
    minItemWidth: 500,
    minItemHeight: 320,
  },
  MAX_SIZE: {
    minItemWidth: 650,
    minItemHeight: 400,
  },
};

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};
