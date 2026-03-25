"use client";

import dynamic from "next/dynamic";
import PortalLoading from "./loading";

const PortalContent = dynamic(
  () =>
    import("@/components/portal/PortalContent").then((m) => m.PortalContent),
  {
    ssr: false,
    loading: () => <PortalLoading />,
  }
);

export default function PortalPage() {
  return <PortalContent />;
}
