(function() {
    var interval = 2500; // Initial interval: 2500 milliseconds (2.5 seconds)

    function trimRight(str) {
        var i = str.length - 1;
        while (i >= 0 && (str.charAt(i) === ' ' || str.charAt(i) === '\n' || str.charAt(i) === '\r' || str.charAt(i) === '\t')) {
            i--;
        }
        return str.substring(0, i + 1);
    }

    function renameAdjustmentLayers() {
        var comp = app.project.activeItem;
        if (comp && comp instanceof CompItem) {
            var layers = comp.layers;
            for (var i = 1; i <= layers.length; i++) {
                var layer = layers[i];
                if (layer instanceof AVLayer && layer.adjustmentLayer) {
                    var effects = layer.property("ADBE Effect Parade");
                    if (effects.numProperties > 0) {
                        var generatedName = "";
                        for (var j = 1; j <= effects.numProperties; j++) {
                            var effect = effects.property(j);
                            var effectName = effect.name;
                            generatedName +=  effectName + " ";
                        }

                      
                        generatedName = trimRight(generatedName);

                       
                        if (layer.name.substring(0, 4) === "Adju" || layer.name.substring(0, 4) === generatedName.substring(0, 4)) {
                            // Check if the current name matches the generated name
                            if (layer.name !== generatedName) {
                                layer.name = generatedName;
                            }
                        }
                    }
                }
            }
        } else {
            alert("Please select a composition.");
        }

        //schedule task to run after 2.5 seconds
        app.scheduleTask("renameAdjustmentLayers()", interval, false);
    }

    //start renaming
    renameAdjustmentLayers();
})();