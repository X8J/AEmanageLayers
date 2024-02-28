var interval = 2500; // Initial interval: 5000 milliseconds (5 seconds)

function renameAdjustmentLayers() {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var layers = comp.layers;
        for (var i = 1; i <= layers.length; i++) {
            var layer = layers[i];
            if (layer instanceof AVLayer && layer.adjustmentLayer) {
                var effects = layer.property("ADBE Effect Parade");
                if (effects.numProperties > 0) {
                    var newName = "";
                    for (var j = 1; j <= effects.numProperties; j++) {
                        var effect = effects.property(j);
                        var effectName = effect.name;
                        newName +=  effectName + " ";
                    }
                    layer.name = newName;
                }
            }
        }
    } else {
        alert("Please select a composition.");
    }

    // Schedule the task to run again after the interval
    app.scheduleTask("renameAdjustmentLayers()", interval, false);
}

(function() {
    // Start the renaming process
    renameAdjustmentLayers();
})();
