import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../theme/theme.js";

export function UserMessage({ text, imageCount }: { text: string; imageCount?: number }) {
  const theme = useTheme();

  return (
    <Box marginTop={1} flexDirection="column">
      <Box paddingX={1} paddingY={0}>
        <Text wrap="wrap" color="white" backgroundColor="gray">
          <Text color={theme.inputPrompt} backgroundColor="gray">
            {"❯ "}
          </Text>
          {text}
          {imageCount != null &&
            imageCount > 0 &&
            Array.from({ length: imageCount }, (_, i) => (
              <Text key={i} color={theme.accent} backgroundColor="gray">
                {" "}
                [Image #{i + 1}]
              </Text>
            ))}
        </Text>
      </Box>
    </Box>
  );
}
