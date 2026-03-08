const fs = require('fs');
const path = require('path');

const colorMap = {
    '#2563EB': '#111827',
    'rgba(37,99,235,0.1)': 'rgba(17,24,39,0.1)',
    'rgba(37,99,235,0.08)': 'rgba(17,24,39,0.08)',
    'rgba(37,99,235,0.05)': 'rgba(17,24,39,0.05)',
    'rgba(37,99,235,0.15)': 'rgba(17,24,39,0.15)',
    'rgba(37,99,235,0.3)': 'rgba(17,24,39,0.3)',

    '#7C3AED': '#4B5563',
    'rgba(124,58,237,0.1)': 'rgba(75,85,99,0.1)',
    'rgba(124,58,237,0.08)': 'rgba(75,85,99,0.08)',

    '#10B981': '#4B5563',
    'rgba(16,185,129,0.1)': 'rgba(75,85,99,0.1)',

    '#F59E0B': '#6B7280',
    'rgba(245,158,11,0.1)': 'rgba(107,114,128,0.1)',
    'rgba(245,158,11,0.06)': 'rgba(107,114,128,0.06)',
    'rgba(245,158,11,0.04)': 'rgba(107,114,128,0.04)',
    'rgba(245,158,11,0.2)': 'rgba(107,114,128,0.2)',

    '#EF4444': '#6B7280',
    'rgba(239,68,68,0.1)': 'rgba(107,114,128,0.1)',

    '#3B82F6': '#9CA3AF',
    'rgba(59,130,246,0.1)': 'rgba(156,163,175,0.1)',

    '#EC4899': '#6B7280',
    'rgba(236,72,153,0.1)': 'rgba(107,114,128,0.1)',

    'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)': 'var(--text-primary)',
    'linear-gradient(135deg, #2563EB, #7C3AED)': 'var(--text-primary)',
    'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)': 'var(--text-primary)',
    'linear-gradient(135deg, #7C3AED, #2563EB)': 'var(--text-primary)',
    'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)': 'var(--text-primary)',
    'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.1))': 'rgba(17,24,39,0.1)',
    'linear-gradient(135deg, #10B981 0%, #2563EB 100%)': 'var(--text-primary)',

    'linear-gradient(to right, #2563EB, #7C3AED)': 'var(--text-primary)',
    '#2563eb': '#111827',
    '#7c3aed': '#4B5563'
};

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./src', function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;

        // Multiples passes para resolver substrings
        for (const [key, value] of Object.entries(colorMap)) {
            if (content.includes(key)) {
                content = content.replaceAll(key, value);
                hasChanges = true;
            }
        }

        // Replace some other gradients directly if missed by specific keys
        if (content.match(/linear-gradient\([^)]+\)/) && hasChanges) {
            // Only specific buttons got changed
        }

        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated colors in ${filePath}`);
        }
    }
});
