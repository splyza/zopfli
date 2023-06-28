const exec = require('child_process').exec;
const fs = require('fs');

try {
	main();
} catch (err) {
	console.log(`error: `);
	console.log(main);
}


function main() {
	var files = [];

	const outDir = './out';

	try {
		if ( fs.existsSync(outDir) ) {
			fs.readdirSync(outDir).forEach(f => {
				fs.rmSync(`${outDir}/${f}`);
			});
		} else {
			fs.mkdirSync(outDir);
		}
	} catch (e) {
		console.log(e);
	}
	

	fs.readdirSync('./orig').forEach(file => {
	  	if ( file.indexOf('.png') > -1 ) {
	    	files.push(file);
		}
	});

	console.log(files.length);

	for ( var x = 0, length = files.length; x < length; x++) {
		zopflipng(files[x]);
	}


	function zopflipng(fileName) {
		const child = exec(
		'./zopflipng orig/' + fileName + ' out/' + fileName + ' ',
	    (error, stdout, stderr) => {
	    	console.log(`stdout: ---- ` + fileName);
	        console.log(`${stdout}`);
	        
	        if (error !== null) {
	        	console.log(`stderr: ${stderr}`);
	            console.log(`exec error: ${error}`);
	        }
		});
	}
}