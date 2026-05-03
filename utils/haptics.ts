import * as Haptics from 'expo-haptics';

export const triggerSuccessHaptic = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.warn("Haptics not available on this device", error);
  }
};

export const triggerTickHaptic = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    console.warn("Haptics not available on this device", error);
  }
};
