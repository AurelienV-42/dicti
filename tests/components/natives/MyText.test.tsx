import { render } from "@testing-library/react-native";
import MyText from "@components/natives/MyText";

describe("MyText", () => {
  it("renders correctly", () => {
    const { getByText } = render(<MyText>Test Text</MyText>);
    const textElement = getByText("Test Text");
    expect(textElement).toBeTruthy();
  });

  // Add more tests as needed
});
