function getLast(path) {
  return path[path.length - 1];
}

function inPath(item, path) {
  const contains = path.filter(p => p === item);
  return !!contains;
}

function logRecursive(item, currentFocusedPath, level = 1) {
  const isFocused = item === getLast(currentFocusedPath);
  const isInPath = inPath(item, currentFocusedPath);
  const name = item.constructor.name;
  const id = item.focusableId;
  const spacer = new Array(level).join("  ");
  console.log(spacer, name, id, isFocused ? "XXX" : isInPath ? "X" : "");
  item.children.forEach(child =>
    logRecursive(child, currentFocusedPath, level + 1)
  );
}

export function logTree(navigation) {
  const root = navigation.focusableComponents.navigation;
  const currentFocusedPath = navigation.currentFocusedPath;
  logRecursive(root, currentFocusedPath);
}
