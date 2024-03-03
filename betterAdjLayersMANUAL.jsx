function renameAdjustmentLayers() {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    var layers = comp.layers;
    for (var i = 1; i <= layers.length; i++) {
        var layer = layers[i];
        if (layer instanceof AVLayer && layer.adjustmentLayer) {
            var effects = layer.property("ADBE Effect Parade");
            if (effects.numProperties > 0) {
                var newName = "";
                for (var j = 1; j <= effects.numProperties; j++) {
                    var effect = effects.property(j);
                    newName += effect.name + " ";
                }
                layer.name = newName;
            }
        }
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

    var discordText = dialog.add("statictext", undefined, "Discord: c.op");
    var githubText = dialog.add("statictext", undefined, "Github.com/x8j");

    dialog.onResizing = dialog.onResize = function() {
        this.layout.resize();
    };

    return dialog;
}


function showWindow(myWindow) {
    if (myWindow instanceof Window) {
        myWindow.center();
        myWindow.show();
    } else if (myWindow instanceof Panel) {
        myWindow.layout.layout(true);
        myWindow.layout.resize();
    }
}

var dockablePanel = createDockableUI(this);
showWindow(dockablePanel);
