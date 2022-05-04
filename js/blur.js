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
        // var kernel = [ [1, 1, 1], [1, 1, 1], [1, 1, 1] ];

        var kernelSum = 0;
        kernelSum = kernelSize*kernelSize + 1;// 1 is a magic number, if remove it, it will become brighter everytime. this is magic.

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
                outputData.data[k] = Math.floor(outputData.data[k]/kernelSum);
                outputData.data[k+1] = Math.floor(outputData.data[k+1]/kernelSum);
                outputData.data[k+2] = Math.floor(outputData.data[k+2]/kernelSum);
            }
        }
    }
	
	function gaussianFunction(sigma, u, v)
	{
		let e_exp = -(u * u + v * v) / (2 * sigma * sigma);
		let denominator = 2 * Math.PI * sigma * sigma;
		let gaussian_value = Math.pow(Math.E, e_exp) / denominator;
		return gaussian_value;
	}
	
	imageproc.gaussianBlur = function(inputData, outputData, sigma, size = 7)
	{
		console.log("Applying Gaussian Blur...");
		var offset = (size - 1) / 2;
		
		// generate Gaussian kernel
		var gaussian_kernel = [];
		for (var i = 0; i < size; i++) {
		    gaussian_kernel.push(new Array(size).fill(0));
		}

		var divisor = 0;
		for (let i = 0; i < size; ++i)
		{
			for (let j = 0; j < size; ++j)
			{
				gaussian_kernel[i][j] = gaussianFunction(sigma, j - offset, i - offset);
				divisor += gaussian_kernel[i][j];
				// console.log("index j: " + (j - offset) + " index i: " + (i - offset) + " kernel value: " + gaussian_kernel[i][j]);
			}
		}
		
		for (let y = 0; y < inputData.height; ++y)
		{
			for (let x = 0; x < inputData.width; ++x)
			{
				let index = (x + y * outputData.width) * 4;
				
				for (let i = -offset; i <= offset; ++i)
				{
					for (let j = -offset; j <= offset; ++j)
					{
						let pixel = imageproc.getPixel(inputData, x + j, y + i);
						
						outputData.data[index] 	   += gaussian_kernel[i + offset][j + offset] * pixel.r;
						outputData.data[index + 1] += gaussian_kernel[i + offset][j + offset] * pixel.g;
						outputData.data[index + 2] += gaussian_kernel[i + offset][j + offset] * pixel.b;
					}
				}
				outputData.data[index] = Math.floor(outputData.data[index] / divisor);
                outputData.data[index + 1] = Math.floor(outputData.data[index + 1] / divisor);
                outputData.data[index + 2] = Math.floor(outputData.data[index + 2] / divisor);
			}
		}
		
	}

}(window.imageproc = window.imageproc || {}));
