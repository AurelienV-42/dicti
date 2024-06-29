import assets from "@assets/index";
import dictations, { Dictation } from "@config/dictations";
import { useEffect, useState } from "react";

const getMp3File = (dictationID: string) => {
  return (assets as Record<string, any>)[dictationID] ?? null;
};

const useDatabaseDictation = (dictationID: string) => {
  const [dictation, setDictation] = useState<Dictation | null>(null);
  const [mp3File, setMp3File] = useState<string | null>(null);

  useEffect(() => {
    setDictation(dictations.find((d) => d.id === dictationID) ?? null);
    setMp3File(getMp3File(dictationID));
  }, [dictationID]);

  return { dictation, mp3File };
};

export default useDatabaseDictation;
