import assets from "@assets/index";
import dictations, { Dictation } from "@config/dictations";
import { useEffect, useState } from "react";

type AssetSource = ReturnType<typeof require>;

const getMp3File = (dictationID: string): AssetSource | null => {
  return (assets as Record<string, AssetSource>)[dictationID] ?? null;
};

const useDatabaseDictation = (dictationID: string) => {
  const [dictation, setDictation] = useState<Dictation | null>(null);
  const [mp3File, setMp3File] = useState<AssetSource | null>(null);

  useEffect(() => {
    setDictation(dictations.find((d) => d.id === dictationID) ?? null);
    setMp3File(getMp3File(dictationID));
  }, [dictationID]);

  return { dictation, mp3File };
};

export default useDatabaseDictation;
