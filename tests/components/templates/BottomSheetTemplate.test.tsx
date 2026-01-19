import { render } from "@testing-library/react-native";
import BottomSheetTemplate from "@components/templates/BottomSheetTemplate";
import { Text } from "react-native";

jest.mock("@lodev09/react-native-true-sheet", () => ({
  TrueSheet: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

describe("BottomSheetTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <BottomSheetTemplate visible={true} onClose={jest.fn()}>
        <Text>Test Content</Text>
      </BottomSheetTemplate>,
    );

    expect(getByText("Test Content")).toBeTruthy();
  });

  it("renders with custom height prop", () => {
    const { getByText } = render(
      <BottomSheetTemplate visible={true} onClose={jest.fn()} height={400}>
        <Text>Custom Height</Text>
      </BottomSheetTemplate>,
    );

    expect(getByText("Custom Height")).toBeTruthy();
  });

  it("renders with scrollable prop", () => {
    const { getByText } = render(
      <BottomSheetTemplate visible={false} onClose={jest.fn()} scrollable>
        <Text>Scrollable Content</Text>
      </BottomSheetTemplate>,
    );

    expect(getByText("Scrollable Content")).toBeTruthy();
  });
});
