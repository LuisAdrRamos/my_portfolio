const fs = require('fs'); 
const path = require('path'); 
function walk(dir) { 
  let results = []; 
  const list = fs.readdirSync(dir); 
  list.forEach(function(file) { 
    file = path.join(dir, file); 
    const stat = fs.statSync(file); 
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file)); 
    } else { 
      results.push(file); 
    } 
  }); 
  return results; 
} 
const files = walk('src').filter(f => f.endsWith('.astro')); 
files.forEach(f => { 
  let content = fs.readFileSync(f, 'utf8'); 
  content = content.replace(/from 'lucide-react'/g, "from '@lucide/astro'"); 
  fs.writeFileSync(f, content); 
  console.log('Updated', f); 
});
