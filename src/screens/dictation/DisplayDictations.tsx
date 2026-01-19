import { useGrades } from "@api/grades.hook";
import rawDictations, { Dictation } from "@config/dictations";
import DisplayDictation from "@screens/dictation/DisplayDictation";
import { useAuth } from "@stores/auth.store";
import { useMemo } from "react";
import { FlatList } from "react-native";

const DisplayDictations = () => {
  const { user } = useAuth();
  const { data: gradesData } = useGrades(user?.id ?? "");

  const dictations: Dictation[] = useMemo(() => {
    if (!gradesData?.grades) return rawDictations;

    return rawDictations.map((item) => {
      const grade = gradesData.grades?.find((r) => r.dictation_id === item.id);
      return {
        ...item,
        grade: grade ? grade.grade_on_20 : undefined,
      };
    });
  }, [gradesData?.grades]);

  return (
    <FlatList
      contentContainerStyle={{
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
      data={dictations.sort((a, b) => a.level - b.level)}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => <DisplayDictation item={item} />}
    />
  );
};

export default DisplayDictations;
