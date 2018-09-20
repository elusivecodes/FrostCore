const path = require('path');
const fs = require('fs');
const filepath = require('filepath');
const UglifyJS = require('uglify-es');

const srcFolder = 'src';
const distFolder = 'dist';

const name = 'frost-core';

if ( ! fs.existsSync(distFolder)) {
    fs.mkdirSync(distFolder);
}

// load files and wrapper
let wrapper;
let code = [];

filepath.create(srcFolder).recurse(fullPath => {
    if ( ! fullPath.isFile()) {
        return;
    }

    if (path.extname(fullPath.path) === '.js') {
        const fileName = path.basename(fullPath.path, '.js');
        const data = fs.readFileSync(fullPath.path, 'utf8');

        if (fileName === 'wrapper') {
            wrapper = data;
        } else {
            code.push(data);
        }
    }
});

// inject code to wrapper
code = wrapper.replace(
    '// {{code}}',
    code.join('\r\n\r\n').replace(
        /^(?!\s*$)/mg,
        ' '.repeat(4)
    )
);

// minify
const minified = UglifyJS.minify(code);

// write files
fs.writeFileSync(
    path.join(distFolder, name + '.js'),
    code
);

if (minified.error) {
    console.error(minified.error);
} else {
    fs.writeFileSync(
        path.join(distFolder, name + '.min.js'),
        minified.code
    );
}