const { widget } = figma
const { useSyncedState, AutoLayout, Input, Text, SVG } = widget
const addSVGButton = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
const launchSVGButton = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`
const removeSVGButton = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`
const eyeSVGButton = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>`
const squareSVGButton = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M666-440 440-666l226-226 226 226-226 226Zm-546-80v-320h320v320H120Zm400 400v-320h320v320H520Zm-400 0v-320h320v320H120Zm80-480h160v-160H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160v-160H600v160Zm-400 0h160v-160H200v160Zm160-400Zm194-65ZM360-360Zm240 0Z"/></svg>`

// Function returning random number
function random() {
  return Math.random();
}
// Function traverse a node selected and add
function addElementIntoSelection(element: any) {
  figma.skipInvisibleInstanceChildren = true
  try {
    for (const node of figma.currentPage.selection) {
      if ("appendChild" in node) {
        node.appendChild(element);
        console.log("Current selection 1", node)
      } else {
        console.log("Pas de appenChild :", Reflect.getPrototypeOf(node))
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// Function ajoute un element dans un parent
function addElementIntoParent(element: any, parent: any) {
  figma.skipInvisibleInstanceChildren = true
  try {
    for (const parent of figma.currentPage.selection) {
      if ("appendChild" in parent) {
        parent.appendChild(element);
      } else {
        console.log("Pas de appenChild :", Reflect.getPrototypeOf(parent))
      }
    }
  } catch (error) {
    console.log(error)
  }
}

let fatherFrame
let fatherBlock
let newBlock
let childFrame
let connector
let stepFatherFrame

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
    fatherBlock = figma.createShapeWithText()
    fatherBlock.shapeType = 'SQUARE'
    fatherBlock.text.characters = "MindMap"
    fatherBlock.resize(170, 70)
    fatherBlock.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    fatherBlock.text.fills = [{ type: 'SOLID', color: { r: 37 / 255, g: 50 / 255, b: 60 / 255 } }]
    fatherBlock.strokeWeight = 2
    fatherBlock.strokes = [{ type: 'SOLID', color: { r: 231 / 255, g: 236 / 255, b: 240 / 255 } }]

    fatherFrame = figma.createFrame()
    fatherFrame.fills = [figma.util.solidPaint("#FFFFF00")]
    fatherFrame.layoutMode = "HORIZONTAL";
    fatherFrame.layoutSizingHorizontal = "HUG";
    fatherFrame.layoutSizingVertical = "HUG";
    fatherFrame.horizontalPadding = 20
    fatherFrame.verticalPadding = 20
    fatherFrame.primaryAxisAlignItems = 'CENTER'
    fatherFrame.counterAxisAlignItems = 'CENTER'
    fatherFrame.counterAxisSizingMode = 'AUTO'
    fatherFrame.clipsContent = false


    // fatherFrame.setRelaunchData({  }) 
    // fatherFrame.itemSpacing = 75

    fatherFrame.appendChild(fatherBlock)

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


    const randomNumberR = random()
    const randomNumberG = random()
    const randomNumberB = random()
    const newBlock = figma.createText()

    figma.skipInvisibleInstanceChildren = true

    for (const node of figma.currentPage.selection) {
      try {
        newBlock.x = node.x + 300
        newBlock.y = node.y
        newBlock.characters = 'MindMap'
        newBlock.resize(140, 70)
        newBlock.fills = [figma.util.solidPaint("#FFF")]
        newBlock.fills = [{ type: 'SOLID', color: { r: 37 / 255, g: 50 / 255, b: 60 / 255 } }]
        newBlock.strokeWeight = 0
        newBlock.textAlignHorizontal = 'LEFT'
        newBlock.textAlignVertical = 'CENTER'
        newBlock.fontSize = 16
        newBlock.layoutPositioning = 'AUTO'
        newBlock.textAutoResize = 'WIDTH_AND_HEIGHT'
        // figma.currentPage.selection = figma.currentPage.selection.concat(newBlock)
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
          magnet: 'AUTO',
        }
      }
      catch (error) {
        console.log(error)
      }
    }
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
      <SVG src={launchSVGButton} onClick={async () => {
        try {
          await addFatherBlock()
        } catch (error) {
          console.log(error)
        }
      }}
      />

      <SVG src={addSVGButton} onClick={async () => {
        try {
          await addSonBlock();

        } catch (error) {
          console.log(error);
        }
      }}
      />
      <SVG src={squareSVGButton} onClick={async () => {
        try {
          await figma.loadFontAsync({
            family: "Inter",
            style: "Medium"
          })


          const randomNumberR = random()
          const randomNumberG = random()
          const randomNumberB = random()

          newBlock = figma.createText()
          childFrame = figma.createFrame()
          connector = figma.createConnector()


          newBlock.characters = 'MindMap'
          newBlock.resize(140, 70)
          newBlock.fills = [{ type: 'SOLID', color: { r: 37 / 255, g: 50 / 255, b: 60 / 255 } }]
          newBlock.strokeWeight = 0
          newBlock.textAlignHorizontal = 'LEFT'
          newBlock.textAlignVertical = 'CENTER'
          newBlock.fontSize = 16
          newBlock.layoutPositioning = 'AUTO'
          newBlock.textAutoResize = 'WIDTH_AND_HEIGHT'

          childFrame.fills = [figma.util.solidPaint("#FFFFF00")]
          childFrame.layoutMode = "HORIZONTAL";
          childFrame.layoutSizingHorizontal = "HUG";
          childFrame.layoutSizingVertical = "HUG";
          childFrame.paddingLeft = 50
          childFrame.verticalPadding = 20
          childFrame.clipsContent = false

          connector.connectorStartStrokeCap = 'NONE'
          connector.connectorEndStrokeCap = 'NONE'
          connector.strokeWeight = 5
          connector.strokes = [{ type: 'SOLID', color: { r: randomNumberR, g: randomNumberG, b: randomNumberB } }]

          connector.connectorEnd = {
            endpointNodeId: newBlock.id,
            magnet: 'LEFT',
          }

          let isFrame

          for (const node of figma.currentPage.selection) {
            if ("children" in node) {
              for (let nodeChild of node.children) {
                if (nodeChild.type.includes('FRAME')) {
                  isFrame = true
                } else {
                  isFrame = false
                }
              }
            } else {
              console.log("Pas de appenChild :", Reflect.getPrototypeOf(node))
            }
          }


          if (isFrame == false) {
            stepFatherFrame = figma.createFrame()
            stepFatherFrame.fills = [figma.util.solidPaint("#FFFFF00")]
            stepFatherFrame.layoutMode = "VERTICAL";
            stepFatherFrame.layoutSizingHorizontal = "HUG";
            stepFatherFrame.layoutSizingVertical = "HUG";
            stepFatherFrame.verticalPadding = 20
            stepFatherFrame.horizontalPadding = 20
            stepFatherFrame.visible = true
            stepFatherFrame.clipsContent = false


            for (const node of figma.currentPage.selection) {
              if ("children" in node) {
                if ("id" in node.children[0]) {
                  connector.connectorStart = {
                    endpointNodeId: node.children[0].id,
                    magnet: 'RIGHT',
                  }
                  console.log(node.children[0].id)
                }

              }
            }
            //Ajoute le connecteur dans StepFather

            stepFatherFrame.appendChild(childFrame)

            addElementIntoSelection(stepFatherFrame)



          }
          else {


            for (const node of figma.currentPage.selection) {
              if ("children" in node) {
                node.children[1].appendChild(childFrame)
                connector.connectorStart = {
                  endpointNodeId: node.children[0].id,
                  magnet: 'RIGHT',
                }
              }
              

            }
          }
          childFrame.appendChild(newBlock)
          childFrame.appendChild(connector)



        } catch (error) {
          console.log(error);
        }
      }}
      />
      <SVG src={eyeSVGButton} onClick={async () => {
        figma.createEllipse()
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
