// const { widget } = figma
// const { Text, useSyncedState, useEffect } = widget

// function IFrameExample() {
//   const [name, setName] = useSyncedState('name', '[Enter your name]')
//   useEffect(() => {
//     figma.ui.onmessage = (message) => {
//       if (message.type === 'name') {
//         setName(message.name)
//         figma.closePlugin()
//       }
//     }
//   })

//   return (
//     <Text
//       onClick={() => {
//         return new Promise((resolve) => {
//           figma.showUI(`
//             <input id="name" type="text" placeholder="Name">
//             <button id="submit">Submit</button>
//             <script>
//               document.getElementById('submit').onclick = () => {
//                 const textbox = document.getElementById('name')
//                 const name = textbox.value
//                 const message = { pluginMessage: {type: 'name', name} }
//                 parent.postMessage(message, '*')
//               }
//               window.onkeydown = (e) => {
//                 if (e.key === 'ArrowRight') {
//                   const textbox = document.getElementById('name');
//                   const name = textbox ? textbox.value : '';
//                   const message = { pluginMessage: { type: 'name', name } };
//                   parent.postMessage(message, '*');
//                 }
//               };
//             </script>
//         `)
//         })
//       }}
//     >
//       Hello {name}
//     </Text>
//   )
// }

// widget.register(IFrameExample