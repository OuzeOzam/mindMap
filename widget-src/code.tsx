const { widget } = figma
const { Text, useSyncedState, useEffect, AutoLayout, Input } = widget

function IFrameExample() {

  const [name, setName] = useSyncedState('name', '[Enter your name]')
  let countdown = 4; // Initialiser le décompte à 5 secondes

  function closePlugin() {
    figma.closePlugin();
  }

  // Définir une fonction pour montrer l'UI
  const showUI = () => {
    return new Promise((resolve) => {
      figma.showUI(__html__, { visible: true })
    });
  }

  useEffect(() => {
    showUI();
    figma.ui.onmessage = (message) => {
      if (message === true) {
        figma.createEllipse()
        console.log(message)
      }
      if (message.type === 'name') {
        setName(message.name);
        // Définir l'intervalle pour mettre à jour le message chaque seconde
        const intervalId = setInterval(() => {
          countdown -= 1;
          if (message.name === '') {
            figma.notify(
              `Vous n'avez pas entré de nom ? La fenêtre va se fermer dans ${countdown} secondes`,
              {
                timeout: 1000, // Afficher le message pendant 1 seconde
                button: {
                  text: 'Ajouter mon nom',
                  action: () => {
                    clearInterval(intervalId); // Arrêter le décompte
                  },
                },
              }
            );
          } else {
            figma.notify(
              `Votre nom est bien : ${message.name} ? La fenêtre va se fermer dans ${countdown} secondes`,
              {
                timeout: 1000, // Afficher le message pendant 1 seconde
                button: {
                  text: 'Modifier mon nom',
                  action: () => {
                    clearInterval(intervalId); // Arrêter le décompte
                  },
                },
              }
            );
          }

          if (countdown < 0) {
            clearInterval(intervalId); // Arrêter le décompte
            closePlugin(); // Fermer le plugin après 5 secondes
          }
        }, 1000); // Répéter toutes les secondes
      }
    }
  })
  const [text, setText] = useSyncedState("text", "")
  return (
    <AutoLayout>
      <Text onClick={showUI}>
        Hello {name}
      </Text>
      {/* <Input
      onClick={showUI}
        value={text}
        placeholder="Type name"
        onTextEditEnd={(e) => {
          setText(e.characters);
        }}
        fontSize={64}
        fill="#7f1d1d"
        width={500}
        inputFrameProps={{
          fill: "#fee2e2",
          stroke: "#b91c1c",
          cornerRadius: 16,
          padding: 20,
        }}
        inputBehavior="wrap"
      /> */}
    </AutoLayout>
  )
}

widget.register(IFrameExample)
