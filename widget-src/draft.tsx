// // This is a counter widget with buttons to increment and decrement the number.

// const { widget } = figma
// const { useSyncedState, AutoLayout, Input, Text, SVG } = widget

// function MindMap() {
//   const [text, setText] = useSyncedState('text', 'Mind map')
//   const [newText, setNewText] = useSyncedState('newText', 'Idea')
//   const [widthSize, setWidthSize] = useSyncedState('widthSize', 80)
//   const fatherFontSize = 18

//   function random() {
//     return Math.random();
//   }

//   function opacityLow() {
//     // Skip over invisible nodes and their descendants inside instances
//     // for faster performance.
//     figma.skipInvisibleInstanceChildren = true
//     // Make the current selection half as transparent
//     for (const node of figma.currentPage.selection) {
//       if ("opacity" in node) {
//         node.opacity *= 0.5
//       }
//     }
//   }

//   async function addFatherBlock() {
//     try {
//       await figma.loadFontAsync({
//         family: "Inter",
//         style: "Medium"
//       })
//       // Utilisation de la fonction pour obtenir un nombre aléatoire
//       const randomNumberR = random();
//       const randomNumberG = random();
//       const randomNumberB = random();

//       const shapeLeft = figma.createShapeWithText()
//       shapeLeft.shapeType = 'SQUARE'
//       shapeLeft.text.characters = "MindMap"
//       shapeLeft.resize(120, 60)
//       shapeLeft.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
//       shapeLeft.text.fills = [{ type: 'SOLID', color: { r: 37 / 255, g: 50 / 255, b: 60 / 255 } }]
//       shapeLeft.strokeWeight = 2
//       shapeLeft.strokes = [{ type: 'SOLID', color: { r: 231 / 255, g: 236 / 255, b: 240 / 255 } }]

//       const shapeRight = figma.createShapeWithText()
//       shapeRight.x = 265
//       // shapeRight.y = 200
//       shapeRight.shapeType = 'SQUARE'
//       shapeRight.text.characters = 'MindMap'
//       shapeRight.resize(120, 60)
//       shapeRight.fills = [figma.util.solidPaint("#FFFFF00")]
//       shapeRight.text.fills = [{ type: 'SOLID', color: { r: 37 / 255, g: 50 / 255, b: 60 / 255 } }]
//       shapeRight.strokeWeight = 0


//       // Connect the two stickies
//       const connector = figma.createConnector()
//       connector.connectorStartStrokeCap = 'NONE'
//       connector.connectorEndStrokeCap = 'NONE'
//       connector.strokeWeight = 5
//       // connector.minWidth = 20
//       connector.strokes = [{ type: 'SOLID', color: { r: randomNumberR, g: randomNumberG, b: randomNumberB } }]
//       connector.connectorStart = {
//         endpointNodeId: shapeLeft.id,
//         magnet: 'AUTO',
//       }

//       connector.connectorEnd = {
//         endpointNodeId: shapeRight.id,
//         magnet: 'AUTO'
//       }
//     } catch (error) {
//       console.log("Erreur sur la fonction addFatherBlock", error)
//     }
//   }

//   // const sonFrame = figma.createFrame()
//   // sonFrame.itemSpacing = 200
//   // sonFrame.appendChild(shapeRight)
//   // sonFrame.layoutMode = 'VERTICAL'
//   // sonFrame.locked = false
//   // sonFrame.layoutSizingHorizontal = 'HUG'
//   // sonFrame.layoutSizingVertical = 'HUG'

//   // const fatherFrame = figma.createFrame()
//   // fatherFrame.itemSpacing = 200
//   // fatherFrame.appendChild(sonFrame)
//   // fatherFrame.layoutMode = 'HORIZONTAL'
//   // fatherFrame.locked = false
//   // fatherFrame.layoutSizingHorizontal = 'HUG'
//   // fatherFrame.layoutSizingVertical = 'HUG'


//   // const rectangle = figma.createRectangle()
//   // rectangle.resize(200, 100)

//   // // Set solid red fill
//   // rectangle.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]
//   // rectangle.reactions = [
//   //   {
//   //     trigger: {
//   //       type: 'ON_KEY_DOWN',
//   //       device: 'KEYBOARD',
//   //       keyCodes: [188]
//   //     }
//   //   }
//   // ]
//   const addSVGButton = `
//   <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
//   `;

//   const launchSVGButton = `
//   <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
//   `
//   // const mindBlock = `<Input
//   //                       value={newText}
//   //                       verticalAlignText="center"
//   //                       horizontalAlignText="center"
//   //                       onTextEditEnd={(e) => {
//   //                         if (newText == "") {
//   //                           setNewText("Mind Map")
//   //                         } else {
//   //                           setNewText(e.characters);
//   //                         }
//   //                       }}
//   //                       fontSize={16}
//   //                       fontWeight={600}
//   //                       fontFamily="Noto Sans"
//   //                       fill="#3A4550"
//   //                       width={100}
//   //                       height={50}
//   //                     />`

//   return (
//     <AutoLayout

//       horizontalAlignItems={'center'}
//       verticalAlignItems={'center'}
//       padding={8}
//       fill={'#EEF2F6'}
//     >
//       {/* <AutoLayout
//         minWidth={100}
//         padding={{
//           vertical: 8,
//           horizontal: 0
//         }}
//         verticalAlignItems={'center'}
//         horizontalAlignItems={'center'}
//         spacing={8}
//         cornerRadius={4}
//         strokeWidth={0.5}
//         stroke={'#E7ECF0'}
//         fill={'#FFF'}
//         effect={{
//           type: "drop-shadow",
//           color: {
//             r: 0,
//             g: 0,
//             b: 0,
//             a: 0.08,
//           },
//           offset: {
//             x: 2,
//             y: 2,
//           },
//           blur: 12,
//         }}
//         wrap={true}
//       >
//         <Input
//           width={widthSize}
//           value={text}
//           verticalAlignText="center"
//           horizontalAlignText="center"
//           inputFrameProps={{
//             padding: 4,
//           }}

//           inputBehavior="multiline"
//           onTextEditEnd={(e) => {
//             if (text.length !== 0) {
//               setText(e.characters);
//             } else {
//               setText("Mind Map")
//             }

//             if (text.length !== 0) {
//               setWidthSize(fatherFontSize * text.length)
//             } else {
//               setWidthSize(20)
//             }
//             console.log("Longueur du texte", (text.length))
//             console.log("Largeur du container", widthSize)
//             console.log("Taille police", fatherFontSize)
//           }}
//           fontSize={fatherFontSize}
//           fontWeight={500}
//           fontFamily="Ubuntu"
//           fill="#25323C"
//         />

//       </AutoLayout> */}
//       <SVG
//         // Using the svg component you can embed an svg right into the widget
//         src={launchSVGButton}
//         onClick={() => {
//           try {
//             addFatherBlock()
//           } catch (error) {
//             console.log(error)
//           }
//         }}
//       />
//       <SVG
//         // Using the svg component you can embed an svg right into the widget
//         src={addSVGButton}
//         onClick={() => {
//           try {
//             addFatherBlock()
//           } catch (error) {
//             console.log(error)
//           }
          
//         }}
//       />

//     </AutoLayout>

//   )
// }

// widget.register(MindMap)
