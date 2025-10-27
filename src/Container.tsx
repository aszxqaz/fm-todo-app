import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="px-6">
      <div className="mx-auto max-w-main md:max-w-main-desktop">{children}</div>
    </div>
  );
}
