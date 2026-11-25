export function validateEmail(email) {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'University email is required.' };
  }

  const trimmed = email.trim().toLowerCase();
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!basicEmailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email format (e.g. you@university.edu).' };
  }

  const isAcademic =
    trimmed.endsWith('.edu') ||
    trimmed.endsWith('.edu.eg') ||
    trimmed.includes('.edu.') ||
    trimmed.endsWith('.ac.uk') ||
    trimmed.includes('university') ||
    trimmed.includes('faculty') ||
    trimmed.includes('science.cu');

  return { isValid: true, isAcademic };
}

export function validatePassword(password) {
  if (!password) {
    return { isValid: false, error: 'Password is required.' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long.' };
  }

  return { isValid: true };
}
