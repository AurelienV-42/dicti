import { ReactNode } from "react";
import { View } from "react-native";
import BackButton from "../BackButton";
import MyText from "../texts/MyText";

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
  logo = false,
  title,
  titleComponent,
  canGoBack = false,
  children,
  rightComponent,
}: HeaderTemplateProps) => {
  const Title = () => (
    <>
      {titleComponent && titleComponent}
      {!titleComponent && title && (
        <MyText className={"text-2xl flex-1"} weight="semiBold">
          {title}
        </MyText>
      )}
      {!titleComponent && logo && (
        <MyText className={"text-[38px] flex-1"} weight="semiBold">
          Dicti
        </MyText>
      )}
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
        <Title />
      </View>
      {children}
      {rightComponent && rightComponent}
    </View>
  );
};

export default HeaderTemplate;
