const sanitizeObject = (obj: object, excludeFields: string[]): object => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !excludeFields.includes(k)))
}

const blobToFile = (theBlob: Blob, fileName:string):File => {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}
export {
  sanitizeObject,
  blobToFile
}