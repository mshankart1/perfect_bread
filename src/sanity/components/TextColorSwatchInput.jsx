import React from 'react';
import { Box, Flex, Text } from '@sanity/ui';
import { PatchEvent, set } from 'sanity';
import { TEXT_COLOR_PALETTE } from '../constants/textColorPalette';

/**
 * Click a swatch to set color — avoids dropdown-in-popover focus/z-index issues.
 */
export function TextColorSwatchInput(props) {
  const { value, onChange } = props;

  return (
    <Box>
      <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>
        Color
      </Text>
      <Flex wrap="wrap" gap={2} role="group" aria-label="Text color">
        {TEXT_COLOR_PALETTE.map((item) => {
          const selected = value === item.value;
          return (
            <button
              key={item.value}
              type="button"
              title={item.title}
              onClick={() => onChange(PatchEvent.from(set(item.value)))}
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                backgroundColor: item.value,
                border: selected ? '2px solid #000' : '1px solid rgba(0,0,0,0.25)',
                boxShadow: item.value === '#ffffff' ? 'inset 0 0 0 1px rgba(0,0,0,0.08)' : undefined,
                cursor: 'pointer',
                padding: 0,
              }}
            />
          );
        })}
      </Flex>
    </Box>
  );
}
