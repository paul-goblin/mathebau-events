import type { InputValidationSchema } from './validation';
import { getDateParser, getEndOfDayDateParser, getNumberOrNullParser, getIdentityParser } from './validation/parser_getters';
import { getDateValidator, getRequireValidator, getOptionalNumberValidator, getOptionalStringValidator, getValidator } from './validation/validator_getters';

const requireEventName = getRequireValidator("Dein Event braucht einen Namen");
const requireLocation = getRequireValidator("Dein Event braucht einen Ort");
const requireStartDate = getRequireValidator("Dein Event braucht ein Startdatum");
const requireEndDate = getRequireValidator("Dein Event braucht ein Enddatum");
const requireDescription = getRequireValidator("Dein Event braucht eine Beschreibung");
const requireSignupStartDate = getRequireValidator("Dein Event braucht einen Anmeldestart");
const requireSignupEndDate = getRequireValidator("Dein Event braucht einen Anmeldeschluss");
const requireParticipantsLimitToBeNumberOrUnset = getOptionalNumberValidator("Die Teilnehmeranzahl muss eine Zahl sein");
const requireCostToBeStringOrUnset = getOptionalStringValidator("Die Kosten müssen als Text eingegeben werden");

const requireStartDateToBeADate = getDateValidator("Ungültiges Startdatum");
const requireEndDateToBeADate = getDateValidator("Ungültiges Enddatum");
const requireSignupStartDateToBeADate = getDateValidator("Ungültiger Anmeldestart");
const requireSignupEndDateToBeADate = getDateValidator("Ungültiger Anmeldeschluss");

const requireEndDateToBeAfterStartDate = getValidator((value, formData) => {
  const startDate = formData.get("startDate");
  if (typeof startDate === "string") {
    const endDate = value as string;
    if (new Date(endDate) < new Date(startDate)) {
      return false;
    }
  }
  return true;
}, "Startdatum muss vor dem Enddatum liegen");

export const newEventFormValidationSchema: InputValidationSchema = [
  {
    inputName: 'eventName',
    validators: [ requireEventName ],
    parser: getIdentityParser({renamePropertyTo: 'name'}),
  }, {
    inputName: 'location',
    validators: [ requireLocation ],
    parser: getIdentityParser(),
  }, {
    inputName: 'startDate',
    validators: [ requireStartDate, requireStartDateToBeADate ],
    parser: getDateParser(),
  }, {
    inputName: 'endDate',
    validators: [ requireEndDate, requireEndDateToBeADate, requireEndDateToBeAfterStartDate ],
    parser: getEndOfDayDateParser(),
  }, {
    inputName: 'description',
    validators: [ requireDescription ],
    parser: getIdentityParser(),
  }, {
    inputName: 'signupStartDate',
    validators: [ requireSignupStartDate, requireSignupStartDateToBeADate ],
    parser: getDateParser(),
  }, {
    inputName: 'signupEndDate',
    validators: [ requireSignupEndDate, requireSignupEndDateToBeADate ],
    parser: getEndOfDayDateParser(),
  }, {
    inputName: 'participantsLimit',
    validators: [requireParticipantsLimitToBeNumberOrUnset],
    parser: getNumberOrNullParser(),
  }, {
    inputName: 'cost',
    validators: [requireCostToBeStringOrUnset],
    parser: getIdentityParser(),
  }
]