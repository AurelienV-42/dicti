import { Text, View } from "react-native";
import renderer, { act } from "react-test-renderer";

// Simple component for testing
const ExampleComponent = () => (
  <View>
    <Text>Hello, Expo!</Text>
  </View>
);

describe("ExampleComponent", () => {
  it("renders correctly", () => {
    let tree;
    act(() => {
      tree = renderer.create(<ExampleComponent />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
