import { useParams } from "next/navigation";
import { TLocale } from "../types/locale";

export default function useLocale(): TLocale {
  const params = useParams();
  return params.locale as TLocale;
}
