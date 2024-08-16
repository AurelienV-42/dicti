jest.mock("react-native-purchases", () => ({
  Purchases: {
    setup: jest.fn(),
    addPurchaserInfoUpdateListener: jest.fn(),
    removePurchaserInfoUpdateListener: jest.fn(),
    getOfferings: jest.fn(),
    purchasePackage: jest.fn(),
    restoreTransactions: jest.fn(),
  },
}));
