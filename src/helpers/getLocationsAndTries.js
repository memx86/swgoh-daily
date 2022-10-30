export const getLocationsAndTries = (locations, tries) => {
  const freshedTries = {};

  locations?.forEach((_, idx) => {
    const currentTry = tries[idx] ?? {};
    const today = Date.now();
    const updated = currentTry.updatedAt ?? 0;

    const isLessThanDay = today - updated < 1000 * 60 * 60 * 24;
    const isFresh =
      isLessThanDay &&
      new Date(today).getDate() === new Date(updated).getDate();

    const freshValue = isFresh ? currentTry.value : 0;

    freshedTries[idx] = {
      value: freshValue ?? 0,
    };
  }) ?? [];

  return { locations, tries: freshedTries };
};
