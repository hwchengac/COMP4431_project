// JS will run when USM is choose and apply

(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.usm = function(inputData, outputData, blur, radius, amount, threshold) {
        console.log("Applying USM.d..");

        // Just for checking. 
        console.log(blur, radius, amount, threshold);
        // console.log(typeof(blur), typeof(radius), typeof(amount), typeof(threshold));
        // output: string number number number

        if(blur == "auto"){
        	blur = radius>10? "box":"gaussian";
        }


        var blurData = imageproc.createBuffer(inputData);

        if(blur == "gaussian"){
            console.log("To be implement...");
        }else if(blur == "box"){
            var boxRadius = radius*2+1;
            imageproc.blur(inputData, blurData, boxRadius);
            imageproc.copyImageData(blurData, outputData);// For debug
        }else{
            console.log("wtf is this blur?");
        }
    } 

}(window.imageproc = window.imageproc || {}));
