export function FormActionValidation(name: string, msg: string): string {
  if (!name) {
    return "name field is required";
  } else if (name.length <= 2) {
    return "name field is not long enough";
  } else if (name.length > 50) {
    return "name field can not be longer than 50 charachter";
  } else if (!msg) {
    return "Comment field is required";
  } else if (msg.length > 500) {
    return "Comment field can not be longer than 500 charachter";
  } else {
    return "VALIDATED";
  }
}
