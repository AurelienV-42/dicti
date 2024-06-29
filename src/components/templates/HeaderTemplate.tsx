import { ReactNode } from "react";
import { View } from "react-native";
import BackButton from "../buttons/BackButton";
import MyText from "../natives/MyText";

interface HeaderTemplateProps {
  tight?: boolean;
  className?: string;
  logo?: boolean;
  title?: string;
  titleComponent?: ReactNode;
  canGoBack?: boolean;
  children?: ReactNode;
  rightComponent?: ReactNode;
}

const HeaderTemplate = ({
  className,
  tight = false,
  title,
  titleComponent,
  canGoBack = false,
  children,
  rightComponent,
}: HeaderTemplateProps) => {
  const Title = () => (
    <>
      {titleComponent && titleComponent}
      {!titleComponent && title && <MyText style={"text-2xl"}>{title}</MyText>}
    </>
  );

  return (
    <View
      className={`w-full justify-between items-center flex-row pb-4 ${tight && "px-3"} ${className}`}
    >
      <View
        className={`${canGoBack && "-ml-2"} flex-row items-center justify-between`}
      >
        {canGoBack && <BackButton />}
      </View>
      <Title />
      {children}
      {rightComponent ? rightComponent : <View className="w-7" />}
    </View>
  );
};

export default HeaderTemplate;
