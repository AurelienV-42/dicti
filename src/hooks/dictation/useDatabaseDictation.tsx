import assets from "@assets/index";
import dictations, { Dictation } from "@config/dictations";
import { useEffect, useState } from "react";

const getMp3File = (dictationId: string) => {
  return (assets as Record<string, any>)[dictationId] ?? null;
};

const useDatabaseDictation = (dictationId: string) => {
  const [dictation, setDictation] = useState<Dictation | null>(null);
  const [mp3File, setMp3File] = useState<string | null>(null);

  useEffect(() => {
    setDictation(dictations.find((d) => d.id === dictationId) ?? null);
    setMp3File(getMp3File(dictationId));
  }, [dictationId]);

  return { dictation, mp3File };
};

export default useDatabaseDictation;
