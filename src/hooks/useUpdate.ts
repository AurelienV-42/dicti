import useExpoUpdate from "@hooks/useExpoUpdate";
import useStoreUpdate from "@hooks/useStoreUpdate";

const useUpdate = () => {
  const { isStoreUpdateAvailable, handleStoreUpdatePress } = useStoreUpdate();
  const { isExpoUpdateAvailable, isExpoDownloading, handleExpoUpdatePress } =
    useExpoUpdate();

  return {
    updateType: isExpoUpdateAvailable ? "expo" : "store",
    showModal: isExpoUpdateAvailable || isStoreUpdateAvailable,
    handleUpdatePress: isStoreUpdateAvailable
      ? handleStoreUpdatePress
      : handleExpoUpdatePress,
    isLoading: isExpoDownloading,
  };
};

export default useUpdate;
