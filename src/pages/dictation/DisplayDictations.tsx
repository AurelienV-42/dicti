import rawDictations, { Dictation } from "@config/dictations";
import { useAuth } from "@src/context/Auth";
import { getGradesByUserId } from "@src/queries/grades.query";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import DisplayDictation from "./DisplayDictation";

const DisplayDictations = () => {
  const [dictations, setDictations] = useState<Dictation[]>(rawDictations);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    getGradesByUserId(user.id).then((result) => {
      const dictationWithGrades = rawDictations.map((item) => {
        const grade = result.grades.find(
          (r: any) => r.dictation_id === item.id,
        );
        return {
          ...item,
          grade: grade ? grade.gradeOn20 : undefined,
        };
      });

      setDictations(dictationWithGrades);
    });
  }, [user]);

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
