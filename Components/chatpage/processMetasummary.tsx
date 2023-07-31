// export const processMetasummary = (metasummary) => {
//     // Check if metasummary is a string that can be parsed into an array
//     if (typeof metasummary === 'string') {
//       try {
//         metasummary = JSON.parse(metasummary);
//       } catch (error) {
//         console.error('Error parsing metasummary:', error);
//       }
//     }
  
//     // Remove the extra double quotes at the end of each sentence
//     if (Array.isArray(metasummary)) {
//       metasummary = metasummary.map(sentence => sentence.replace(/"$/, ""));
//     }
  
//     // Check if metasummary is now an array before joining
//     return Array.isArray(metasummary)
//       ? metasummary.join('. ')
//       : metasummary;
//   };
  









export const processMetasummary = (metasummary) => {
  // Check if metasummary is a string that can be parsed into an array
  if (typeof metasummary === 'string') {
    try {
      metasummary = JSON.parse(metasummary);
    } catch (error) {
      console.error('Error parsing metasummary:', error);
    }
  }

  // Remove the extra double quotes at the end of each sentence and filter out empty sentences
  if (Array.isArray(metasummary)) {
    metasummary = metasummary.map(sentence => sentence.trim().replace(/"$/, ""))
                           .filter(sentence => sentence !== "");
  }

  // Check if metasummary is now an array before joining
  return Array.isArray(metasummary)
    ? metasummary.join('. ')
    : metasummary;
};
