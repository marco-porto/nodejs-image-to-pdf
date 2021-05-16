const imagesToPdf = require("images-to-pdf");
const fs = require("fs");

const args = process.argv.slice(2);

function convert(dir) {
    //Check if dir.in exists
    if(fs.existsSync(dir.in)){
        //Create dir.out if not found
        if(!fs.existsSync(dir.out)){
            fs.mkdir(dir.out,(err) => {
                if (err) {
                    throw err;
                }
            })
        }
        //Get all file names of dir.in and convert to pdf to the dir.out
        fs.readdir(dir.in, (err, files) => {
            if (err) {
              console.log("Error:", err);
            } else {
              files.forEach(async (file) => {
                console.log(`Converting ${file} to pdf`);
                await imagesToPdf([`${dir.in}/${file}`], `${dir.out}/${file}.pdf`);
              });
            }
          });
    }else{
        console.log(`Ups, ${dir.in}, not found!`)
    }
}

convert({
  in: args[0],
  out: args[1],
});
