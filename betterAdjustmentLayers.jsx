
function renameAdjustmentLayers() {
    var comp = app.project.activeItem;
    
    
    if (comp && comp instanceof CompItem) {
        var layers = comp.layers;
        
       
        for (var i = 1; i <= layers.length; i++) {
            var layer = layers[i];
         
            if (layer instanceof AVLayer && layer.adjustmentLayer) {
                var effects = layer.property("ADBE Effect Parade");
                
                // check if adj layer has effects applied
                if (effects.numProperties > 0) {
                    var newName = "";
                    
                    //look thorugh effects applied on adusmtnet layer
                    for (var j = 1; j <= effects.numProperties; j++) {
                        var effect = effects.property(j);
                        
                        
                        var effectName = effect.name;
                        
                        
                        newName +=  effectName + "+";
                    }
                    
                    //set name
                    layer.name = newName;
                }
            }
        }
        
       
        alert("Renamed");
    } else {
       
        alert("No composition found");
    }
}

// Call the function to rename adjustment layers
renameAdjustmentLayers();
