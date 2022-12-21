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

export const DecimalConverter = (number, decimals, dec_point, thousands_sep) => {
  //   example 1: number_format(1234.56);
  //   returns 1: '1,235'
  //   example 2: number_format(1234.56, 2, ',', ' ');
  //   returns 2: '1 234,56'
  //   example 3: number_format(1234.5678, 2, '.', '');
  //   returns 3: '1234.57'
  //   example 4: number_format(67, 2, ',', '.');
  //   returns 4: '67,00'
  //   example 5: number_format(1000);
  //   returns 5: '1,000'
  //   example 6: number_format(67.311, 2);
  //   returns 6: '67.31'
  //   example 7: number_format(1000.55, 1);
  //   returns 7: '1,000.6'
  //   example 8: number_format(67000, 5, ',', '.');
  //   returns 8: '67.000,00000'
  //   example 9: number_format(0.9, 0);
  //   returns 9: '1'
  //  example 10: number_format('1.20', 2);
  //  returns 10: '1.20'
  //  example 11: number_format('1.20', 4);
  //  returns 11: '1.2000'
  //  example 12: number_format('1.2000', 3);
  //  returns 12: '1.200'
  //  example 13: number_format('1 000,50', 2, '.', ' ');
  //  returns 13: '100 050.00'
  //  example 14: number_format(1e-8, 8, '.', '');
  //  returns 14: '0.00000001'

  number = (number + '')
    .replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

