// IUser custom typeguard
export function isUser(object: any): object is IUser {
  return (
    'id' in object &&
    'name' in object &&
    'mobile_number' in object &&
    'community' in object &&
    'email' in object
  );
}

export default interface IUser {
  id: string;
  name: string;
  mobile_number: string;
  community: string;
  email: string;
}
