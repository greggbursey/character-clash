const fs = require('fs');

let content = fs.readFileSync('data/characters.ts', 'utf8');

content = content.replace(/"name":\s*"([^"]+)",([\s\S]*?)"previewUrl":\s*"[^"]+",\s*"backgroundUrl":\s*"[^"]+",/g, (match, name, middle) => {
  // We use Pollinations.ai to generate exact character matches on the fly, 
  // since Unsplash only has generic photography (which caused the "Minions" issue).
  const encodedName = encodeURIComponent(name);
  
  // Create specific prompts for the avatar and background
  const previewUrl = `https://image.pollinations.ai/prompt/${encodedName}%20character%20portrait%20comic%20book%20style?width=400&height=400&nologo=true`;
  const backgroundUrl = `https://image.pollinations.ai/prompt/${encodedName}%20epic%20cinematic%20action%20background%20wallpaper?width=1920&height=1080&nologo=true`;
  
  return `"name": "${name}",${middle}"previewUrl": "${previewUrl}",\n    "backgroundUrl": "${backgroundUrl}",`;
});

fs.writeFileSync('data/characters.ts', content);
console.log('Successfully updated images to use Pollinations.ai!');
