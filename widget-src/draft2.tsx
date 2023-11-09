// function MindMap() {
//   // ... (votre code existant)

//   // Gestionnaire d'événements pour la touche "g"
//   const handleKeyDown = async (e: KeyboardEvent) => {
//     if (e.key === 'g') {
//       try {
//         const ellipse = figma.createEllipse();
//         ellipse.resize(100, 100);
//         ellipse.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
//         // Ajoutez l'ellipse à la sélection ou au parent approprié
//         addElementIntoSelection(ellipse);
//         // ou addElementIntoParent(ellipse, parent); si nécessaire
//       } catch (error) {
//         console.error("Erreur lors de la création de l'ellipse :", error);
//       }
//     }
//   };

//   // Ajouter le gestionnaire d'événements lors du montage du composant
//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);
    
//     // Nettoyage de l'écouteur d'événements lors du démontage du composant
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []); // La dépendance vide assure que cela ne s'exécute qu'une fois lors du montage du composant

//   return (
//     // ... (votre code existant)
//   );
// }

// widget.register(MindMap);
