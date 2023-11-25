document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#recipe-form form');
    const recipeList = document.querySelector('#recipe-list ul');

    // Fonction pour afficher la liste des recettes
    const displayRecipes = (recipes) => {
        recipeList.innerHTML = '';
        recipes.forEach((recipe) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${recipe.nom}</h3>
                <p>Ingrédients: ${recipe.ingredients}</p>
                <p>Instructions: ${recipe.etapesPreparation}</p>
                <p>Temps: ${recipe.dureePreparation}</p>
            `;
            recipeList.appendChild(li);
        });
    };

    // Charger la liste des recettes lors du chargement de la page
    fetch('http://localhost:3000/recettes')
        .then((response) => response.json())
        .then((data) => displayRecipes(data))
        .catch((error) => console.error('Erreur lors de la récupération des recettes:', error));

    // Soumettre le formulaire d'ajout de recette
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nom = document.querySelector('#recipe-name').value;
        const ingredients = document.querySelector('#ingredients').value;
        const etapesPreparation = document.querySelector('#instructions').value;
        const dureePreparation = document.querySelector('#duree').value;

        // Envoyer la nouvelle recette au backend
        fetch('http://localhost:3000/recettes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom,
                ingredients,
                etapesPreparation,
                dureePreparation,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                // Rafraîchir la liste des recettes après l'ajout
                fetch('http://localhost:3000/recettes')
                    .then((response) => response.json())
                    .then((data) => displayRecipes(data))
                    .catch((error) => console.error('Erreur lors de la récupération des recettes:', error));
            })
            .catch((error) => console.error('Erreur lors de l\'ajout de la recette:', error));
    });
});
