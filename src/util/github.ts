// Grab package.json to know panel name, version, description
export const getExtensionPackage = async (repo: string) => {
  const packageJsonUrl = `https://raw.githubusercontent.com/Inventsable/${repo}/master/package.json`;
  try {
    const response = await fetch(packageJsonUrl);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Failed to fetch package.json. HTTP Status: ${response.status}`
      );
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

// Grab cep.config.ts from our repo to automatically parse things like host list
export const getExtensionConfig = async (repo: string) => {
  const packageJsonUrl = `https://raw.githubusercontent.com/Inventsable/${repo}/master/cep.config.ts`;
  try {
    const response = await fetch(packageJsonUrl);
    if (response.ok) {
      const data = await response.text();
      return configToJSON(data);
    } else {
      throw new Error(
        `Failed to fetch package.json. HTTP Status: ${response.status}`
      );
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

// Since cep.config.ts is not JSON, use some basic regex to convert it into being one for ease of use
export const configToJSON = (config: string) => {
  const str = config
    .replace(/^[\s\S]*version,/, "{") // Strip imports, version, and header
    .replace(/(?!\});[\s\S]*/, "") // Strip exports and footer
    .replace(/[^:\s\"]*\:(?!\/)/gm, (match) => {
      return `"${match.replace(/\:$/, "")}": `; // Encapsulate props with quotation marks
    })
    .replace(/:\s{2,}/gm, ": ") // Trim extra whitespaces caused from above
    .replace(/,\s*(?=(\}|\]))/gm, (match) => match.replace(/,/, "")); // Strip redundant commas
  return JSON.parse(str);
};
