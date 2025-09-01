// it checkes if the string contains spaces or invalid characters
// like quotes or backslashes
export const QUOTATION_MARK_PATTERN = /^[^\s'"`\\]+$/;

// it makes sure that string contains only letters
export const ONLY_LETTERS_PATTERN = /^[\p{L}\s]+$/u;
