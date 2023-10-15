 import multer from "multer"
 
 const businessServiceAdd = multer.diskStorage({
   
    destination: (req,file,cd) => {
        cd(null, "../FrontEnd/public/pictures")
    }, 
    filename:(req,file,cd)=> {
        const originalFileName = file.originalname;
        const fileNameWithoutSpaces = originalFileName.replace(/\s/g, ''); // Remove all spaces
        cd(null, fileNameWithoutSpaces);
    }
})

export  const businessUpload = multer({storage :businessServiceAdd}) 