/**
 * Gets the avatar letters for the user, if the user has multiple components in
 * their names, display the initials of the users name. If the user only has a first
 * name, only display the first name's initials.
 *
 * @param name the user inputted name
 * @param defaultValue the default name
 */
export const getAvatarInitials = (name: string, defaultValue: string): string => {
  return name.trim()
    ? name
        .trim()
        .split(/\s+/)
        .map((word) => word[0].toUpperCase())
        .join('')
    : defaultValue;
};
