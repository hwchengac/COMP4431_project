(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
        var kernel = Array(kernelSize).fill(Array(kernelSize).fill(1))
        // var kernel = [ [0, 0, 0], [1, 1, 1], [0, 0, 0] ];

        var kernelSum = 0;
        kernelSum = kernelSize*kernelSize;

        // my prev code, no use. 
        // for (var i = 0; i < kernelSize; i++) {
        //     for (var j = 0; j < kernelSize; j++) {
        //         kernelSum = kernelSum + kernel[i][j];
        //     }
        // }

        var w = inputData.width*4;
        var offset = (kernelSize-1)/2;

        // console.log(offset);
        /**
         * TODO: You need to extend the blur effect to include different
         * kernel sizes and then apply the kernel to the entire image
         */

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                // Then set the blurred result to the output data
                var k = (x + y * outputData.width) * 4;

                for (var i = -offset; i < offset+1; i++) {
                    for (var j = -offset; j < offset+1; j++) {
                        var pixel = imageproc.getPixel(inputData,x+i,y+j);
                        outputData.data[k] = outputData.data[k] + pixel.r * kernel[i+offset][j+offset];
                        outputData.data[k+1] = outputData.data[k+1] + pixel.g * kernel[i+offset][j+offset];
                        outputData.data[k+2] = outputData.data[k+2] + pixel.b * kernel[i+offset][j+offset];
                    }
                }
                outputData.data[k] = outputData.data[k]/kernelSum;
                outputData.data[k+1] = outputData.data[k+1]/kernelSum;
                outputData.data[k+2] = outputData.data[k+2]/kernelSum;
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
