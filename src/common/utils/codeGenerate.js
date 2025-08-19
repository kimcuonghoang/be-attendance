import User from "../../modules/user/user.model.js";

export const generateUsername = async (fullname) => {
  const baseUsername = fullname
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .split(/\s+/);
  const lastName = baseUsername[baseUsername.length - 1];
  const initals = baseUsername
    .slice(0, -1)
    .map((word) => word[0])
    .join("");
  const prelix = `${initals}${lastName}`.slice(0, 20);
  const regex = new RegExp(`^${prelix}\\d{0,3}$`);
  const existingUser = await User.find({ username: regex })
    .select("username")
    .lean()
    .exec();
  if (!existingUser || existingUser.length === 0) {
    return `${prelix}001`;
  }
  const sequenceNumbers = existingUser
    .map((user) => {
      const match = user.username.match(/\d+$/);
      return match ? parseInt(match[0], 10) : 0;
    })
    .filter((num) => num >= 0);

  const maxSequence =
    sequenceNumbers.length > 0 ? Math.max(...sequenceNumbers) : 0;
  const nextSequence = maxSequence + 1;
  if (nextSequence > 999) {
    throw new Error("Username sequence exceeded limit");
  }
  const formattedSequence = nextSequence.toString().padStart(3, "0");
  return `${prelix}${formattedSequence}`;
};

export const generateStudentId = async () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const prelix = `CF${currentYear}`;
  const regex = new RegExp(`^${prelix}\\d{3}$`);
  const existingId = await User.find({ studentId: regex })
    .select("studentId")
    .lean()
    .exec();
  if (!existingId || existingId.length === 0) {
    return `${prelix}001`;
  }
  const sequenceNumbers = existingId
    .map((doc) => parseInt(doc.studentId.slice(-3), 10))
    .filter((num) => !isNaN(num));
  const maxSequence = Math.max(...sequenceNumbers);
  const nextSequence = maxSequence + 1;
  if (nextSequence > 999) {
    throw new Error("Student ID sequence exceeded limit");
  }
  const formattedSequence = nextSequence.toString().padStart(3, "0");
  return `${prelix}${formattedSequence}`;
};
