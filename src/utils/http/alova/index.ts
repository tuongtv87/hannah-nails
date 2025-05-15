import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import adapterFetch from 'alova/fetch';
import { createAlovaMockAdapter } from '@alova/mock';
import { isString } from 'lodash-es';
import mocks from './mocks';
import { useUser } from '@/store/modules/user';
import { storage } from '@/utils/Storage';
import { useGlobSetting } from '@/hooks/setting';
import { PageEnum } from '@/enums/pageEnum';
import { ResultEnum } from '@/enums/httpEnum';
import { isUrl } from '@/utils';

const { useMock, apiUrl, urlPrefix, loggerMock } = useGlobSetting();

const mockAdapter = createAlovaMockAdapter([...mocks], {
  // Global control whether to enable mock interface, default is true
  enable: useMock,

  // Non-mock request adapter, used when no mock interface matches
  httpAdapter: adapterFetch(),

  // Mock interface response delay in milliseconds
  delay: 1000,

  // Custom print mock interface request information
  // mockRequestLogger: (res) => {
  //   loggerMock && console.log(`Mock Request ${res.url}`, res);
  // },
  mockRequestLogger: loggerMock,
  onMockError(error, currentMethod) {
    console.error('🚀 ~ onMockError ~ currentMethod:', currentMethod);
    console.error('🚀 ~ onMockError ~ error:', error);
  },
});

export const Alova = createAlova({
  baseURL: apiUrl,
  statesHook: VueHook,
  // Disable global request caching
  // cacheFor: null,
  // Global cache configuration
  // cacheFor: {
  //   POST: {
  //     mode: 'memory',
  //     expire: 60 * 10 * 1000
  //   },
  //   GET: {
  //     mode: 'memory',
  //     expire: 60 * 10 * 1000
  //   },
  //   HEAD: 60 * 10 * 1000 // Unified setting for HEAD request cache mode
  // },
  // Enable cache hit logging in development environment
  cacheLogger: process.env.NODE_ENV === 'development',
  requestAdapter: mockAdapter,
  beforeRequest(method) {
    const userStore = useUser();
    const token = userStore.getToken;
    // Add token to request header
    if (!method.meta?.ignoreToken && token) {
      method.config.headers['token'] = token;
    }
    // Handle API request prefix
    const isUrlStr = isUrl(method.url as string);
    if (!isUrlStr && urlPrefix) {
      method.url = `${urlPrefix}${method.url}`;
    }
    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      method.url = `${apiUrl}${method.url}`;
    }
  },
  responded: {
    onSuccess: async (response, method) => {
      const res = (response.json && (await response.json())) || response.body;

      // Whether to return native response header, e.g. when response header is needed
      if (method.meta?.isReturnNativeResponse) {
        return res;
      }
      // Please modify data structure according to your needs
      const { message, code, result } = res;

      // Return directly without any processing
      // Used when direct access to code, result, message is needed
      if (method.meta?.isTransformResponse === false) {
        return res.data;
      }

      // @ts-ignore
      const Message = window.$message;
      // @ts-ignore
      const Modal = window.$dialog;

      const LoginPath = PageEnum.BASE_LOGIN;
      if (ResultEnum.SUCCESS === code) {
        return result;
      }
      // Login required
      if (code === 912) {
        Modal?.warning({
          title: 'Notification',
          content: 'Login session has expired, please login again!',
          okText: 'Confirm',
          closable: false,
          maskClosable: false,
          onOk: async () => {
            storage.clear();
            window.location.href = LoginPath;
          },
        });
      } else {
        // Handle errors as needed, generally not 912 errors, may not need to show message
        Message?.error(message);
        throw new Error(message);
      }
    },
  },
});

// Project with multiple different API addresses, can export multiple instances
// export const AlovaTwo = createAlova({
//   baseURL: 'http://localhost:9001',
// });
