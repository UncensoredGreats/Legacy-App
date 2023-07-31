export const getColorCode = (promptType: string): 'red' | 'orange' | 'green' => {
    switch (promptType) {
      case 'prompt1': return 'red';
      case 'prompt5': return 'orange';
      case 'prompt9': return 'green';
      default: return null;
    }
};
