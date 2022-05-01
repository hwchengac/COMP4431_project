function cliping(value)
{
	if (value < 0)
		return 0;
	else if (value > 255)
		return 255;
	else
		return value;
}

(function(imageproc) {
    "use strict";

    /*
     * Apply negation to the input data
     */
    imageproc.negation = function(inputData, outputData) {
        console.log("Applying negation...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            outputData.data[i]     = 255 - inputData.data[i];
            outputData.data[i + 1] = 255 - inputData.data[i + 1];
            outputData.data[i + 2] = 255 - inputData.data[i + 2];
        }
    }

    /*
     * Convert the input data to grayscale
     */
    imageproc.grayscale = function(inputData, outputData) {
        console.log("Applying grayscale...");

        /**
         * TODO: You need to create the grayscale operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
			let intensity = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3;
            // Change the RGB components to the resulting value

            outputData.data[i]     = intensity;
            outputData.data[i + 1] = intensity;
            outputData.data[i + 2] = intensity;
        }
    }

    /*
     * Applying brightness to the input data
     */
    imageproc.brightness = function(inputData, outputData, offset) {
        console.log("Applying brightness...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by adding an offset

            outputData.data[i]     = inputData.data[i] + offset;
            outputData.data[i + 1] = inputData.data[i + 1] + offset;
            outputData.data[i + 2] = inputData.data[i + 2] + offset;

            // Handle clipping of the RGB components
			outputData.data[i] = cliping(outputData.data[i]);
			outputData.data[i + 1] = cliping(outputData.data[i + 1]);
			outputData.data[i + 2] = cliping(outputData.data[i + 2]);
        }
    }

    /*
     * Applying contrast to the input data
     */
    imageproc.contrast = function(inputData, outputData, factor) {
        console.log("Applying contrast...");

        /**
         * TODO: You need to create the brightness operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by multiplying a factor

            outputData.data[i]     = inputData.data[i] * factor;
            outputData.data[i + 1] = inputData.data[i + 1] * factor;
            outputData.data[i + 2] = inputData.data[i + 2] * factor;

            // Handle clipping of the RGB components
			outputData.data[i] = cliping(outputData.data[i]);
			outputData.data[i + 1] = cliping(outputData.data[i + 1]);
			outputData.data[i + 2] = cliping(outputData.data[i + 2]);
        }
    }

    /*
     * Make a bit mask based on the number of MSB required
     */
    function makeBitMask(bits) {
        var mask = 0;
        for (var i = 0; i < bits; i++) {
            mask >>= 1;
            mask |= 128;
        }
        return mask;
    }

    /*
     * Apply posterization to the input data
     */
    imageproc.posterization = function(inputData, outputData,
                                       redBits, greenBits, blueBits) {
        console.log("Applying posterization...");

        /**
         * TODO: You need to create the posterization operation here
         */

        // Create the red, green and blue masks
        // A function makeBitMask() is already given
		var redMask = makeBitMask(redBits);
		var greenMask = makeBitMask(greenBits);
		var blueMask = makeBitMask(blueBits);

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Apply the bitmasks onto the RGB channels

            outputData.data[i]     = (redMask & inputData.data[i]);
            outputData.data[i + 1] = (greenMask & inputData.data[i + 1]);
            outputData.data[i + 2] = (blueMask & inputData.data[i + 2]);
        }
    }

    /*
     * Apply threshold to the input data
     */
    imageproc.threshold = function(inputData, outputData, thresholdValue) {
        console.log("Applying thresholding...");

        /**
         * TODO: You need to create the thresholding operation here
         */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            // You will apply thresholding on the grayscale value
			let greyColour = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3;
           
            // Change the colour to black or white based on the given threshold
			if (greyColour < thresholdValue)
				greyColour = 0;
			else
				greyColour = 255;

            outputData.data[i]     = greyColour;
            outputData.data[i + 1] = greyColour;
            outputData.data[i + 2] = greyColour;
        }
    }

    /*
     * Build the histogram of the image for a channel
     */
    function buildHistogram(inputData, channel) {
        var histogram = [];
        for (var i = 0; i < 256; i++)
            histogram[i] = 0;

        /**
         * TODO: You need to build the histogram here
         */

        // Accumulate the histogram based on the input channel
        // The input channel can be:
        // "red"   - building a histogram for the red component
        // "green" - building a histogram for the green component
        // "blue"  - building a histogram for the blue component
        // "gray"  - building a histogram for the intensity
        //           (using simple averaging)
		
		switch (channel)
		{
			case "red":
			{
				for (let i = 0; i < inputData.data.length; i += 4)
				{
					histogram[inputData.data[i]] += 1;
				}
			}
			break;
			
			case "green":
			{
				for (let i = 0; i < inputData.data.length; i += 4)
				{
					histogram[inputData.data[i + 1]] += 1;
				}
			}
			break;
			
			case "blue":
			{
				for (let i = 0; i < inputData.data.length; i += 4)
				{
					histogram[inputData.data[i + 2]] += 1;
				}
			}
			break;
			
			case "gray":
			{
				for (let i = 0; i < inputData.data.length; i += 4)
				{
					let intensity = parseInt((inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3);
					histogram[intensity] += 1;
				}
			}
			break;
		}

        return histogram;
    }

    /*
     * Find the min and max of the histogram
     */
    function findMinMax(histogram, pixelsToIgnore) {
        var min = 0, max = 255;
		var min_pixels_ignore = pixelsToIgnore;
		var max_pixels_ignore = pixelsToIgnore;

        /**
         * TODO: You need to build the histogram here
         */

        // Find the minimum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
       
        // Find the maximum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
		
		for (min = 0; min < 255; ++min) 
		{
			if (histogram[min] > min_pixels_ignore) 
				break;
			else
				min_pixels_ignore -= histogram[min];
		}
		
		for (max = 255; max > 0; --max) 
		{
			if (histogram[max] > max_pixels_ignore) 
				break;
			else
				max_pixels_ignore -= histogram[max];
		}
        
        return {"min": min, "max": max};
    }

    /*
     * Apply automatic contrast to the input data
     */
    imageproc.autoContrast = function(inputData, outputData, type, percentage) {
        console.log("Applying automatic contrast...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;
		

        var histogram, minMax;
        if (type == "gray") {
            // Build the grayscale histogram
            histogram = buildHistogram(inputData, "gray");
			// console.log(histogram.slice(0, 10).join(","));

            // Find the minimum and maximum grayscale values with non-zero pixels
            minMax = findMinMax(histogram, pixelsToIgnore);

            var min = minMax.min, max = minMax.max, range = max - min;

            /**
             * TODO: You need to apply the correct adjustment to each pixel
             */

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each pixel based on the minimum and maximum values

                outputData.data[i]     = cliping((inputData.data[i] - min) / range * 255);
                outputData.data[i + 1] = cliping((inputData.data[i + 1] - min) / range * 255);
                outputData.data[i + 2] = cliping((inputData.data[i + 2] - min) / range * 255);
            }
        }
        else {

            /**
             * TODO: You need to apply the same procedure for each RGB channel
             *       based on what you have done for the grayscale version
             */
			var histogram_red = buildHistogram(inputData, "red");
			var histogram_green = buildHistogram(inputData, "green");
			var histogram_blue = buildHistogram(inputData, "blue");
			
			var minMax_red = findMinMax(histogram_red, pixelsToIgnore);
			var minMax_green = findMinMax(histogram_green, pixelsToIgnore);
			var minMax_blue = findMinMax(histogram_blue, pixelsToIgnore);
			
			var min_red = minMax_red.min, max_red = minMax_red.max, range_red = max_red - min_red;
			var min_green = minMax_green.min, max_green = minMax_green.max, range_green = max_green - min_green;
			var min_blue = minMax_blue.min, max_blue = minMax_blue.max, range_blue = max_blue - min_blue;

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each channel based on the histogram of each one

                outputData.data[i]     = cliping((inputData.data[i] - min_red) / range_red * 255);
                outputData.data[i + 1] = cliping((inputData.data[i + 1] - min_green) / range_green * 255);
                outputData.data[i + 2] = cliping((inputData.data[i + 2] - min_blue) / range_blue * 255);
            }
        }
    }

}(window.imageproc = window.imageproc || {}));
