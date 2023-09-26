import { useState, useCallback } from "react";

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (!navigator?.clipboard) {
        console.warn(
          "Clipboard API not supported, falling back to execCommand"
        );
        const copyText = document.createElement("textarea");
        copyText.value = text;
        document.body.appendChild(copyText);
        copyText.select();
        document.execCommand("copy");
        document.body.removeChild(copyText);
      } else {
        await navigator.clipboard.writeText(text);
      }

      setIsCopied(true);

      // Reset after 3 seconds
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      setIsCopied(false);
    }
  }, []);

  return [isCopied, copyToClipboard] as const;
};


