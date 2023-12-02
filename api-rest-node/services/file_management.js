var fs        = require('fs'); /* files */

exports.delete = function(file_path){
    fs.unlink(file_path, (err) =>{  //elimina el archivo 
        if(err){
            console.log(err)
        }
            console.log('se elimino file')
        });
}

exports.get_ext = function(file_path) {
    var file_split = file_path.split('\\');
    /** Advertencia en linux   file_path.split('/');*/
    // nombre del archivo
    var file_name  = file_split[2];
    // extencion del archivo
    return file_name.split('\.')[1]
},
exports.get_name = function(file_path){
    var file_split = file_path.split('\\');
    return file_split[2];
}