export function getPartyText(val) {
  const partyVals = [
    { text: 'Box', value: -1 },
    { text: 'First', value: 0 },
    { text: 'Second', value: 1 },
    { text: 'Third', value: 2 },
    { text: 'Fourth', value: 3 },
    { text: 'Fifth', value: 4 },
    { text: 'Sixth', value: 5 }
  ]

  for (let i = 0; i < partyVals.length; i++) {
    if (partyVals[i].value === val) {
      return partyVals[i].text.toLowerCase();
    }
  }

  return null;
}