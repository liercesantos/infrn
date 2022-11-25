import React from "react";
import { FormControl, Input } from "native-base";

export default function RequiredFormField(props) {
  const {label, placeholder, onChange, error, value, max, type = ''} = props;

  return (
    <FormControl isRequired isInvalid={!!error}>
      <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
      <Input
        placeholder={placeholder}
        mask={"+1 ([000])"}
        value={value}
        onChangeText={value => onChange(value)}
        maxLength={max}
        keyboardType={type} />
      {error ? <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage> : null}
    </FormControl>
  )
}
