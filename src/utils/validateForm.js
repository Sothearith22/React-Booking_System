export function validateForm(mode, values) {
  const errors = {};

  if (mode === 'register' && !values.name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}
