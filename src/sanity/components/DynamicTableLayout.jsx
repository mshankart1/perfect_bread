import React from "react";
import {
  Stack,
  Button,
  TextInput,
  Card,
  Flex,
  Box,
  Text
} from "@sanity/ui";
import { PatchEvent, set, unset } from "sanity";

export default function DynamicTableInput(props) {
  const { value = [], onChange, schemaType } = props;

  const fields = schemaType.of?.[0]?.fields || [];

  const updateCell = (rowIndex, fieldName, newValue) => {
    const updated = [...value];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [fieldName]: newValue,
      _key: updated[rowIndex]._key || crypto.randomUUID()
    };

    onChange(PatchEvent.from(set(updated)));
  };

  const addRow = () => {
    const emptyRow = {
      _key: crypto.randomUUID(),
    };

    fields.forEach((f) => {
      emptyRow[f.name] = "";
    });

    onChange(
      PatchEvent.from(
        set([...(value || []), emptyRow])
      )
    );
  };

  const removeRow = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(
      updated.length
        ? PatchEvent.from(set(updated))
        : PatchEvent.from(unset())
    );
  };

  return (
    <Stack space={3}>

      {/* Table Header */}
      <Card padding={2} border radius={2}>
        <Flex gap={3}>
          {fields.map((field) => (
            <Box key={field.name} flex={1}>
              <Text weight="semibold">{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</Text>
            </Box>
          ))}
          <Box width={60}></Box>
        </Flex>
      </Card>

      {/* Rows */}
      <Stack space={2}>
        {value.map((row, rowIndex) => (
          <Card key={row._key} padding={2} border radius={2}>
            <Flex gap={3} align="center">
              {fields.map((field) => (
                <Box key={field.name} flex={1}>
                  <TextInput
                    value={row[field.name] || ""}
                    onChange={(e) =>
                      updateCell(rowIndex, field.name, e.currentTarget.value)
                    }
                  />
                </Box>
              ))}

              <Box width={60}>
                <Button
                  text="✕"
                  tone="critical"
                  onClick={() => removeRow(rowIndex)}
                />
              </Box>
            </Flex>
          </Card>
        ))}
      </Stack>

      {/* Add Row */}
      <Button text="+ Add row" onClick={addRow} />
    </Stack>
  );
}
