import { useParams } from "next/navigation";

export default function useLocale(): string {
  const params = useParams();
  return params.locale as string;
}
