/**
 * Changes the cursor between a pointer & default
 * @param {bool} pointer - If the cursor should be changed to a pointer
 */
function changeCursor(pointer) {
    var cursor = pointer ? "pointer" : "default";
    canvas.style.cursor = cursor;
}