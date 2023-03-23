import { useState, useEffect } from "react";

const message = "Hello World!";

export default function Chat() {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return <>{message}</>;
}
