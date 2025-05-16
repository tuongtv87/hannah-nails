const setting = {
  // Navigation mode: vertical (left menu mode) or horizontal (top menu mode)
  navMode: 'vertical',
  // Navigation theme: dark (dark sidebar), light (white sidebar), header-dark (dark top bar)
  navTheme: 'dark',
  // Whether in mobile mode
  isMobile: false,
  // Header
  headerSetting: {
    // Background color
    bgColor: '#fff',
    // Fixed header
    fixed: true,
    // Show reload button
    isReload: true,
  },
  // Footer
  showFooter: true,
  // Multi-tabs
  multiTabsSetting: {
    // Background color
    bgColor: '#fff',
    // Whether to display
    show: true,
    // Fixed multi-tabs
    fixed: true,
  },
  // Menu
  menuSetting: {
    // Minimum width
    minMenuWidth: 64,
    // Menu width
    menuWidth: 200,
    // Fixed menu
    fixed: true,
    // Split menu
    mixMenu: false,
    // Width to trigger mobile sidebar
    mobileWidth: 800,
    // Collapsed menu
    collapsed: false,
  },
  // Breadcrumbs
  crumbsSetting: {
    // Whether to display
    show: true,
    // Show icon
    showIcon: false,
  },
  // Menu permission mode: FIXED (frontend fixed routes) or BACK (dynamically fetched)
  permissionMode: 'FIXED',
  // Whether to enable route animation
  isPageAnimate: true,
  // Route animation type
  pageAnimateType: 'zoom-fade',
};
export default setting;
