(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        console.log("Applying Sobel edge detection...");

        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];
		var kernelLimit = 1;

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */
        
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
				let index = (x + y * outputData.width) * 4;
				let xScore = 0;
				let yScore = 0;
				
				for (let j = -kernelLimit; j <= kernelLimit; ++j)
				{
					for (let i = -kernelLimit; i <= kernelLimit; ++i)
					{
						let pixel = imageproc.getPixel(inputData, x + i, y + j);
						xScore += Gx[i + kernelLimit][j + kernelLimit] * pixel.r;
						yScore += Gy[i + kernelLimit][j + kernelLimit] * pixel.r;
					}
				}
				let score = Math.hypot(xScore, yScore);
				if (score < threshold)
					score = 0
				else
					score = 255;
                outputData.data[index]     = 
                outputData.data[index + 1] = 
                outputData.data[index + 2] = score;
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
