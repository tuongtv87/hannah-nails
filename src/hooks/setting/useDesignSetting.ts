import { computed } from 'vue';
import { useDesignSettingStore } from '@/store/modules/designSetting';

export function useDesignSetting() {
  const designSettingStore = useDesignSettingStore();

  const getDarkTheme = computed(() => designSettingStore.darkTheme);

  const getAppTheme = computed(() => designSettingStore.appTheme);

  return {
    getDarkTheme,
    getAppTheme,
  };
}
