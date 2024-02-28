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
                        newName += effectName + "+";
                    }
                    layer.name = newName;
                }
            }
        }
        alert("Renamed");
    } else {
        alert("Composition not found");
    }
}

function createGUI() {
    var window = new Window("palette", "Kai BetterAdjLayers");
    window.orientation = "column";
    var button = window.add("button", undefined, "Rename Layers");
    button.onClick = function() {
        renameAdjustmentLayers();
    };
    window.show();
}

createGUI();
