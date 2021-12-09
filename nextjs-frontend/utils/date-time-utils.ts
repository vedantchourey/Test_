import { DateTime } from 'luxon';

type TimePart = { hour: number, minute: number };

export const parseDateTime = (iso: string) => {
  const dateTime = DateTime.fromISO(iso, {setZone: true});
  if (dateTime.zoneName !== 'UTC') throw new Error('Time zone is not UTC!');
  return dateTime;
};

const clearTime = (sourceDateTime: DateTime) => {
  return sourceDateTime.set({minute: 0, hour: 0, second: 0, millisecond: 0});
};

export const setDate = (sourceISO: string, destinationISO: string | undefined): string => {
  const sourceDateTime = parseDateTime(sourceISO).toLocal();
  if (destinationISO == null) return clearTime(sourceDateTime).toUTC().toISO();
  const {year, day, month} = sourceDateTime;
  return parseDateTime(destinationISO).toLocal().set({year, day, month}).toUTC().toISO();
};

export const setTime = (source: TimePart, destinationISO: string): string => {
  const dateTime = parseDateTime(destinationISO).toLocal();
  const {hour, minute} = source;
  return dateTime.set({hour, minute}).toUTC().toISO();
}

export const toLocalDDMMYYYY = (sourceISO: string | undefined) => {
  if (sourceISO == null) return '';
  return parseDateTime(sourceISO).toLocal().toFormat('dd/LL/yyyy')
}

export const toDisplayDateTime = (sourceISO: string | undefined) => {
  if (sourceISO == null) return '';
  return parseDateTime(sourceISO).toLocal().toFormat('dd/LL/yyyy - hh:mm');
}


export const parseToLocalJSDate = (iso: string | undefined) => {
  if (iso == null) return undefined;
  return parseDateTime(iso).toLocal().toJSDate();
}

export const getTimeAsLocal = (iso: string): TimePart | undefined => {
  if (iso == null) return undefined;
  const {hour, minute} = parseDateTime(iso).toLocal();
  return {hour, minute}
}

export const toISOString = (datetime: DateTime | undefined) => {
  if (datetime == null) return undefined;
  return datetime.toUTC().toISO();
}
