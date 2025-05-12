export default {
  table: {
    apiSetting: {
      // Field name for current page
      pageField: 'page',
      // Field name for items per page
      sizeField: 'pageSize',
      // Field name for returned data list
      listField: 'list',
      // Field name for total pages
      totalField: 'pageCount',
      // Field name for total items
      countField: 'itemCount',
    },
    // Default page size
    defaultPageSize: 10,
    // Available page size options
    pageSizes: [10, 20, 30, 40, 50],
  },
  upload: {
    // Considering different API specifications
    apiSetting: {
      // Collection field name
      infoField: 'data',
      // Image URL field name
      imgField: 'photo',
    },
    // Maximum upload image size (MB)
    maxSize: 2,
    // Supported image file types
    fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml'],
  },
};
