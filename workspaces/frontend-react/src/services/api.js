export const search = async ({ destination, date, nights, travelers }) => {
  console.log('search', { destination, date, nights, travelers });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1500);
  });
};

export const autocomplete = async ({ term }) => {
  console.log('Search', term);
  return [
    {
      id: 1,
      value: 'New York, USA',
    },
    {
      id: 2,
      value: 'Barcelona, Spain',
    },
  ];
};
