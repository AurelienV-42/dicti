import { Text, View } from "react-native";
import renderer from "react-test-renderer";

// Simple component for testing
const ExampleComponent = () => (
  <View>
    <Text>Hello, Expo!</Text>
  </View>
);

describe("ExampleComponent", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ExampleComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
