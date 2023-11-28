export const parseCSV = (text: string): string[][] => {
  const rows = text.split("\n");

  const data: string[][] = [];
  for (const row of rows) {
    if (!row) continue;

    const cells: string[] = row
      .match(/(?:[^,"]+|"[^"]*?"|(?<=,)(?=,))/g)!
      .map((match) => match.replace(/"/g, "").trim());

    data.push(cells);
  }
  return data;
};

export const convertToJSON = (data: string[][] = [], customCols?: string[]) => {
  const csvSummary = {
    totalPlayers: data.length - 1,
    goalKeepers: 0,
    defenders: 0,
    midFielders: 0,
    forwards: 0,
    missingFields: false,
  };

  if (data.length < 2) return { jsonData: [], csvSummary }; // Not enough data for header and values

  const headerRow = customCols || data[0];
  const jsonData = data.slice(1).map((row, index) => {
    const obj: { [key: string]: string } = { id: `${index}` };
    row.forEach((cell, index) => {
      obj[headerRow[index]] = cell;

      if (!cell) {
        csvSummary.missingFields = true;
      }

      if (index === 3) {
        switch (cell) {
          case "Goalkeeper":
            csvSummary.goalKeepers += 1;
            break;
          case "Defender":
            csvSummary.defenders += 1;
            break;
          case "Midfielder":
            csvSummary.midFielders += 1;
            break;
          case "Forward":
            csvSummary.forwards += 1;
            break;
        }
      }
    });
    return obj;
  });

  return { csvSummary, jsonData };
};

export const convertHeightToMeters = (height: string) => {
  const heightInCm = parseFloat(height);

  if (!isNaN(heightInCm)) {
    const heightInMeters = heightInCm / 100; // Convert from cm to meters
    return heightInMeters.toFixed(2); // Return the value rounded to 2 decimal places
  }

  return height; // Return the original value if it's not a valid number
}
