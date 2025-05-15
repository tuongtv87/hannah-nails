export interface ProjectSettingState {
  // Navigation mode
  navMode: string;
  // Navigation theme
  navTheme: string;
  // Header settings
  headerSetting: object;
  // Footer
  showFooter: boolean;
  // Menu settings
  menuSetting: object;
  // Multi-tabs
  multiTabsSetting: object;
  // Breadcrumbs
  crumbsSetting: object;
  // Permission mode
  permissionMode: string;
}

export interface IBodySetting {
  fixed: boolean;
}

export interface IHeaderSetting {
  bgColor: string;
  fixed: boolean;
  isReload: boolean;
}

export interface IMenuSetting {
  minMenuWidth: number;
  menuWidth: number;
  fixed: boolean;
  mixMenu: boolean;
  collapsed: boolean;
  mobileWidth: number;
}

export interface ICrumbsSetting {
  show: boolean;
  showIcon: boolean;
}

export interface IMultiTabsSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
}
export interface GlobConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  urlPrefix?: string;
  uploadUrl?: string;
  useMock: boolean;
  fileUrl?: string;
  loggerMock: boolean;
}

export interface GlobEnvConfig {
  // Title
  VITE_GLOB_APP_TITLE: string;
  // API URL
  VITE_GLOB_API_URL: string;
  // API URL prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Website short name
  VITE_GLOB_APP_SHORT_NAME: string;
  // File upload URL
  VITE_GLOB_UPLOAD_URL?: string;
  // File URL prefix
  VITE_GLOB_FILE_URL?: string;
  // Enable mock
  VITE_USE_MOCK: string;
  // Enable console logging of mock request info
  VITE_LOGGER_MOCK: string;
}
