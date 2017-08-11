export const generateEvents = (group) => {
  const res = [...Array(15)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate()+(i*7))
    return {
      id: Math.floor((Math.random() * 10000000) + 1),
      content: `v${80-i}.0`,
      start: date,
      type: 'point',
      group
    }
  });
  return res;
}

export const generatePointEvent = (group) => {
  const res = []
  for (var i = 0; i < 15; i++) {
    const fDate = new Date();
    const sDate = new Date();
    fDate.setDate(fDate.getDate()+(i*7))
    sDate.setDate(fDate.getDate()+2)

    const a = {
      id: Math.floor((Math.random() * 10000000) + 1),
      content: `v${80+i}.0`,
      start: fDate,
      type: 'point',
      group
    }
    const b = {
      id: Math.floor((Math.random() * 10000000) + 1),
      content: `v${80+i}.5`,
      start: sDate,
      type: 'point',
      group
    }
    console.log(fDate.getDate(), a.content, sDate.getDate(), b.content)
    res.push(a)
    res.push(b)

  }
  return res;
};
