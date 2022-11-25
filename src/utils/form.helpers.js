export const validate = (data, setErrors, errors) => {
  if (data.name === undefined) {
    setErrors({
      name: 'O nome é obrigatório!'
    });
    return false;
  }

  if (data.name.length < 3) {
    setErrors({
      name: 'Esse nome é muito curto.'
    });
    return false;
  }

  if (data.latitude === undefined) {
    setErrors({
      latitude: 'A latitude é obrigatória.'
    });
    return false;
  }

  if (data.latitude.length < 3) {
    setErrors({
      latitude: 'Essa latitude é muito curta.'
    });
    return false;
  }

  if (data.latitude < -90 || data.latitude > 90) {
    setErrors({
      latitude: 'Essa latitude não existe.'
    });
    return false;
  }

  if (data.longitude === undefined) {
    setErrors({
      longitude: 'A longitude é obrigatória.'
    });
    return false;
  }

  if (data.longitude.length < 6) {
    setErrors({
      longitude: 'Essa longitude é muito curta.'
    });
    return false;
  }

  if (data.longitude < -180 || data.longitude > 180) {
    setErrors({
      longitude: 'Essa longitude não existe.'
    });
    return false;
  }

  if (data.color === undefined) {
    setErrors({
      color: 'A cor é obrigatória.'
    });
    return false;
  }

  if (data.color.length < 6) {
    setErrors({
      color: 'A cor deve conter exatamente 7 caracteres. Ex: #000099'
    });
    return false;
  }

  return true;
};
