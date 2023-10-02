 import multer from "multer"
 
 const businessServiceAdd = multer.diskStorage({
   
    destination: (req,file,cd) => {
        cd(null, "../FrontEnd/public/pictures")
    }, 
    filename:(req,file,cd)=> {
        const originalFileName = file.originalname;
        cd(null,originalFileName)
    }
})

export  const businessUpload = multer({storage :businessServiceAdd}) 