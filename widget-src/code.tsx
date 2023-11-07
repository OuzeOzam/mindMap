const { widget } = figma
const { useSyncedState, AutoLayout, Input, Text, SVG } = widget
const addSVGButton = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const launchSVGButton = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`

// Function returning random number
function random() {
  return Math.random();
}

// Function decrease opacity to the selected element
function opacityLow() {
  // Skip over invisible nodes and their descendants inside instances for faster performance.
  figma.skipInvisibleInstanceChildren = true
  // Make the current selection half as transparent
  for (const node of figma.currentPage.selection) {
    if ("opacity" in node) {
      node.opacity *= 0.5
    }
  }
}

const frame = figma.createFrame();
frame.x = 100
frame.y = 100
frame.locked = false;
frame.fills = [figma.util.solidPaint("#000")];
frame.clipsContent = true;
frame.layoutMode = "HORIZONTAL";
frame.layoutSizingHorizontal = "HUG";
frame.layoutSizingVertical = "HUG";

//
// Function add FATHER block
//
async function addFatherBlock() {
  try {
    await figma.loadFontAsync({
      family: "Inter",
      style: "Medium"
    })
    // Create the FATHER block
    const fatherBlock = figma.createShapeWithText()
    fatherBlock.shapeType = 'SQUARE'
    fatherBlock.text.characters = "MindMap"
    fatherBlock.resize(180, 80)
    fatherBlock.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    fatherBlock.text.fills = [{ type: 'SOLID', color: { r: 37 / 255, g: 50 / 255, b: 60 / 255 } }]
    fatherBlock.strokeWeight = 2
    fatherBlock.strokes = [{ type: 'SOLID', color: { r: 231 / 255, g: 236 / 255, b: 240 / 255 } }]

  } catch (error) {
    console.log("Erreur sur la fonction addFatherBlock", error)
  }
}
//
// END function add parent block
//

//
// Function add SON block
//
async function addSonBlock() {
  try {
    await figma.loadFontAsync({
      family: "Inter",
      style: "Medium"
    })
    const newBlock = figma.createText()
    newBlock.characters = 'MindMap'
    newBlock.resize(120, 60)
    newBlock.fills = [figma.util.solidPaint("#FFFFF00")]
    newBlock.fills = [{ type: 'SOLID', color: { r: 37 / 255, g: 50 / 255, b: 60 / 255 } }]
    newBlock.strokeWeight = 0
    newBlock.textAlignHorizontal = 'CENTER'
    newBlock.textAlignVertical = 'CENTER'
    newBlock.fontSize = 16
    newBlock.layoutPositioning = 'AUTO'

    frame.appendChild(newBlock);

    const randomNumberR = random()
    const randomNumberG = random()
    const randomNumberB = random()

    figma.skipInvisibleInstanceChildren = true

    for (const node of figma.currentPage.selection) {
      if ("stuckNodes" in node) {
        console.log("Stuck or not", node.stuckNodes)
      } else {
        console.log("Pas de stuckNodes")
      }
      if ("children" in node) {
        console.log("Children", node.children)
      } else {
        console.log("Pas d'enfant")
      }
      console.log("Position", node.x, node.y)
      console.log("Node", node)

      const connector = figma.createConnector()
      connector.connectorStartStrokeCap = 'NONE'
      connector.connectorEndStrokeCap = 'NONE'
      connector.strokeWeight = 5
      connector.strokes = [{ type: 'SOLID', color: { r: randomNumberR, g: randomNumberG, b: randomNumberB } }]
      connector.connectorStart = {
        endpointNodeId: node.id,
        magnet: 'AUTO',
      }
      connector.connectorEnd = {
        endpointNodeId: newBlock.id,
        magnet: 'AUTO'
      }
    }
    return newBlock;

  } catch (error) {
    console.log("Erreur sur la fonction addSonBlock", error)
  }
}
//
// END function add parent block
//

//
// Declare the widget function
//
function MindMap() {

  return (
    <AutoLayout
      horizontalAlignItems={'center'}
      verticalAlignItems={'center'}
      padding={8}
      fill={'#EEF2F6'}
    >

      {/* Button launching the FATHER block */}
      <SVG src={launchSVGButton} onClick={() => {
        try {
          addFatherBlock()
        } catch (error) {
          console.log(error)
        }
      }}
      />

      {/* Button launching the SON block */}
      {/* <SVG src={addSVGButton} onClick={() => {
        try {
          addSonBlock()
        } catch (error) {
          console.log(error)
        }
      }}
      /> */}
      <SVG src={addSVGButton} onClick={async () => {
        try {
          const newBlock = await addSonBlock();
          if (newBlock) {
            frame.appendChild(newBlock);
          }
        } catch (error) {
          console.log(error);
        }
      }}
      />
    </AutoLayout>
  )
}
//
// END Declare the Widget
//

// Launching the widget
widget.register(MindMap)
