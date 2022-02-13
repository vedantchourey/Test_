const sanitizeObject = (obj: object, excludeFields: string[]): object => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !excludeFields.includes(k)))
}

export {
  sanitizeObject
}