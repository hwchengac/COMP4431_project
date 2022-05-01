(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
		var kernel;
		switch (kernelSize)
		{
			case 3:
				kernel = [ [1, 1, 1], 
						   [1, 1, 1], 
						   [1, 1, 1] ];
				break;
				
			case 5:
				kernel = [ [1, 1, 1, 1, 1], 
						   [1, 1, 1, 1, 1], 
						   [1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1] ];
				break;
				
			case 7:
				kernel = [ [1, 1, 1, 1, 1, 1, 1], 
						   [1, 1, 1, 1, 1, 1, 1], 
						   [1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1] ];
				break;
			
			case 9:
				kernel = [ [1, 1, 1, 1, 1, 1, 1, 1, 1], 
						   [1, 1, 1, 1, 1, 1, 1, 1, 1], 
						   [1, 1, 1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1, 1, 1],
						   [1, 1, 1, 1, 1, 1, 1, 1, 1] ];
				break;
		}
		var kernelLimit = (kernelSize - 1) / 2;

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
				let index = (x + y * outputData.width) * 4;
				for (let j = -kernelLimit; j <= kernelLimit; ++j)
				{
					for (let i = -kernelLimit; i <= kernelLimit; ++i)
					{
						let pixel = imageproc.getPixel(inputData, x + i, y + j);
						outputData.data[index] += kernel[i + kernelLimit][j + kernelLimit] * pixel.r;
						outputData.data[index + 1] += kernel[i + kernelLimit][j + kernelLimit] * pixel.g;
						outputData.data[index + 2] += kernel[i + kernelLimit][j + kernelLimit] * pixel.b;
					}
				}
				outputData.data[index] /= (kernelSize * kernelSize);
				outputData.data[index + 1] /= (kernelSize * kernelSize);
				outputData.data[index + 2] /= (kernelSize * kernelSize);
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
