// src/utils/phoneUtils.ts
export const formatPhoneNumber = (phone: string): string => {
    // Simple formatting – improve with lib later (libphonenumber-js)
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+94 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return phone;
  };
  
  export const isValidPhone = (phone: string): boolean => {
    // Basic check – improve later
    return phone.startsWith('+') && phone.length >= 10 && /^\+\d+$/.test(phone);
  };