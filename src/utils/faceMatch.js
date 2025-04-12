export function euclideanDistance(desc1, desc2) {
    let sum = 0;
    for (let i = 0; i < desc1.length; i++) {
      sum += (desc1[i] - desc2[i]) ** 2;
    }
    return Math.sqrt(sum);
  }
  
  export function findBestMatch(inputDescriptor, users, threshold = 0.5) {
    let bestMatch = null;
    let minDistance = Infinity;
  
    for (let user of users) {
      if (!user.descriptor || user.descriptor.length === 0) continue;
      const dist = euclideanDistance(inputDescriptor, user.descriptor);
      if (dist < minDistance && dist < threshold) {
        bestMatch = user;
        minDistance = dist;
      }
    }
  
    return bestMatch;
  }
  