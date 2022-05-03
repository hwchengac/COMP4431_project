// JS will run when USM is choose and apply

(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.usm = function(inputData, outputData, blur, radius, amount, threshold) {
        console.log("Applying USM...");

        // Just for checking. 
        // console.log(blur, radius, amount, threshold);
        // console.log(typeof(blur), typeof(radius), typeof(amount), typeof(threshold));
        // output: string number number number

        if(blur == "auto"){
        	blur = radius>10? "box":"gaussian";
        }


        var blurData = imageproc.createBuffer(inputData);
        var hsvData = imageproc.createBuffer(inputData);

        if(blur == "gaussian [remove this when implement]"){
            console.log("To be implement...");
        }else if(blur == "box" | true){
            var boxRadius = radius*2+1;
            imageproc.blur(inputData, blurData, boxRadius);

            // For debug - show box blured img
            // imageproc.copyImageData(blurData, outputData);
            // console.log("USM - show box blur");
            // return;


        }else{
            console.log("wtf is this blur?");
        }

        //Unsharp will only apply on Value, so convert ori img and blur img to HSV
        imageproc.fromRGBToHSV_img(inputData,hsvData);
        imageproc.fromRGBToHSV_img(blurData,blurData);

        // Sharpen the Masked area's value, and retain the rest.
        for (var i = 0; i < inputData.data.length; i += 4) {
            outputData.data[i]     = hsvData.data[i];
            outputData.data[i + 1] = hsvData.data[i + 1];
            var diff = hsvData.data[i + 2] - blurData.data[i + 2];
            if(diff*255 > threshold){
                outputData.data[i + 2] = hsvData.data[i + 2] + (hsvData.data[i + 2] - blurData.data[i+2]) * amount;
            }else{
                outputData.data[i + 2] = hsvData.data[i + 2];
            }
            
        }

        // For test only, just a prove of concept
        // for (var i = 0; i < inputData.data.length; i += 4) {
        //     outputData.data[i]     = hsvData.data[i];
        //     outputData.data[i + 1] = hsvData.data[i + 1];
        //     outputData.data[i + 2] = 2 * hsvData.data[i + 2] - blurData.data[i+2];
        // }


        imageproc.fromHSVToRGB_img(outputData,outputData);
        console.log("USM-Done");
    }

    // Newly added, a helper function to translate the whole img to HSV or RGB
    imageproc.fromRGBToHSV_img = function(inputData, outputData){
        for (var i = 0; i < inputData.data.length; i += 4) {
            var pixel = imageproc.fromRGBToHSV(inputData.data[i],inputData.data[i + 1],inputData.data[i + 2]);
            // if(i==0){console.log(pixel);}
            outputData.data[i]     = pixel.h;
            outputData.data[i + 1] = pixel.s;
            outputData.data[i + 2] = pixel.v;
        }
    }
    imageproc.fromHSVToRGB_img = function(inputData, outputData){
        for (var i = 0; i < inputData.data.length; i += 4) {
            var pixel = imageproc.fromHSVToRGB(inputData.data[i],inputData.data[i + 1],inputData.data[i + 2]);
            outputData.data[i]     = pixel.r;
            outputData.data[i + 1] = pixel.g;
            outputData.data[i + 2] = pixel.b;
        }
    }


}(window.imageproc = window.imageproc || {}));
