import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { Component, ReactNode } from "react";
import { View } from "react-native";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <MyText className="mb-4 text-center text-xl font-semibold text-gray-900">
            Une erreur est survenue
          </MyText>
          <MyButton txt="Reessayer" onPress={this.handleRetry} />
        </View>
      );
    }

    return this.props.children;
  }
}
