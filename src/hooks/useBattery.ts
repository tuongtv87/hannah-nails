import { computed, onMounted, reactive, toRefs } from 'vue';

interface Battery {
  charging: boolean; // Whether the battery is currently charging
  chargingTime: number; // Seconds until the battery is fully charged, 0 if already full
  dischargingTime: number; // Seconds until the battery is completely discharged and suspended
  level: number; // Battery level, a value between 0.0 and 1.0
  [key: string]: any;
}

export const useBattery = () => {
  const state = reactive({
    battery: {
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
      level: 100,
    },
  });

  // Update battery status
  const updateBattery = (target) => {
    for (const key in state.battery) {
      state.battery[key] = target[key];
    }
    state.battery.level = state.battery.level * 100;
  };

  // Calculate remaining battery time
  const calcDischargingTime = computed(() => {
    const hour = state.battery.dischargingTime / 3600;
    const minute = (state.battery.dischargingTime / 60) % 60;
    return `${~~hour}h ${~~minute}m`;
  });

  // Calculate remaining charging time
  const calcChargingTime = computed(() => {
    console.log(state.battery);
    const hour = state.battery.chargingTime / 3600;
    const minute = (state.battery.chargingTime / 60) % 60;
    return `${~~hour}h ${~~minute}m`;
  });

  // Battery status
  const batteryStatus = computed(() => {
    if (state.battery.charging && state.battery.level >= 100) {
      return 'Fully charged';
    } else if (state.battery.charging) {
      return 'Charging';
    } else {
      return 'Not charging';
    }
  });

  onMounted(async () => {
    const BatteryManager: Battery = await (window.navigator as any).getBattery();
    updateBattery(BatteryManager);

    // Called when the battery charging status changes
    BatteryManager.onchargingchange = ({ target }) => {
      updateBattery(target);
    };
    // Called when the battery charging time changes
    BatteryManager.onchargingtimechange = ({ target }) => {
      updateBattery(target);
    };
    // Called when the battery discharging time changes
    BatteryManager.ondischargingtimechange = ({ target }) => {
      updateBattery(target);
    };
    // Called when the battery level changes
    BatteryManager.onlevelchange = ({ target }) => {
      updateBattery(target);
    };

    // Example for date formatting:
    // new Intl.DateTimeFormat('en', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: false
    // }).format(new Date())
  });

  return {
    ...toRefs(state),
    batteryStatus,
    calcDischargingTime,
    calcChargingTime,
  };
};
