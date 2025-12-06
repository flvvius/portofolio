import React, { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function withNoSSR<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  const NoSSRWrapper: React.FC<P> = (props) => {
    const isClient = useIsClient();

    if (!isClient) {
      return null;
    }

    return <Component {...props} />;
  };

  const displayName = Component.displayName || Component.name || "Component";
  NoSSRWrapper.displayName = `withNoSSR(${displayName})`;

  return NoSSRWrapper;
}
