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
                var newName = [];
                for (var j = 1; j <= effects.numProperties; j++) {
                    newName.push(effects.property(j).name);
                }
                layer.name = newName.join(" ");
            }
        }
    }
}

function highlightLayersWithEffect(effectName, resultText) {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    var layers = comp.layers;
    var matchedLayers = 0;
    app.beginUndoGroup("Highlight Layers with Effect");

    for (var i = 1; i <= layers.length; i++) {
        var layer = layers[i];
        layer.selected = layer instanceof AVLayer && layer.name.indexOf(effectName) !== -1;
        if (layer.selected) {
            matchedLayers++;
        }
    }

    resultText.text = matchedLayers + " layers found with effect: " + effectName;

    app.endUndoGroup();
}

function changeSelectedLayersColor(color) {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    var layers = comp.selectedLayers;
    if (layers.length === 0) {
        alert("Please select at least one layer.");
        return;
    }

    app.beginUndoGroup("Change Layers Color");

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer instanceof AVLayer) {
            layer.label = color;
        }
    }

    app.endUndoGroup();
}

function createDockableUI(thisObj) {
    var dialog =
        thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "Effect Layer Renamer", undefined, { resizeable: true });
    dialog.alignChildren = "center";

    var renameButton = dialog.add("button", undefined, "Rename Layers");
    renameButton.alignment = ["fill", "top"];
    renameButton.onClick = function() {
        renameAdjustmentLayers();
    };

    dialog.add("statictext", undefined, "Common issue: Script renames but AE does not update the names in UI,");
    dialog.add("statictext", undefined, "click on any adjustment layer and click rename and it should update.");
    dialog.add("statictext", undefined, "This issue may occur when making and entering a precomp also.");
    dialog.add("statictext", undefined, "Any issues? Add me! Discord: c.op");

    var effectNameInput = dialog.add("edittext", undefined, "Enter effect name");
    effectNameInput.alignment = ["fill", "top"];
    effectNameInput.characters = 20; 

    var highlightButton = dialog.add("button", undefined, "Highlight Layers");
    highlightButton.alignment = ["fill", "top"];

    var resultText = dialog.add("statictext", undefined, "");

    var colorPicker = dialog.add("dropdownlist", undefined, [
        "None",
        "Red",
        "Yellow",
        "Aqua",
        "Pink",
        "Lavender",
        "Peach",
        "Seafoam",
        "Blue",
        "Green",
        "Purple",
        "Orange",
        "Brown",
        "Fuchsia",
        "Cyan",
        "Sandstone"
    ]);
    colorPicker.selection = 0;

    var colorButton = dialog.add("button", undefined, "Change Color");
    colorButton.alignment = ["fill", "top"];

    highlightButton.onClick = function() {
        var effectName = effectNameInput.text;
        highlightLayersWithEffect(effectName, resultText);
    };

    colorButton.onClick = function() {
        var color = colorPicker.selection.index;
        changeSelectedLayersColor(color);
    };

    dialog.onResizing = dialog.onResize = function() {
        this.layout.resize();
    };

    return dialog;
}

var dockablePanel = createDockableUI(this);

if (dockablePanel instanceof Window) {
    dockablePanel.center();
    dockablePanel.show();
} else {
    dockablePanel.layout.layout(true);
    dockablePanel.layout.resize();
}
