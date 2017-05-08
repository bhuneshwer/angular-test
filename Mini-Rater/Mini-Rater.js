(function() {
    var tmpRadius = null;
    var tmpArc = null;
    var tmpArcWidth = null;
    var tmpFontStyle = null;
    var tmpFontSize = false;
    var tmpNumberOfArcs = 10;
    var positiveColor = null;
    var Colors = {
        // "10": {
        //     "positveColors": ['#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#FFC107', '#FFC107', '#1B5E20', '#1B5E20']
        // },
        // "5": {
        //     "positveColors": ['#f5ea14', '#bbd531', '#66b846', '#0b7139', '#0e7a17']
        // },
        // "6": {
        //     "negativeColors": ['#fab416', '#f48020', '#f05f22', '#ed2424', '#c42031', '#960a67'],
        //     "positveColors": ['#f5ea14', '#bbd531', '#66b846', '#0b7139', '#0e7a17', '#193419']
        // },
        // "11": {
        //     "positveColors": [ "#ff0000","#ff0000","#ff0000","#ff0000","#ff0000","#ff0000", "#ff0000", "#ffa500","#ffa500", "#008000","#008000"]
        // }
        "11": ["#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ffa500", "#ffa500", "#008000", "#008000"],
        "10": ['#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#B71C1C', '#FFC107', '#FFC107', '#1B5E20', '#1B5E20'],
        "6": ['#f5ea14', '#bbd531', '#66b846', '#0b7139', '#0e7a17', '#193419'],
        "5": ['#f5ea14', '#bbd531', '#66b846', '#0b7139', '#0e7a17']


    }

    // declare a new component called Rater
    MiniRater = function(canvas, positiveColors, negativeColors, numberOfArcs) {
        if (tmpRadius && tmpArc && tmpArcWidth && tmpRadius) {
            tmpRadius = null;
            tmpArc = null;
            tmpArcWidth = null;
            tmpFontStyle = null
        }
        // Changes by Bhunesh - Handled blank array
        if (positiveColors && positiveColors.length > 0) {
            positiveColor = positiveColors;
        }
        if (negativeColors && negativeColors.length > 0) {
            negativeColor = negativeColors;
        }
        if (numberOfArcs) {
            tmpNumberOfArcs = numberOfArcs;
        }
        this.canvas = document.getElementById("litmus-score") //canvas;
        this.drawWheel = drawWheel;
        this.draw = function(isRaterFive) {

            // hard coded default rating to 2;
            this.drawWheel(this.canvas, 0, isRaterFive);

        }
        this.setRating = function(rating, isRaterFive) {
            if (Math.abs(rating) > tmpNumberOfArcs) {
                console.log("Wrong rating value, Rating value should be less than number of arcs.");
            } else {
                this.drawWheel(this.canvas, rating, isRaterFive);
            }
        }

        this.setRadius = function(radius, arc, arcWidth, fontSize) {
            tmpRadius = radius;
            tmpArc = arc;
            tmpArcWidth = arcWidth;
            tmpFontStyle = 'bold ' + fontSize + 'pt Open Sans';
            tmpFontSize = fontSize;

        }

    };

    function drawWheel(canvas, r, isRaterFive) {
        var context = canvas.getContext('2d');
        var defaultColor = '#20314D';
        var isMobile = false;
        var isClicked = false;
        var countMove = 0;
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var radius = (tmpRadius) ? tmpRadius : 20;
        var PI2 = Math.PI * 2;
        var thumbAngle = PI2 / 30;
        var startRating = 0;
        var mouseMoveCount = 0;
        var slidingRightSide = null;
        var previousCount = 0;
        var arcWidth = (tmpArcWidth) ? tmpArcWidth : 8;

        //draw the arc in specified position
        function drawArc(start, end, color, opacity, width, counterClockwise) {
            var startAngle = start * Math.PI;
            var endAngle = end * Math.PI;
            context.save();
            context.beginPath();
            context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
            context.lineWidth = width;

            // line color
            context.globalAlpha = opacity;
            context.strokeStyle = color;
            context.stroke();
            context.globalAlpha = 1.0;
            context.restore();
        }

        function getNegColor(numberOfArcs) {
            if (numberOfArcs == 6) {
                var negativeColor = ['#fab416', '#f48020', '#f05f22', '#ed2424', '#c42031', '#960a67'];
                return negativeColor;
            } else {
                return '#960a67';
            }
        }

        function getPosColor(numberOfArcs){
            console.log('getPosColor::' + numberOfArcs);
            if(numberOfArcs == 11 || numberOfArcs  == 10 || numberOfArcs == 6 || numberOfArcs  == 5)
            {
                
                Colors[numberOfArcs];
                return Colors[numberOfArcs];
            }else{
               return '#078e26'; 
            }
        }

        //draw arc angle
        function getArcAngle(numberOfArcs) {
            var angle = null;
            if (numberOfArcs) {
                angle = 2 / numberOfArcs;
            }
            return angle;
        }

        function getCordinateValueBetweenTwoArc(angle) {
            var cordinate = (angle / 100) * 5;
            return cordinate;
        }

        function fillColorPos(rating, numberOfArcs) {
            //var numberOfArcs = 6;
            var color = getPosColor(numberOfArcs);
            console.log(color)
            var j = 0;
            var tmpcolor;

            function changePosColor(rv) {
                if (typeof color == "string") {
                    tmpcolor = color;
                    return tmpcolor;
                } else {
                    if (rv!= null) {
                        tmpcolor = color[rv];
                        return tmpcolor;
                    }
                }

                //j++;





            }
            var arcAngle = getArcAngle(numberOfArcs);
            var cordinate = getCordinateValueBetweenTwoArc(arcAngle);
            var initialValue = 1.50;

            var nextVal = (arcAngle / 100) * 95;


            console.log("rating is decimal:" + !Number.isInteger(rating));
            if (!Number.isInteger(rating)) {
                var tmp = parseInt(rating)
                var newIntValue = (rating - tmp) * 10;
                var num =( Math.round(rating * 10) / 10).toFixed();
     



                console.log("old rating value :" + rating + "\n tmp :" + tmp + "\n newrating value:" + newIntValue)
                for (var i = 1; i <= rating + 1; i++) {
                    if (i <= tmp) {
                        console.log(changePosColor(num));
                        drawArc(initialValue, initialValue + nextVal, changePosColor(num), 1, arcWidth, false);
                        initialValue += arcAngle;
                    } else {
                        nextVal = (nextVal / 10) * newIntValue;
                        drawArc(initialValue, initialValue + nextVal, changePosColor(num), 1, arcWidth, false);
                        initialValue += arcAngle;
                    }

                }


            } else {
                for (var i = 1; i <= rating; i++) {
                    drawArc(initialValue, initialValue + nextVal, changePosColor(), 1, arcWidth, false);
                    initialValue += arcAngle;
                }
            }



        }

        function fillColorNeg(rating, numberOfArcs) {
            //var numberOfArcs = 6;
            var color = getNegColor(numberOfArcs);
            var j = 0;
            var tmpcolor

            function changeNegColor(rv) {
                if (typeof color == "string") {
                    tmpcolor = color;
                    return tmpcolor;
                } else {
                    if (rv!= null) {
                        tmpcolor = color[rv-1];
                        return tmpcolor;
                    }
                }


            }
            var arcAngle = getArcAngle(numberOfArcs);
            var cordinate = getCordinateValueBetweenTwoArc(arcAngle);
            var lastValue = 1.50 - cordinate;
            var nextVal = (arcAngle / 100) * 95;

            if (!Number.isInteger(rating)) {
                var tmp = parseInt(rating)
                var newIntValue = (rating - tmp) * 10;
                 var num =( Math.round(rating * 10) / 10).toFixed();
              



                console.log("old rating value :" + rating + "\n tmp :" + tmp + "\n newrating value:" + newIntValue)
                for (var i = 1; i <= rating + 1; i++) {
                    if (i <= tmp) {
                        drawArc(lastValue, lastValue - nextVal, changeNegColor(num), 1, arcWidth, true);
                        lastValue -= arcAngle;
                    } else {
                        nextVal = (nextVal / 10) * newIntValue;
                        drawArc(lastValue, lastValue - nextVal, changeNegColor(num), 1, arcWidth, true);
                        lastValue -= arcAngle;
                    }

                }


            } else {
                for (var i = 1; i <= rating; i++) {
                    drawArc(lastValue, lastValue - nextVal, changeNegColor(), 1, arcWidth, true);
                    lastValue -= arcAngle;
                }
            }


        }


        //draw rating base arcs or cicle
        function drawBase(numberOfArcs) {

            //var numberOfArcs = 6;
            var arcAngle = getArcAngle(numberOfArcs);
            var cordinate = getCordinateValueBetweenTwoArc(arcAngle);
            var initialValue = 1.50;
            var nextVal = (arcAngle / 100) * 95;

            for (var i = 1; i <= numberOfArcs; i++) {

                drawArc(initialValue, initialValue + nextVal, defaultColor, 0.2, arcWidth, false);
                initialValue += arcAngle;
            }



            context.beginPath();
            var arcVal = (tmpArc) ? tmpArc : 12;
            context.arc(x, y, arcVal, 0 * Math.PI, 2 * Math.PI, false);
            // context.fillStyle = 'green';
            context.fillStyle = 'white';
            context.fill();
            context.lineWidth = 1;

            // line color
            context.globalAlpha = 1;
            context.strokeStyle = 'white';
            context.stroke();
            context.globalAlpha = 2.0;
            if (r > 0) {
                fillColorPos(r, numberOfArcs);
            } else {
                fillColorNeg(-(r), numberOfArcs);
            }



        }

        //write rating point and messages
        function writeMessage(ratingPoint) {
            context.beginPath();
            if (tmpFontStyle) {
                context.font = (!isRaterFive) ? tmpFontStyle : 'bold 20pt Open Sans';
            } else {
                context.font = 'bold 12pt Open Sans';
            }
            context.fillStyle = "#000";
            context.textAlign = "center";
            // for large font set th padding
            // var pos = (tmpFontStyle) ? 8 : 5;
            var pos = (tmpFontStyle) ? 4 : 5;
            if (ratingPoint > 0) {
                ratingPoint = ratingPoint;
            }
            if (tmpFontSize && tmpFontSize > 15) {
                pos = pos + 10;
            } else if (tmpFontStyle && tmpFontSize <= 12) {
                pos = pos + 3;
            }
            context.fillText(ratingPoint, x, y + pos);
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        var rad = -1;


        // if (r > 0) {
        //     slidingRightSide = true;
        //     rad = ((-0.51) + (r * 0.32));
        // } else {
        //     slidingRightSide = false;
        //     rad = (r == -6) ? (((1.48) + (r * 0.33))) : ((r == -1) ? (((1.48) + (r * 0.34))) : (((1.48) + (r * 0.33))));
        // }
        console.log("rad:::", rad)
        if (!isRaterFive) {
            drawBase(tmpNumberOfArcs);
            // fillColor(4, 7);
            //drawRating(rad);
        }
        writeMessage(r);
    }

})();
