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
        alert("Adjustment layers renamed based on applied effects.");
    } else {
        alert("Please select a composition.");
    }
}

function createDockableUI(thisObj) {
    var dialog =
        thisObj instanceof Panel
            ? thisObj
            : new Window("palette", undefined, undefined, { resizeable: true });
    dialog.alignChildren = "center";

   
    

    var button = dialog.add("button", undefined, "Rename Layers");
    button.alignment = ["fill", "top"];

    button.onClick = function() {
        renameAdjustmentLayers();
    };

    dialog.onResizing = dialog.onResize = function() {
        this.layout.resize();
    };

    return dialog;
}


function showWindow(myWindow) {
    if (myWindow instanceof Window) {
        myWindow.center();
        myWindow.show();
    }
    if (myWindow instanceof Panel) {
        myWindow.layout.layout(true);
        myWindow.layout.resize();
    }
}

var dockablePanel = createDockableUI(this);
showWindow(dockablePanel);
