export const strDataSetToArr = (string: String) => {
  const dataSetHeader = 
    string.replaceAll("\t",",")
    .slice(0, string.indexOf("\n"))
    .split(",");

  const dataSetRows = 
    string.replaceAll("\t",",")
    .slice(string.indexOf("\n") + 1)
    .split("\n");

  return [
    [...dataSetHeader].filter(Boolean),
    [...dataSetRows].filter(Boolean)
  ];
};

export const stringifiedFileToArrayOfObj = (string: String) => {
  const csvHeader = 
    string.replaceAll("\t",",")
    .slice(0, string.indexOf("\n"))
    .split(",");

  const csvRows = 
    string.replaceAll("\t",",")
    .slice(string.indexOf("\n") + 1)
    .split("\n");

  const array = csvRows.map(i => {
    const values = i.split(",");
    const obj = csvHeader.reduce((object: any, header, index) => {
      const key = header.replaceAll(" ","_");
      object[key] = values[index];
      return object;
    }, {});
    return obj;
  });
  return array.filter(Boolean);
};