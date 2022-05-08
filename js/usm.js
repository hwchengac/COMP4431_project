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

        if(blur == "auto")
        	blur = radius>10? "box":"gaussian";

        var blurData = imageproc.createBuffer(inputData);

        if(blur == "gaussian")
		{
            // var size = 2 * Math.ceil(radius - 0.5) + 1; variable kernal size, according to GIMP code.
            imageproc.gaussianBlur(inputData, blurData, radius, 7);
            // For debug - show box blured img
            // imageproc.copyImageData(blurData, outputData);
            // console.log("USM - show gaussian blur");
            // return;
        }
		else if(blur == "box" | true)
		{

            // Why we use more times of blur? 1. it is faster, 2. it is closer to gaussian blur
            // From wiki: https://en.wikipedia.org/wiki/Box_blur
            // Box blurs are frequently used to approximate a Gaussian blur.
            // By the central limit theorem, repeated application of a box blur will approximate a Gaussian blur.

            var blurData_temp = imageproc.createBuffer(inputData);
            imageproc.copyImageData(inputData, blurData_temp);
            for (var i = 0; i < radius*4; i++) {
                imageproc.copyImageData(blurData_temp, blurData);
                imageproc.blur(blurData, blurData_temp, 3);
            }
            imageproc.copyImageData(blurData_temp, blurData);

            // Large kernal version, takes more time to run.
            // var boxRadius = radius*2+1;
            // imageproc.blur(inputData, blurData, boxRadius);

            // For debug - show box blured img
            imageproc.copyImageData(blurData, outputData);
            console.log("USM - show box blur");
            return;

        }
		else
		{
            console.log("wtf is this blur?");
        }


        // Sharpen the Masked area's value, and retain the rest.
        for (let i = 0; i < inputData.data.length; i += 4)
		{
			// Modified version
			let hsv_input = imageproc.fromRGBToHSV(inputData.data[i], inputData.data[i + 1], inputData.data[i + 2]);
			let hsv_blurred = imageproc.fromRGBToHSV(blurData.data[i], blurData.data[i + 1], blurData.data[i + 2]);
			
			let diff = hsv_input.v - hsv_blurred.v;
			let sharpened_value = hsv_input.v;
			if (diff * 255 > threshold)
			{
				sharpened_value += diff * amount;
				sharpened_value = sharpened_value > 1 ? 1 : sharpened_value;
			}
			
			let rgb_output = imageproc.fromHSVToRGB(hsv_input.h, hsv_input.s, sharpened_value);
			outputData.data[i] 	   = rgb_output.r;
			outputData.data[i + 1] = rgb_output.g;
			outputData.data[i + 2] = rgb_output.b;
            
        }

        // No use, keep for record.

        // var hsvData = imageproc.createBuffer(inputData);

        // // For test only, just a prove of concept
        // // for (var i = 0; i < inputData.data.length; i += 4) {
        // //     outputData.data[i]     = hsvData.data[i];
        // //     outputData.data[i + 1] = hsvData.data[i + 1];
        // //     outputData.data[i + 2] = 2 * hsvData.data[i + 2] - blurData.data[i+2];
        // // }

        //Unsharp will only apply on Value, so convert ori img and blur img to HSV
        // imageproc.fromRGBToHSV_img(inputData,hsvData);
        // imageproc.fromRGBToHSV_img(blurData,blurData);
        // imageproc.fromHSVToRGB_img(outputData,outputData);

        // // // For test only, just a prove of concept
        // // // for (var i = 0; i < inputData.data.length; i += 4) {
        // // //     outputData.data[i]     = hsvData.data[i];
        // // //     outputData.data[i + 1] = hsvData.data[i + 1];
        // // //     outputData.data[i + 2] = 2 * hsvData.data[i + 2] - blurData.data[i+2];
        // // // }


        // // // imageproc.fromHSVToRGB_img(outputData,outputData);

        console.log("USM-Done");
    }

    // Newly added, a helper function to translate the whole img to HSV or RGB
    // imageproc.fromRGBToHSV_img = function(inputData, outputData){
        // for (var i = 0; i < inputData.data.length; i += 4) {
            // var pixel = imageproc.fromRGBToHSV(inputData.data[i],inputData.data[i + 1],inputData.data[i + 2]);
            // // if(i==0){console.log(pixel);}
            // outputData.data[i]     = pixel.h;
            // outputData.data[i + 1] = pixel.s;
            // outputData.data[i + 2] = pixel.v;
        // }
    // }
    // imageproc.fromHSVToRGB_img = function(inputData, outputData){
        // for (var i = 0; i < inputData.data.length; i += 4) {
            // var pixel = imageproc.fromHSVToRGB(inputData.data[i],inputData.data[i + 1],inputData.data[i + 2]);
            // outputData.data[i]     = pixel.r;
            // outputData.data[i + 1] = pixel.g;
            // outputData.data[i + 2] = pixel.b;
        // }
    // }


}(window.imageproc = window.imageproc || {}));
