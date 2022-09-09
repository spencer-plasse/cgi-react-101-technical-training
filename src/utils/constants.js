// Mapping of question IDs to their text
export const questions = {
  DATE_OF_BIRTH: "What is your birth date?",
  DOES_WORKOUT: "Do you workout weekly?",
  DOES_EAT_JUNK_FOOD: "Do you eat junk food?",
  CAN_TOUCH_TOES: "Can you touch your toes?"
};

// Mapping of all possible answers to radio questions to their respective offset values
export const answerOffsets = {
	'Never': 1,
	'Sometimes': 0,
	'Always': -1,
	'Yes': 1,
	'No': -1
};

// Mapping of filter IDs to their string representations
export const filters = {
  ALL: "all",
  RECENT: "recent",
  OLD: "old"
};