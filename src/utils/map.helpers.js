export const getInitials = (name) => {
  const splittedName = name.trim().toUpperCase().split(' ');
  const firstName = splittedName[0] || '';
  const lastName = splittedName[splittedName.length - 1] || '';

  if (splittedName.length > 1 && firstName.length > 0 && lastName.length > 0) {
    return firstName[0].concat(lastName[0]);
  } else if (firstName.length > 0) {
    return firstName[0].concat(firstName[firstName.length - 1]);
  } else {
    return '??';
  }
}
