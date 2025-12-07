"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ViewTransitions() {
  const pathname = usePathname();
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    // @ts-ignore
    if (!document.startViewTransition) return;

    if (savedPathNameRef.current !== pathname) {
      savedPathNameRef.current = pathname;
      // Triggers the view transition API for native-like feel
      // @ts-ignore
      document.startViewTransition(() => {
        // React updates the DOM here automatically
      });
    }
  }, [pathname]);

  return null;
}
