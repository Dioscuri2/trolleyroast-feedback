import { useEffect } from "react";
import { applySeo, type SeoConfig } from "@/lib/seo";

export default function RouteSeo(props: SeoConfig) {
  useEffect(() => {
    applySeo(props);
  }, [props.description, props.ogType, props.path, props.title]);

  return null;
}
